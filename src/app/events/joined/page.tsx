"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { EventRow } from "@/components/events/event-row";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { mastheadSecondary, PageHeader } from "@/components/ui/page-header";
import { EmptyState, Skeleton } from "@/components/ui/states";
import { ApiError } from "@/lib/api";
import type { EventItem } from "@/lib/events";
import { isPast } from "@/lib/events";
import { getJoinedEvents, leaveEvent } from "@/lib/joins-api";

export default function JoinedEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [leaving, setLeaving] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    getJoinedEvents()
      .then((data) => {
        if (active) setEvents(data);
      })
      .catch((reason: unknown) => {
        if (active) setError(reason instanceof ApiError ? reason.message : "Your joined events could not be loaded.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [reloadKey]);

  function reload() {
    setLoading(true);
    setError("");
    setReloadKey((value) => value + 1);
  }

  async function leave(id: string) {
    setLeaving(id);
    try {
      await leaveEvent(id);
      setEvents((current) => current.filter((event) => event.id !== id));
      toast.success("You left this event.");
    } catch (reason) {
      toast.error(reason instanceof Error ? reason.message : "The event could not be left.");
    } finally {
      setLeaving(null);
    }
  }

  const upcoming = events.filter((e) => !isPast(e));
  const past = events.filter((e) => isPast(e));

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Your calendar"
          title="Joined."
          description="Every cleanup, plantation and drive you said yes to. Leave an event if your plans change."
          action={<Link className={mastheadSecondary} href="/events">Find more events</Link>}
          meta={
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="t-label">Sorted by date</span>
              <span className="t-label">
                {loading ? "Loading" : `${events.length} ${events.length === 1 ? "event" : "events"}`}
              </span>
            </div>
          }
        />
        <div className="shell section">
          {error ? (
            <div className="space-y-3 border border-danger bg-danger-soft p-4">
              <p className="t-small text-danger">{error}</p>
              <Button size="sm" variant="secondary" onClick={reload}>
                Try again
              </Button>
            </div>
          ) : loading ? (
            <div className="space-y-2" aria-busy="true" aria-label="Loading joined events">
              {Array.from({ length: 3 }, (_, index) => (
                <Skeleton className="h-20" key={index} />
              ))}
            </div>
          ) : events.length ? (
            <div className="space-y-10">
              {upcoming.length > 0 && (
                <section>
                  <p className="t-label mb-4 border-b border-rule pb-3">Coming up — {upcoming.length}</p>
                  <div className="border-t border-rule">
                    {upcoming.map((event) => (
                      <div className="flex flex-col gap-3 border-b border-rule py-4 sm:flex-row sm:items-center sm:justify-between" key={event.id}>
                        <div className="min-w-0 flex-1">
                          <EventRow event={event} />
                        </div>
                        <button
                          className="t-small shrink-0 border border-danger px-3 py-2 text-danger hover:bg-danger-soft disabled:opacity-60"
                          type="button"
                          disabled={leaving === event.id}
                          onClick={() => void leave(event.id)}
                        >
                          {leaving === event.id ? "Leaving." : "Leave"}
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {past.length > 0 && (
                <section>
                  <p className="t-label mb-4 border-b border-rule pb-3">Already done — {past.length}</p>
                  <div className="border-t border-rule">
                    {past.map((event) => (
                      <div className="flex flex-col gap-3 border-b border-rule py-4 sm:flex-row sm:items-center sm:justify-between" key={event.id}>
                        <div className="min-w-0 flex-1">
                          <EventRow event={event} />
                        </div>
                        <span className="t-label shrink-0 border border-rule px-3 py-2 text-subtle">
                          Attended
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <EmptyState
              title="No joined events yet"
              description="Browse upcoming work around Dhaka and join the one that fits your week."
              action={
                <Link
                  className="inline-flex min-h-11 items-center rounded-md bg-foreground px-5 text-sm font-bold text-background"
                  href="/events"
                >
                  Browse events
                </Link>
              }
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
