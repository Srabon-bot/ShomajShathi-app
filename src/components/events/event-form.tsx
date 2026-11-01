"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { eventTypes } from "@/lib/events";
import { eventFormSchema, type EventFormValues } from "@/lib/event-validation";

const blankValues: EventFormValues = {
  title: "",
  description: "",
  type: "Cleanup",
  image: "",
  location: "",
  date: "",
  capacity: 50,
};

export function EventForm({
  defaultValues,
  submitLabel,
  onSubmit,
}: {
  defaultValues?: Partial<EventFormValues>;
  submitLabel: string;
  onSubmit: (values: EventFormValues) => Promise<void>;
}) {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: { ...blankValues, ...defaultValues },
  });
  const image = form.watch("image");

  return (
    <form className="space-y-7" onSubmit={form.handleSubmit(async (values) => onSubmit(values))}>
      <div className="grid gap-7 md:grid-cols-2">
        <Field label="Title" htmlFor="title" required error={form.formState.errors.title?.message}>
          <Input id="title" {...form.register("title")} />
        </Field>
        <Field label="Type" htmlFor="type" required error={form.formState.errors.type?.message}>
          <Select id="type" {...form.register("type")}>{eventTypes.map((type) => <option key={type}>{type}</option>)}</Select>
        </Field>
      </div>
      <Field label="Description" htmlFor="description" required error={form.formState.errors.description?.message}>
        <Textarea id="description" {...form.register("description")} />
      </Field>
      <div className="grid gap-7 md:grid-cols-2">
        <Field label="Image URL" htmlFor="image" required hint="Use a public http(s) image URL." error={form.formState.errors.image?.message}>
          <Input id="image" type="url" {...form.register("image")} />
        </Field>
        <Field label="Location" htmlFor="location" required error={form.formState.errors.location?.message}>
          <Input id="location" {...form.register("location")} />
        </Field>
      </div>
      {image && /^https?:\/\//.test(image) && <img className="aspect-[4/1] w-full object-cover" src={image} alt="Event preview" />}
      <div className="grid gap-7 md:grid-cols-2">
        <Field label="Date and time" htmlFor="date" required error={form.formState.errors.date?.message}>
          <Input id="date" type="datetime-local" {...form.register("date")} />
        </Field>
        <Field label="Capacity" htmlFor="capacity" required error={form.formState.errors.capacity?.message}>
          <Input id="capacity" type="number" min={1} max={1000} {...form.register("capacity", { valueAsNumber: true })} />
        </Field>
      </div>
      <Button type="submit" loading={form.formState.isSubmitting}>{submitLabel}</Button>
    </form>
  );
}

export function toDateTimeLocal(iso: string) {
  const date = new Date(iso);
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16);
}
