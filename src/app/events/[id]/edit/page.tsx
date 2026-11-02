"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { EventForm, toDateTimeLocal } from "@/components/events/event-form";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PageHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/states";
import { ApiError } from "@/lib/api";
import { getEvent, updateEvent } from "@/lib/events-api";
import type { EventItem } from "@/lib/events";

export default function EditEventPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { getEvent(params.id).then(setEvent).catch((reason) => setError(reason instanceof ApiError ? reason.message : "Event could not be loaded.")); }, [params.id]);

  if (error) {
    return (
      <>
        <Navbar />
        <main>
          <PageHeader
            eyebrow="Edit event"
            title="Event unavailable."
            back={{ href: "/events/manage", label: "Back to manage" }}
            meta={<span className="t-label">The event could not be opened</span>}
          />
          <div className="shell section max-w-3xl">
            <p className="text-danger">{error}</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Navbar />
        <main>
          <PageHeader
            eyebrow="Edit event"
            title="Loading event."
            back={{ href: "/events/manage", label: "Back to manage" }}
            meta={<span className="t-label">Please wait</span>}
          />
          <div className="shell section max-w-3xl space-y-4" aria-busy="true" aria-label="Loading event">
            <Skeleton className="h-10 w-56" />
            <Skeleton className="h-64" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Edit event"
          title={event.title}
          description="Keep the details accurate so people know what to expect."
          back={{ href: "/events/manage", label: "Back to manage" }}
          meta={
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="t-label">Only you can edit this event</span>
              <span className="t-label">Changes are live immediately</span>
            </div>
          }
        />
        <div className="shell section max-w-3xl">
          <div className="border border-rule bg-surface p-5 sm:p-7">
            <EventForm defaultValues={{ ...event, date: toDateTimeLocal(event.date) }} submitLabel="Save changes" onSubmit={async (values) => { try { await updateEvent(event.id, values); toast.success("Event updated."); router.push("/events/manage"); router.refresh(); } catch (reason) { toast.error(reason instanceof Error ? reason.message : "The event could not be updated."); } }} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
