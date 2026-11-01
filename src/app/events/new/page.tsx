import type { Metadata } from "next";
import { EventForm } from "@/components/events/event-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { demoUser } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Create an event",
  description:
    "Publish a cleanup, plantation, clothes drive or reading circle in four groups of fields.",
};

export default function NewEventPage() {
  return (
    <DashboardShell user={demoUser}>
      <div className="max-w-3xl">
        <h1 className="t-display text-foreground">Create event</h1>
        <p className="t-lead mt-4">
          Four groups of fields a stranger can act on. Everything else is optional.
        </p>
        <div className="mt-6 border-b border-rule" />

        <div className="mt-8">
          <EventForm mode="create" />
        </div>
      </div>
    </DashboardShell>
  );
}
