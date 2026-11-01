import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/states";
import { TypeDot } from "@/components/ui/chip";
import { JoinPanel } from "@/components/events/join-panel";
import { events, getEvent } from "@/lib/mock-data";
import { formatDateParts } from "@/lib/events";

export function generateStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = getEvent(id);
  if (!event) return { title: "Event not found" };

  return {
    title: event.title,
    description: event.description.slice(0, 155),
  };
}

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="shell py-8 md:py-12">
      <Link
        href="/events"
        className="t-label inline-flex items-center gap-2 text-foreground hover:underline hover:underline-offset-4"
      >
        <ArrowLeft aria-hidden className="size-4" strokeWidth={1.75} />
        All events
      </Link>

      <Suspense fallback={<EventDetailSkeleton />}>
        <EventDetail params={params} />
      </Suspense>
    </div>
  );
}

async function EventDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = getEvent(id);
  if (!event) notFound();

  const date = formatDateParts(event.date);

  return (
    <div className="mt-6 flex flex-col gap-10 lg:flex-row lg:items-start">
      <div className="min-w-0 flex-1">
        <TypeDot type={event.type} />
        <h1 className="t-display mt-3 text-foreground">{event.title}</h1>
        <div className="mt-6 border-b border-rule" />

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <dl className="space-y-6">
            <div>
              <dt className="t-label text-muted">Location</dt>
              <dd className="t-body mt-1 text-foreground">{event.location}</dd>
            </div>
            <div>
              <dt className="t-label text-muted">Date</dt>
              <dd className="t-body mt-1 text-foreground">{date.full}</dd>
            </div>
            <div>
              <dt className="t-label text-muted">Time</dt>
              <dd className="t-body mt-1 text-foreground">{date.time}</dd>
            </div>
            <div>
              <dt className="t-label text-muted">Places</dt>
              <dd className="t-body mt-1 text-foreground">
                {event.attendeeCount} of {event.capacity} taken
              </dd>
            </div>
          </dl>

          <div className="relative aspect-[3/2] overflow-hidden bg-foreground/8">
            <Image
              src={event.image}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <p className="t-body mt-10 max-w-xl text-foreground">{event.description}</p>

        {event.bring?.length ? (
          <section className="mt-10">
            <h2 className="t-h4 text-foreground">What to bring</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {event.bring.map((item) => (
                <li key={item} className="t-small flex items-start gap-2.5 text-muted">
                  <Check
                    aria-hidden
                    className="mt-0.5 size-3.5 shrink-0 text-foreground"
                    strokeWidth={2}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-10 flex items-center gap-3 border-t border-rule pt-6">
          <Avatar name={event.organizer.name} size="lg" />
          <div>
            <p className="t-h4 text-foreground">{event.organizer.name}</p>
            <p className="t-micro text-muted">Organiser</p>
          </div>
        </section>
      </div>

      <div className="w-full lg:w-80 lg:shrink-0">
        <JoinPanel event={event} />
      </div>
    </div>
  );
}

function EventDetailSkeleton() {
  return (
    <div className="mt-6 flex flex-col gap-10 lg:flex-row lg:items-start">
      <div className="min-w-0 flex-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-4 h-12 w-3/4" />
        <div className="mt-6 border-b border-rule" />
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-2.5 w-16" />
                <Skeleton className="h-4 w-40" />
              </div>
            ))}
          </div>
          <Skeleton className="aspect-[3/2] w-full" />
        </div>
        <div className="mt-10 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
      <div className="w-full lg:w-80 lg:shrink-0">
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}
