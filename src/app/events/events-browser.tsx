"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { EmptyState } from "@/components/ui/states";
import { Input, Select } from "@/components/ui/field";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { eventTypes, isPast, type EventItem } from "@/lib/events";

const PAGE_SIZE = 6;

export function EventsBrowser({ events }: { events: EventItem[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState<"date" | "popular">("date");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return events
      .filter((event) => !isPast(event))
      .filter((event) => (type === "all" ? true : event.type === type))
      .filter((event) =>
        needle === ""
          ? true
          : `${event.title} ${event.location} ${event.type}`
              .toLowerCase()
              .includes(needle),
      )
      .sort((a, b) =>
        sort === "date"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : b.attendeeCount - a.attendeeCount,
      );
  }, [events, query, type, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <>
      <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-start">
        <div className="relative w-full sm:max-w-xs">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-subtle"
            strokeWidth={1.75}
          />
          <div className="border-b border-rule-soft pb-2 pl-6 focus-within:border-brand">
            <label htmlFor="event-search" className="sr-only">
              Search events
            </label>
            <Input
              id="event-search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search by name or place"
              className="py-0"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 sm:flex-row">
          <div className="w-full border-b border-rule-soft pb-2 focus-within:border-brand sm:w-44">
            <label htmlFor="event-type" className="sr-only">
              Filter by type
            </label>
            <Select
              id="event-type"
              value={type}
              onChange={(event) => {
                setType(event.target.value);
                setPage(1);
              }}
              className="py-0"
            >
              <option value="all">All types</option>
              {eventTypes.map((eventType) => (
                <option key={eventType} value={eventType}>
                  {eventType}
                </option>
              ))}
            </Select>
          </div>

          <div className="w-full border-b border-rule-soft pb-2 focus-within:border-brand sm:w-48">
            <label htmlFor="event-sort" className="sr-only">
              Sort events
            </label>
            <Select
              id="event-sort"
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as "date" | "popular");
                setPage(1);
              }}
              className="py-0"
            >
              <option value="date">Soonest first</option>
              <option value="popular">Most attended</option>
            </Select>
          </div>
        </div>
      </div>

      <p className="t-label mt-4 text-muted">
        {filtered.length} {filtered.length === 1 ? "event" : "events"}
      </p>

      {visible.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-4"
          title="Nothing matches that"
          description="Try a different type, or clear the filters and start again."
          action={
            <Button
              variant="secondary"
              onClick={() => {
                setQuery("");
                setType("all");
                setSort("date");
                setPage(1);
              }}
            >
              Clear filters
            </Button>
          }
        />
      )}

      {filtered.length > PAGE_SIZE ? (
        <Pagination
          className="mt-10"
          page={current}
          totalPages={totalPages}
          onChange={setPage}
        />
      ) : null}
    </>
  );
}
