import Link from "next/link";

import { CountChip, TypeDot } from "@/components/ui/metadata";
import type { EventItem } from "@/lib/events";
import { formatDateParts } from "@/lib/events";

export function EventRow({ event }: { event: EventItem }) {
  const date = formatDateParts(event.date);
  return (
    <article className="flex flex-col gap-3 border-b border-rule py-4 md:grid md:grid-cols-[1fr_auto_auto_auto_auto] md:items-center">
      <div className="min-w-0">
        <h2 className="t-h4 break-words">{event.title}</h2>
        <p className="t-small text-muted">{event.location}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3 md:contents">
        <TypeDot type={event.type} />
        <p className="t-small t-figure text-xs sm:text-sm">{date.full}</p>
        <CountChip count={event.capacity - event.attendeeCount} label="available" />
        <Link
          className="ml-auto inline-flex min-h-9 items-center justify-center rounded-md border border-rule px-4 text-xs font-bold text-foreground hover:bg-foreground hover:text-background md:ml-0"
          href={`/events/${event.id}`}
        >
          Details
        </Link>
      </div>
    </article>
  );
}
