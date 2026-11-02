"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { JoinButton } from "@/components/events/join-button";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PageHeader } from "@/components/ui/page-header";
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
      <main>
        {error ? (
          <>
            <PageHeader
              eyebrow="Events"
              title="Event unavailable."
              back={{ href: "/events", label: "Back to events" }}
              meta={<span className="t-label">This page could not be loaded</span>}
            />
            <div className="shell section">
              <EmptyState
                title="Event unavailable"
                description={error}
                action={
                  <Link
                    className="inline-flex min-h-11 items-center rounded-md border border-rule px-5 text-sm font-bold text-foreground hover:bg-foreground hover:text-background"
                    href="/events"
                  >
                    Back to events
                  </Link>
                }
              />
            </div>
          </>
        ) : event ? (
          <EventContent event={event} />
        ) : (
          <>
            <PageHeader
              eyebrow="Events"
              title="Loading event."
              back={{ href: "/events", label: "Back to events" }}
              meta={<span className="t-label">Please wait</span>}
            />
            <div className="shell section">
              <p className="t-small text-muted">Loading event.</p>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

function EventContent({ event }: { event: EventItem }) {
  const date = formatDateParts(event.date);
  return (
    <>
      <PageHeader
        eyebrow={event.type}
        title={event.title}
        back={{ href: "/events", label: "Back to events" }}
        meta={
          <div className="grid gap-2 sm:grid-cols-3">
            <div>
              <p className="t-label opacity-70">Date</p>
              <p className="t-small mt-1">{date.full}</p>
            </div>
            <div>
              <p className="t-label opacity-70">Time</p>
              <p className="t-small mt-1">{date.time}</p>
            </div>
            <div>
              <p className="t-label opacity-70">Place</p>
              <p className="t-small mt-1">{event.location}</p>
            </div>
          </div>
        }
      />
      <div className="shell section">
        <article className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <div className="aspect-[3/2] overflow-hidden border border-rule bg-surface">
              <img src={event.image} alt="" className="size-full object-cover" />
            </div>
            <p className="t-body mt-8 max-w-2xl">{event.description}</p>
          </div>
          <aside className="h-fit border border-rule bg-surface p-5 lg:sticky lg:top-24">
            <JoinButton event={event} />
          </aside>
        </article>
      </div>
    </>
  );
}
