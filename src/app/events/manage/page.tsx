"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { DeleteEventDialog } from "@/components/events/delete-event-dialog";
import { EventRow } from "@/components/events/event-row";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { EmptyState } from "@/components/ui/states";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api";
import { getMyEvents } from "@/lib/events-api";
import type { EventItem } from "@/lib/events";

export default function ManageEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    getMyEvents()
      .then(setEvents)
      .catch((reason) => setError(reason instanceof ApiError ? reason.message : "Your events could not be loaded."))
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    let active = true;
    getMyEvents()
      .then((data) => { if (active) setEvents(data); })
      .catch((reason) => { if (active) setError(reason instanceof ApiError ? reason.message : "Your events could not be loaded."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  if (loading) return <><Navbar /><main className="section"><div className="shell"><p className="text-muted">Loading your events…</p></div></main><Footer /></>;
  return (
    <>
      <Navbar />
      <main className="section">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="t-label text-brand">Manage</p><h1 className="t-mega mt-2">Your events.</h1></div>
          <Link className="inline-flex min-h-11 items-center rounded-md bg-foreground px-5 text-sm font-bold text-background" href="/events/new">Create event</Link>
        </div>
        {error ? <div className="mt-8 space-y-3"><p className="text-danger">{error}</p><Button variant="secondary" onClick={() => { setError(""); load(); }}>Try again</Button></div> : events.length ? (
          <div className="mt-8">{events.map((event) => <div key={event.id} className="group relative"><EventRow event={event} /><div className="absolute right-0 top-4 flex gap-2 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100 md:group-focus-within:opacity-100"><Link className="t-small border border-rule px-3 py-2" href={`/events/${event.id}/edit`}>Edit</Link><DeleteEventDialog event={event} onDeleted={(id) => setEvents((current) => current.filter((item) => item.id !== id))} /></div></div>)}</div>
        ) : <div className="mt-8"><EmptyState title="No events yet" description="Create your first community event to see it here." action={<Link className="inline-flex min-h-11 items-center rounded-md bg-foreground px-5 text-sm font-bold text-background" href="/events/new">Create event</Link>} /></div>}
      </div>
      </main>
      <Footer />
    </>
  );
}
