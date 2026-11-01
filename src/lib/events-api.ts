import { apiFetch } from "@/lib/api";
import type { EventItem } from "@/lib/events";
import type { EventFormValues } from "@/lib/event-validation";

const devEmail = process.env.NEXT_PUBLIC_DEV_EMAIL ?? "dev@example.com";

function writeHeaders() {
  return { "x-dev-email": devEmail };
}

export function getDevEmail() {
  return devEmail;
}

export async function createEvent(values: EventFormValues) {
  return apiFetch<EventItem>("/api/events", { method: "POST", headers: writeHeaders(), body: JSON.stringify({ ...values, date: new Date(values.date).toISOString() }) });
}

export async function updateEvent(id: string, values: EventFormValues) {
  return apiFetch<EventItem>(`/api/events/${id}`, { method: "PATCH", headers: writeHeaders(), body: JSON.stringify({ ...values, date: new Date(values.date).toISOString() }) });
}

export async function deleteEvent(id: string) {
  return apiFetch<void>(`/api/events/${id}`, { method: "DELETE", headers: writeHeaders() });
}

export function getMyEvents() {
  return apiFetch<EventItem[]>("/api/events/mine", { headers: writeHeaders() });
}

export function getEvent(id: string) {
  return apiFetch<EventItem>(`/api/events/${id}`);
}
