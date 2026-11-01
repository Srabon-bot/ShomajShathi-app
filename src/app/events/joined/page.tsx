import type { Metadata } from "next";
import Link from "next/link";
import { EventRow } from "@/components/events/event-card";
import { buttonVariants } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/states";
import { Stat } from "@/components/ui/section-heading";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { demoUser, events } from "@/lib/mock-data";
import { isPast } from "@/lib/events";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Joined events",
  description: "Every event you have signed up for, and the hours you have given.",
};

export default function JoinedEventsPage() {
  const joined = events
    .filter((event) => event.joined)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const types = new Set(joined.map((event) => event.type)).size;

  return (
    <DashboardShell user={demoUser}>
      <h1 className="t-display text-foreground">Joined events</h1>
      <div className="mt-6 border-b border-rule" />

      <div className="mt-6 grid grid-cols-2 divide-x divide-rule border-b border-rule pb-6 md:grid-cols-4">
        <Stat value={String(joined.length)} label="Events joined" />
        <Stat value={String(demoUser.hoursVolunteered)} label="Hours volunteered" />
        <Stat value={String(types)} label="Types covered" />
        <Stat value={demoUser.memberSince} label="Member since" />
      </div>

      {joined.length ? (
        <div className="mt-4 border-t border-rule">
          {joined.map((event) => (
            <EventRow
              key={event.id}
              event={event}
              status={
                <Chip className="pointer-events-none">
                  {isPast(event) ? "Attended" : "Upcoming"}
                </Chip>
              }
              actions={
                <Link
                  href={`/events/${event.id}`}
                  className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
                >
                  View
                </Link>
              }
            />
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-6"
          title="No events joined yet"
          description="Pick a cleanup and it lands here with your volunteer hours."
          action={
            <Link href="/events" className={cn(buttonVariants())}>
              Browse events
            </Link>
          }
        />
      )}
    </DashboardShell>
  );
}
