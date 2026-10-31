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
