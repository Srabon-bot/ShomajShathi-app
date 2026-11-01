import Link from "next/link";

import type { EventItem } from "@/lib/events";
import { formatDateParts } from "@/lib/events";
import { CountChip, TypeDot } from "@/components/ui/metadata";

export function EventCard({ event }: { event: EventItem }) {
  const date = formatDateParts(event.date);
  return (
    <article className="flex h-full flex-col overflow-hidden border border-rule bg-surface">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <img src={event.image} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
        <div className="absolute left-3 top-3 border border-rule bg-background/95 px-2 py-1 text-center">
          <p className="t-figure text-lg leading-none">{date.day}</p>
          <p className="t-label mt-1 text-[9px] text-muted">{date.month}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2"><TypeDot type={event.type} /><CountChip count={event.capacity - event.attendeeCount} label="available" /></div>
        <h2 className="t-h4 line-clamp-2 min-h-[2.7em]">{event.title}</h2>
        <div className="mt-auto border-t border-rule pt-3">
          <p className="t-small text-muted">{date.weekday} · {date.time}</p>
          <p className="t-small text-muted">{event.location}</p>
        </div>
        <Link className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-rule px-5 text-sm font-bold text-foreground hover:bg-foreground hover:text-background" href={`/events/${event.id}`}>
          View event
        </Link>
      </div>
    </article>
  );
}
