"use client";

import { useEffect, useState } from "react";

import { EventCard } from "@/components/events/event-card";
import { EmptyState } from "@/components/ui/states";
import type { EventItem, EventType } from "@/lib/events";
import { eventTypes } from "@/lib/events";
import { apiFetchEnvelope, ApiError, type ApiMeta } from "@/lib/api";

export function EventsBrowser() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [type, setType] = useState<EventType | "">("");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [meta, setMeta] = useState<ApiMeta>({ page: 1, limit: 12, total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams({ limit: "12", page: String(page) });
    if (type) params.set("type", type);
    if (query) params.set("q", query);
    apiFetchEnvelope<EventItem[]>(`/api/events?${params}`)
      .then(({ data, meta: nextMeta }) => { setEvents(data); if (nextMeta) setMeta(nextMeta); })
      .catch((reason: unknown) => setError(reason instanceof ApiError ? reason.message : "Events could not be loaded."));
  }, [page, query, type]);

  if (error) return <p className="rounded-sm border border-destructive/30 bg-destructive/10 p-4 text-destructive">{error}</p>;
  return (
    <>
      <div className="flex flex-col gap-3 border-y border-border py-4 sm:flex-row">
        <input className="h-11 max-w-sm border-b border-rule-soft bg-transparent px-0 text-sm" placeholder="Search events" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} />
        <select className="h-11 border-b border-rule-soft bg-transparent px-0 text-sm sm:w-48" value={type} onChange={(event) => { setType(event.target.value as EventType | ""); setPage(1); }}>
          <option value="">All types</option>
          {eventTypes.map((eventType) => <option key={eventType}>{eventType}</option>)}
        </select>
      </div>
      {events.length ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{events.map((event) => <EventCard event={event} key={event.id} />)}</div>
      ) : (
        <div className="mt-8"><EmptyState title="No events found" description="Try another search or clear the event type filter." /></div>
      )}
      {meta.totalPages > 1 && <div className="mt-8 flex items-center justify-between border-t border-rule py-4"><button className="t-label disabled:text-subtle" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}>Previous</button><span className="t-label">Page {meta.page} / {meta.totalPages}</span><button className="t-label disabled:text-subtle" disabled={page >= meta.totalPages} onClick={() => setPage((current) => current + 1)}>Next</button></div>}
    </>
  );
}
