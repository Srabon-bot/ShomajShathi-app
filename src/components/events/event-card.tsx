import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { CountChip, TypeDot } from "@/components/ui/chip";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDateParts, spotsLeft, type EventItem } from "@/lib/events";

/**
 * The atomic unit of the product. Equal height by construction: fixed media
 * ratio, clamped title, footer pinned with mt-auto.
 */
export function EventCard({
  event,
  className,
}: {
  event: EventItem;
  className?: string;
}) {
  const { weekday, month, day, time } = formatDateParts(event.date);
  const left = spotsLeft(event);

  return (
    <article
      className={cn(
        "group flex h-full flex-col border border-rule bg-surface",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-foreground/8">
        <Image
          src={event.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <TypeDot type={event.type} />
          <CountChip full={left === 0}>
            {left === 0 ? "Full" : `${left} left`}
          </CountChip>
        </div>

        <h3 className="t-h4 line-clamp-2 min-h-[2.6em] text-foreground">
          <Link
            href={`/events/${event.id}`}
            className="hover:underline hover:underline-offset-4"
          >
            {event.title}
          </Link>
        </h3>

        <div className="mt-auto space-y-1.5 border-t border-rule-soft pt-3">
          <p className="t-micro flex items-center gap-2 text-muted">
            <MapPin aria-hidden className="size-3.5 shrink-0" strokeWidth={1.75} />
            <span className="truncate">{event.location}</span>
          </p>
          <p className="t-micro flex items-center gap-2 text-muted">
            <CalendarDays
              aria-hidden
              className="size-3.5 shrink-0"
              strokeWidth={1.75}
            />
            <span>
              {weekday.slice(0, 3).toUpperCase()} {day} {month.toUpperCase()} ·{" "}
              {time}
            </span>
          </p>
        </div>
      </div>

      <div className="flex justify-end border-t border-rule-soft p-4 pt-3">
        <Link
          href={`/events/${event.id}`}
          className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
        >
          Details
        </Link>
      </div>
    </article>
  );
}

/** Dashboard rows: shared outer rules, no box around each row. */
export function EventRow({
  event,
  status,
  actions,
  className,
}: {
  event: EventItem;
  status?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  const { weekday, month, day } = formatDateParts(event.date);

  return (
    <article
      className={cn(
        "flex flex-col gap-4 border-b border-rule py-4 sm:flex-row sm:items-center",
        className,
      )}
    >
      <div className="relative h-24 w-32 shrink-0 overflow-hidden bg-foreground/8">
        <Image src={event.image} alt="" fill sizes="128px" className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <TypeDot type={event.type} />
          <span className="t-label text-subtle">{event.attendeeCount} going</span>
          {status}
        </div>
        <h3 className="t-h4 mt-1.5 truncate text-foreground">
          <Link
            href={`/events/${event.id}`}
            className="hover:underline hover:underline-offset-4"
          >
            {event.title}
          </Link>
        </h3>
        <p className="t-micro mt-1 truncate text-muted">
          {weekday.slice(0, 3).toUpperCase()} {day} {month.toUpperCase()} ·{" "}
          {event.location}
        </p>
      </div>

      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </article>
  );
}

export function EventCardSkeleton() {
  return (
    <div className="flex h-full flex-col border border-rule bg-surface">
      <div className="skeleton aspect-[4/3]" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="skeleton h-4 w-28" />
        <div className="skeleton h-5 w-3/4" />
        <div className="mt-auto space-y-2 border-t border-rule-soft pt-3">
          <div className="skeleton h-3 w-2/3" />
          <div className="skeleton h-3 w-1/2" />
        </div>
      </div>
      <div className="border-t border-rule-soft p-4 pt-3">
        <div className="skeleton ml-auto h-9 w-24 rounded-full" />
      </div>
    </div>
  );
}
