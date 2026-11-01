"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageOff, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/field";
import { Dialog } from "@/components/ui/dialog";
import { eventTypes, type EventItem } from "@/lib/events";
import { eventSchema, type EventValues } from "@/lib/validation";
import { cn } from "@/lib/utils";

const dateInDhaka = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "Asia/Dhaka",
});

const timeInDhaka = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Dhaka",
});

function splitDateTime(iso?: string) {
  if (!iso) return { date: "", time: "" };
  const value = new Date(iso);
  return {
    date: dateInDhaka.format(value),
    time: timeInDhaka.format(value),
  };
}

/** Dhaka is UTC+6 year round, so a fixed offset is honest and predictable. */
function toISO(date: string, time: string) {
  return new Date(`${date}T${time}:00+06:00`).toISOString();
}

export function EventForm({
  mode,
  event,
}: {
  mode: "create" | "edit";
  event?: EventItem;
}) {
  const router = useRouter();
  const [previewBroken, setPreviewBroken] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const initial = splitDateTime(event?.date);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EventValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event?.title ?? "",
      type: event?.type ?? "Cleanup",
      date: initial.date,
      time: initial.time,
      location: event?.location ?? "",
      description: event?.description ?? "",
      bring: event?.bring?.join("\n") ?? "",
      capacity: event?.capacity ?? 50,
      image: event?.image?.startsWith("http") ? event.image : "",
      free: true,
    },
  });

  const imageUrl = watch("image");

  const onSubmit = async (values: EventValues) => {
    await new Promise((resolve) => window.setTimeout(resolve, 750));

    if (new Date(toISO(values.date, values.time)).getTime() < Date.now()) {
      toast.error("Pick a date after today", {
        description: "An event in the past cannot be joined.",
      });
      return;
    }

    toast.success(mode === "create" ? "Event created" : "Changes saved", {
      description:
        mode === "create"
          ? "Live now. Redirecting to upcoming events…"
          : "Volunteers will see the update on their next visit.",
    });
    router.push("/events");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-10">
        <fieldset className="space-y-6">
          <legend className="t-label mb-4 text-muted">The event</legend>

          <Field label="Event title" htmlFor="title" required error={errors.title?.message}>
            <Input
              id="title"
              placeholder="Winter Clothes Drive — Mirpur 10"
              invalid={!!errors.title}
              {...register("title")}
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Type" htmlFor="type" required error={errors.type?.message}>
              <Select id="type" invalid={!!errors.type} {...register("type")}>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </Field>

            <Field
              label="Capacity"
              htmlFor="capacity"
              required
              hint="How many volunteers can you manage?"
              error={errors.capacity?.message}
            >
              <Input
                id="capacity"
                type="number"
                min={1}
                max={1000}
                invalid={!!errors.capacity}
                {...register("capacity", { valueAsNumber: true })}
              />
            </Field>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Date" htmlFor="date" required error={errors.date?.message}>
              <Input
                id="date"
                type="date"
                invalid={!!errors.date}
                {...register("date")}
              />
            </Field>

            <Field label="Start time" htmlFor="time" required error={errors.time?.message}>
              <Input
                id="time"
                type="time"
                invalid={!!errors.time}
                {...register("time")}
              />
            </Field>
          </div>

          <Field
            label="Location"
            htmlFor="location"
            required
            hint="A place a stranger can find without calling you."
            error={errors.location?.message}
          >
            <Input
              id="location"
              placeholder="Mirpur 10 Roundabout, Dhaka"
              invalid={!!errors.location}
              {...register("location")}
            />
          </Field>
        </fieldset>

        <fieldset className="space-y-6 border-t border-rule pt-8">
          <legend className="t-label mb-4 text-muted">The details</legend>

          <Field
            label="Description"
            htmlFor="description"
            required
            hint="What happens on the day, in plain sentences."
            error={errors.description?.message}
          >
            <Textarea
              id="description"
              rows={6}
              placeholder="We are collecting jackets and blankets for families in the Mirpur basti. Everything is sorted on site and handed out the same afternoon."
              invalid={!!errors.description}
              {...register("description")}
            />
          </Field>

          <Field
            label="What to bring"
            htmlFor="bring"
            hint="One item per line. Three to five is right."
            error={errors.bring?.message}
          >
            <Textarea
              id="bring"
              rows={4}
              placeholder={"One clean jacket\nTwo large sacks\nA tiffin"}
              invalid={!!errors.bring}
              {...register("bring")}
            />
          </Field>
        </fieldset>

        <fieldset className="space-y-6 border-t border-rule pt-8">
          <legend className="t-label mb-4 text-muted">The image</legend>

          <Field
            label="Thumbnail URL"
            htmlFor="image"
            hint="Paste a link to a photo of the place or the work."
            error={errors.image?.message}
          >
            <Input
              id="image"
              placeholder="https://…"
              invalid={!!errors.image}
              {...register("image", { onChange: () => setPreviewBroken(false) })}
            />
          </Field>

          <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden border border-rule bg-foreground/8">
            {imageUrl && !previewBroken ? (
              /* Arbitrary hosts: never through next/image. */
              <img
                src={imageUrl}
                alt="Preview of the event thumbnail"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() => setPreviewBroken(true)}
                className="size-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <ImageOff
                    aria-hidden
                    className="mx-auto size-6 text-subtle"
                    strokeWidth={1.5}
                  />
                  <p className="t-micro mt-2 text-subtle">
                    {imageUrl ? "That link did not load" : "Image preview"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </fieldset>

        <fieldset className="border-t border-rule pt-8">
          <legend className="t-label mb-4 text-muted">Publish</legend>
          <Checkbox
            label="This event is free and open to anyone who signs up."
            invalid={!!errors.free}
            aria-describedby="free-error"
            {...register("free")}
          />
          {errors.free?.message ? (
            <p id="free-error" className="t-micro mt-1.5 text-danger">
              {errors.free.message}
            </p>
          ) : null}
        </fieldset>
      </div>

      <div className="sticky bottom-0 z-10 mt-10 flex flex-col gap-2 border-t border-rule bg-background py-4 sm:flex-row sm:items-center">
        <Button type="submit" loading={isSubmitting}>
          {mode === "create" ? "Publish event" : "Save changes"}
        </Button>

        <Link
          href="/events/manage"
          className={cn(buttonVariants({ variant: "secondary" }))}
        >
          Cancel
        </Link>

        {mode === "edit" ? (
          <Button
            type="button"
            variant="destructive"
            className="sm:ml-auto"
            onClick={() => setConfirmDelete(true)}
          >
            <Trash2 aria-hidden />
            Delete
          </Button>
        ) : null}
      </div>

      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Delete this event?"
        description={`“${event?.title ?? "This event"}” and everyone's place on it will be removed. This cannot be undone.`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
              Keep event
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setConfirmDelete(false);
                toast.success("Event deleted", {
                  description: "It is gone from upcoming events.",
                });
                router.push("/events/manage");
              }}
            >
              Delete event
            </Button>
          </>
        }
      />
    </form>
  );
}
