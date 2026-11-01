import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/states";
import { EventForm } from "@/components/events/event-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { demoUser, events, getEvent } from "@/lib/mock-data";

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
  return { title: event ? `Edit — ${event.title}` : "Event not found" };
}

export default function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <DashboardShell user={demoUser}>
      <div className="max-w-3xl">
        <h1 className="t-display text-foreground">Edit event</h1>
        <p className="t-lead mt-4">
          Volunteers who already joined will see the update the next time they open
          the page.
        </p>
        <div className="mt-6 border-b border-rule" />

        <div className="mt-8">
          <Suspense fallback={<EditSkeleton />}>
            <EditForm params={params} />
          </Suspense>
        </div>
      </div>
    </DashboardShell>
  );
}

async function EditForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = getEvent(id);
  if (!event) notFound();

  return <EventForm mode="edit" event={event} />;
}

function EditSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="space-y-2 border-b border-rule-soft pb-2">
          <Skeleton className="h-2.5 w-24" />
          <Skeleton className="h-8 w-full" />
        </div>
      ))}
    </div>
  );
}
