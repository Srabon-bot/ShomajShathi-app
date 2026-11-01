"use client";

import { useEffect, useState } from "react";

import { EventCard } from "@/components/events/event-card";
import { EmptyState, Skeleton } from "@/components/ui/states";
import type { EventItem } from "@/lib/events";
import { apiFetch } from "@/lib/api";

export function HomeEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    apiFetch<EventItem[]>("/api/events?limit=6")
      .then(setEvents)
      .catch(() => setError(true));
  }, []);
  if (error) return <EmptyState title="Events are resting" description="The next community events will appear here shortly." />;
  if (!events.length) return <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <Skeleton className="aspect-[4/3]" key={index} />)}</div>;
  return <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{events.slice(0, 6).map((event) => <EventCard event={event} key={event.id} />)}</div>;
}
