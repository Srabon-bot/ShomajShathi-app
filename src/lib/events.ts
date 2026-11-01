export const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
] as const;

export type EventType = (typeof eventTypes)[number];

export interface Organizer {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  type: EventType;
  /** ISO 8601 */
  date: string;
  location: string;
  image: string;
  capacity: number;
  attendeeCount: number;
  organizer: Organizer;
  joined: boolean;
  createdAt: string;
  /** Concrete things a volunteer should bring. */
  bring?: string[];
}

/** What a card needs to decide between "34 going" and "3 spots left". */
export function spotsLeft(event: Pick<EventItem, "capacity" | "attendeeCount">) {
  return Math.max(0, event.capacity - event.attendeeCount);
}

/** Fixed for the UI build: the demo data ships one past event. */
const pastEventIds = new Set(["buriganga-tributary-sweep"]);

export function isPast(event: { id: string }) {
  return pastEventIds.has(event.id);
}

const DAY = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  timeZone: "Asia/Dhaka",
});

const MONTH_SHORT = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  timeZone: "Asia/Dhaka",
});

const MONTH_LONG = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  timeZone: "Asia/Dhaka",
});

const WEEKDAY = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  timeZone: "Asia/Dhaka",
});

const TIME = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Dhaka",
});

const FULL = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
});

/**
 * Every date in the product goes through here. Inline toLocaleDateString()
 * produces different strings on server and client, and hydration fails.
 */
export function formatDateParts(iso: string) {
  const date = new Date(iso);
  return {
    day: DAY.format(date),
    month: MONTH_SHORT.format(date),
    monthLong: MONTH_LONG.format(date),
    weekday: WEEKDAY.format(date),
    time: TIME.format(date),
    full: FULL.format(date),
    /** "Wednesday, 18 November" */
    short: `${WEEKDAY.format(date)}, ${DAY.format(date)} ${MONTH_LONG.format(date)}`,
  };
}

/** For <time dateTime>. */
export function toISO(iso: string) {
  return new Date(iso).toISOString();
}
