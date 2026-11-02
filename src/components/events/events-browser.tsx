"use client";

import { useEffect, useState } from "react";

import { EventCard } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { EmptyState, Skeleton } from "@/components/ui/states";
import type { EventItem, EventType } from "@/lib/events";
import { eventTypes } from "@/lib/events";
import { apiFetchEnvelope, ApiError, type ApiMeta } from "@/lib/api";

export function EventsBrowser() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [type, setType] = useState<EventType | "">("");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [meta, setMeta] = useState<ApiMeta>({ page: 1, limit: 12, total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);

  function startRequest() {
    setLoading(true);
    setError("");
  }

  useEffect(() => {
    let active = true;
    const params = new URLSearchParams({ limit: "12", page: String(page) });
    if (type) params.set("type", type);
    if (query) params.set("q", query);
    apiFetchEnvelope<EventItem[]>(`/api/events?${params}`)
      .then(({ data, meta: nextMeta }) => {
        if (!active) return;
        setEvents(data);
        setError("");
        if (nextMeta) setMeta(nextMeta);
      })
      .catch((reason: unknown) => {
        if (!active) return;
        setEvents([]);
        setError(reason instanceof ApiError ? reason.message : "Events could not be loaded.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [page, query, type, reloadKey]);

  const hasFilters = Boolean(query || type);

  function clearFilters() {
    startRequest();
    setQuery("");
    setType("");
    setPage(1);
  }

  return (
    <>
      <div className="border-b border-rule bg-band text-band-foreground">
        <div className="shell flex flex-col gap-3 py-3 sm:flex-row sm:items-center">
          <input
            aria-label="Search events"
            className="h-11 max-w-sm border-b border-band-foreground/40 bg-transparent px-0 text-sm placeholder:text-band-foreground/60"
            placeholder="Search events"
            value={query}
            onChange={(event) => { startRequest(); setQuery(event.target.value); setPage(1); }}
          />
          <select
            aria-label="Filter by event type"
            className="h-11 border-b border-band-foreground/40 bg-transparent px-0 text-sm sm:w-48"
            value={type}
            onChange={(event) => { startRequest(); setType(event.target.value as EventType | ""); setPage(1); }}
          >
            <option value="">All types</option>
            {eventTypes.map((eventType) => <option key={eventType}>{eventType}</option>)}
          </select>
        </div>
      </div>
      <div className="shell section">
        {error ? (
          <div className="space-y-3 border border-danger bg-danger-soft p-4">
            <p className="t-small text-danger">{error}</p>
            <Button size="sm" variant="secondary" onClick={() => { startRequest(); setReloadKey((current) => current + 1); }}>Try again</Button>
          </div>
        ) : loading && !events.length ? (
          <div aria-busy="true" aria-label="Loading events" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => <Skeleton className="aspect-[4/3]" key={index} />)}
          </div>
        ) : events.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{events.map((event) => <EventCard event={event} key={event.id} />)}</div>
        ) : (
          <EmptyState
            title={hasFilters ? "No events match those filters" : "No events found"}
            description={hasFilters ? "Try a different search word or browse every event type." : "New community events will appear here as organisers publish them."}
            action={hasFilters ? <Button size="sm" variant="secondary" onClick={clearFilters}>Clear filters</Button> : undefined}
          />
        )}
        {meta.totalPages > 1 && <div className="mt-8 flex items-center justify-between border-t border-rule py-4"><button className="t-label disabled:text-subtle" disabled={page <= 1 || loading} onClick={() => { startRequest(); setPage((current) => current - 1); }}>Previous</button><span className="t-label">Page {meta.page} / {meta.totalPages}</span><button className="t-label disabled:text-subtle" disabled={page >= meta.totalPages || loading} onClick={() => { startRequest(); setPage((current) => current + 1); }}>Next</button></div>}
      </div>
    </>
  );
}
