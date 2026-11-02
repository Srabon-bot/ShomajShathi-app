export const eventTypes = ["Cleanup", "Plantation", "Donation", "Education"] as const;
export type EventType = (typeof eventTypes)[number];

export interface EventItem {
  id: string;
  title: string;
  description: string;
  type: EventType;
  date: string;
  location: string;
  image: string;
  capacity: number;
  attendeeCount: number;
  organizer: { id: string; name: string; email: string; image?: string | null };
  joined: boolean;
  createdAt: string;
}

/** True once the start time has passed. Dates are ISO strings from the API. */
export function isPast(event: { date: string }) {
  return new Date(event.date).getTime() < Date.now();
}

/** Human-readable distance into the past, e.g. "6 days ago". */
export function formatTimeSince(iso: string) {
  const days = Math.round((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months} ${months === 1 ? "month" : "months"} ago`;
  const years = Math.round(days / 365);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
}

export function formatDateParts(iso: string) {
  const date = new Date(iso);
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    day: "2-digit",
    month: "short",
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  return {
    day: get("day"),
    month: get("month"),
    weekday: get("weekday"),
    full: new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dhaka", dateStyle: "long" }).format(date),
    time: `${get("hour")}:${get("minute")} ${get("dayPeriod")}`,
  };
}
