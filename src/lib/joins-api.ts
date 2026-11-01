"use client";

import { authFetch } from "@/lib/auth-fetch";
import type { EventItem } from "@/lib/events";

export interface JoinState {
  joined: boolean;
  attendeeCount: number;
}

export function getJoinState(eventId: string) {
  return authFetch<JoinState>(`/api/joins/${encodeURIComponent(eventId)}`);
}

export function joinEvent(eventId: string) {
  return authFetch<JoinState>(`/api/joins/${encodeURIComponent(eventId)}`, { method: "POST" });
}

export function leaveEvent(eventId: string) {
  return authFetch<JoinState>(`/api/joins/${encodeURIComponent(eventId)}`, { method: "DELETE" });
}

export function getJoinedEvents() {
  return authFetch<EventItem[]>("/api/joins/mine");
}
