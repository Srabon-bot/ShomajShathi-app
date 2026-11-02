import Image from "next/image";
import Link from "next/link";

import { CountChip, TypeDot } from "@/components/ui/metadata";
import type { EventItem } from "@/lib/events";
import { formatDateParts, formatTimeSince } from "@/lib/events";

export function PastEventCard({ event }: { event: EventItem }) {
  const date = formatDateParts(event.date);
  return (
    <article className="flex h-full flex-col overflow-hidden border border-rule bg-surface">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        {/* unoptimized because event images come from arbitrary user-submitted URLs */}
        <Image
          src={event.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
          unoptimized
        />
        <div className="absolute left-3 top-3 border border-rule bg-background/95 px-2 py-1 text-center dark:bg-sun dark:text-background">
          <p className="t-figure text-lg leading-none">{date.day}</p>
          <p className="t-label mt-1 text-[9px] text-muted dark:text-background/70">{date.month}</p>
        </div>
        <span className="absolute right-3 top-3 border border-hero-foreground/40 bg-overlay px-2 py-1 t-label text-hero-foreground">
          Completed
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <TypeDot type={event.type} />
          <CountChip count={event.attendeeCount} label="attended" />
        </div>
        <h2 className="t-h4 line-clamp-2 min-h-[2.7em]">{event.title}</h2>
        <div className="mt-auto border-t border-rule pt-3">
          <p className="t-small text-muted">{date.full}</p>
          <p className="t-small text-muted">{event.location}</p>
          <p className="t-micro mt-1 text-subtle">{formatTimeSince(event.date)}</p>
        </div>
        <Link
          className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-rule px-5 text-sm font-bold text-foreground hover:bg-foreground hover:text-background"
          href={`/events/${event.id}`}
        >
          Read what happened
        </Link>
      </div>
    </article>
  );
}
