"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { EventForm, toDateTimeLocal } from "@/components/events/event-form";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SectionHeading } from "@/components/ui/section-heading";
import { ApiError } from "@/lib/api";
import { getEvent, updateEvent } from "@/lib/events-api";
import type { EventItem } from "@/lib/events";

export default function EditEventPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { getEvent(params.id).then(setEvent).catch((reason) => setError(reason instanceof ApiError ? reason.message : "Event could not be loaded.")); }, [params.id]);

  if (error) return <><Navbar /><main className="section"><div className="shell"><p className="text-danger">{error}</p></div></main><Footer /></>;
  if (!event) return <><Navbar /><main className="section"><div className="shell"><p className="text-muted">Loading event…</p></div></main><Footer /></>;
  return (
    <>
      <Navbar />
      <main className="section">
      <div className="shell max-w-3xl">
        <Link className="t-small text-muted hover:text-foreground" href="/events/manage">← Back to manage</Link>
        <SectionHeading eyebrow="Edit event" title={event.title} description="Keep the details accurate so people know what to expect." />
        <div className="mt-10"><EventForm defaultValues={{ ...event, date: toDateTimeLocal(event.date) }} submitLabel="Save changes" onSubmit={async (values) => { try { await updateEvent(event.id, values); toast.success("Event updated."); router.push("/events/manage"); router.refresh(); } catch (reason) { toast.error(reason instanceof Error ? reason.message : "The event could not be updated."); } }} /></div>
      </div>
      </main>
      <Footer />
    </>
  );
}
