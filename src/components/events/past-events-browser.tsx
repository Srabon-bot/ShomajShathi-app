"use client";

import { useEffect, useState } from "react";

import { PastEventCard } from "@/components/events/past-event-card";
import { Button } from "@/components/ui/button";
import { EmptyState, Skeleton } from "@/components/ui/states";
import { apiFetchEnvelope, ApiError, type ApiMeta } from "@/lib/api";
import type { EventItem, EventType } from "@/lib/events";
import { eventTypes } from "@/lib/events";
import { getEventStats, type EventStats } from "@/lib/events-api";

type Sort = "-date" | "date";

export function PastEventsBrowser() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [type, setType] = useState<EventType | "">("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("-date");
  const [stats, setStats] = useState<EventStats | null>(null);
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
    getEventStats()
      .then((data) => {
        if (active) setStats(data);
      })
      .catch(() => {
        // The counts are decoration; the archive still works without them.
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    const params = new URLSearchParams({ scope: "past", limit: "12", page: String(page), sort });
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
        setError(reason instanceof ApiError ? reason.message : "Past events could not be loaded.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [page, query, sort, type, reloadKey]);

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
        <div className="shell flex flex-wrap items-center justify-between gap-2 py-3">
          <span className="t-label">
            {loading && !events.length
              ? "Loading archive"
              : `${meta.total} ${meta.total === 1 ? "event" : "events"} on record`}
          </span>
          <span className="t-label">
            {stats ? `${stats.volunteers.toLocaleString("en-GB")} volunteers turned up` : "Sorted by date"}
          </span>
        </div>
      </div>

      <div className="border-b border-rule bg-[#FFF5D6] dark:bg-[#29291D]">
        <div className="shell section">
          <div className="flex flex-col gap-3 border-b border-rule pb-4 sm:flex-row sm:items-end">
            <input
              aria-label="Search past events"
              className="h-11 w-full sm:max-w-sm border-b border-rule bg-transparent px-0 text-sm placeholder:text-muted"
              placeholder="Search past events"
              value={query}
              onChange={(event) => {
                startRequest();
                setQuery(event.target.value);
                setPage(1);
              }}
            />
            <select
              aria-label="Filter past events by type"
              className="h-11 w-full border-b border-rule bg-transparent px-0 text-sm sm:w-44"
              value={type}
              onChange={(event) => {
                startRequest();
                setType(event.target.value as EventType | "");
                setPage(1);
              }}
            >
              <option value="">All types</option>
              {eventTypes.map((eventType) => (
                <option key={eventType}>{eventType}</option>
              ))}
            </select>
            <select
              aria-label="Sort past events"
              className="h-11 w-full border-b border-rule bg-transparent px-0 text-sm sm:w-44 sm:ml-auto"
              value={sort}
              onChange={(event) => {
                startRequest();
                setSort(event.target.value as Sort);
                setPage(1);
              }}
            >
              <option value="-date">Newest first</option>
              <option value="date">Oldest first</option>
            </select>
          </div>

          <div className="mt-8">
            {error ? (
              <div className="space-y-3 border border-danger bg-danger-soft p-4">
                <p className="t-small text-danger">{error}</p>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    startRequest();
                    setReloadKey((current) => current + 1);
                  }}
                >
                  Try again
                </Button>
              </div>
            ) : loading && !events.length ? (
              <div aria-busy="true" aria-label="Loading past events" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }, (_, index) => (
                  <Skeleton className="aspect-[4/3]" key={index} />
                ))}
              </div>
            ) : events.length ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {events.map((event) => (
                  <PastEventCard event={event} key={event.id} />
                ))}
              </div>
            ) : (
              <EmptyState
                title={hasFilters ? "Nothing in the archive matches" : "The archive is empty"}
                description={
                  hasFilters
                    ? "Try a different search word, or browse every kind of past event."
                    : "Finished events will be collected here, with the numbers to show for them."
                }
                action={
                  hasFilters ? (
                    <Button size="sm" variant="secondary" onClick={clearFilters}>
                      Clear filters
                    </Button>
                  ) : undefined
                }
              />
            )}
          </div>

          {meta.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between border-t border-rule py-4">
              <button
                className="t-label disabled:text-subtle"
                disabled={page <= 1 || loading}
                onClick={() => {
                  startRequest();
                  setPage((current) => current - 1);
                }}
              >
                Previous
              </button>
              <span className="t-label">
                Page {meta.page} / {meta.totalPages}
              </span>
              <button
                className="t-label disabled:text-subtle"
                disabled={page >= meta.totalPages || loading}
                onClick={() => {
                  startRequest();
                  setPage((current) => current + 1);
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
