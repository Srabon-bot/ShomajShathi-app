"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { JoinButton } from "@/components/events/join-button";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { EmptyState } from "@/components/ui/states";
import type { EventItem } from "@/lib/events";
import { formatDateParts } from "@/lib/events";
import { apiFetch, ApiError } from "@/lib/api";

export function EventDetail({ id }: { id: string }) {
  const [event, setEvent] = useState<EventItem | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    apiFetch<EventItem>(`/api/events/${encodeURIComponent(id)}`)
      .then(setEvent)
      .catch((reason: unknown) => setError(reason instanceof ApiError && reason.status === 404 ? "This event is no longer available." : "This event could not be loaded."));
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="section">
        <div className="shell">
          {error ? <EmptyState title="Event unavailable" description={error} action={<Link className="button button-secondary" href="/events">Back to events</Link>} /> : event ? <EventContent event={event} /> : <p className="t-small text-muted">Loading event…</p>}
        </div>
      </main>
      <Footer />
    </>
  );
}

function EventContent({ event }: { event: EventItem }) {
  const date = formatDateParts(event.date);
  return (
    <article className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div>
        <Link className="text-sm text-brand-ink underline-offset-4 hover:underline" href="/events">← Back to events</Link>
        <div className="mt-6 aspect-[3/2] overflow-hidden bg-surface"><img src={event.image} alt="" className="size-full object-cover" /></div>
        <p className="t-label mt-8 text-brand-ink">{event.type}</p>
        <h1 className="t-display mt-3">{event.title}</h1>
        <div className="mt-6 grid gap-4 border-y border-rule py-5 sm:grid-cols-3">
          <div><p className="t-label text-muted">Date</p><p className="t-small mt-1">{date.full}</p></div>
          <div><p className="t-label text-muted">Time</p><p className="t-small mt-1">{date.time}</p></div>
          <div><p className="t-label text-muted">Place</p><p className="t-small mt-1">{event.location}</p></div>
        </div>
        <p className="t-body mt-8 max-w-2xl">{event.description}</p>
      </div>
      <aside className="h-fit border border-rule bg-surface p-5 lg:sticky lg:top-24">
        <JoinButton event={event} />
      </aside>
    </article>
  );
}
