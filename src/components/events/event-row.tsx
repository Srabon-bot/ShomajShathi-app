import Link from "next/link";

import { CountChip, TypeDot } from "@/components/ui/metadata";
import type { EventItem } from "@/lib/events";
import { formatDateParts } from "@/lib/events";

export function EventRow({ event }: { event: EventItem }) {
  const date = formatDateParts(event.date);
  return (
    <article className="grid gap-3 border-b border-rule py-4 md:grid-cols-[1fr_auto_auto_auto_auto] md:items-center">
      <div>
        <h2 className="t-h4">{event.title}</h2>
        <p className="t-small text-muted">{event.location}</p>
      </div>
      <TypeDot type={event.type} />
      <p className="t-small t-figure">{date.full}</p>
      <Link className="inline-flex min-h-9 items-center justify-center rounded-md border border-rule px-4 text-xs font-bold text-foreground hover:bg-foreground hover:text-background" href={`/events/${event.id}`}>Details</Link>
      <CountChip count={event.capacity - event.attendeeCount} label="available" />
    </article>
  );
}
