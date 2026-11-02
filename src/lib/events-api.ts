import { authFetch } from "@/lib/auth-fetch";
import { apiFetch } from "@/lib/api";
import type { EventItem } from "@/lib/events";
import type { EventFormValues } from "@/lib/event-validation";

export async function createEvent(values: EventFormValues) {
  return authFetch<EventItem>("/api/events", {
    method: "POST",
    body: JSON.stringify({ ...values, date: new Date(values.date).toISOString() }),
  });
}

export async function updateEvent(id: string, values: EventFormValues) {
  return authFetch<EventItem>(`/api/events/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ ...values, date: new Date(values.date).toISOString() }),
  });
}

export async function deleteEvent(id: string) {
  return authFetch<void>(`/api/events/${id}`, { method: "DELETE" });
}

export function getMyEvents() {
  return authFetch<EventItem[]>("/api/events/mine");
}

export function getEvent(id: string) {
  return apiFetch<EventItem>(`/api/events/${id}`);
}

export interface EventStats {
  pastEvents: number;
  upcomingEvents: number;
  volunteers: number;
  nextEventDate: string | null;
}

export function getEventStats() {
  return apiFetch<EventStats>("/api/events/stats");
}
