"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { EventForm } from "@/components/events/event-form";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PageHeader } from "@/components/ui/page-header";
import { createEvent } from "@/lib/events-api";

export default function NewEventPage() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Create event"
          title="Make something useful happen."
          description="Publish a free community event for people to discover and join."
          back={{ href: "/events", label: "Back to events" }}
          meta={
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="t-label">Free to publish</span>
              <span className="t-label">Takes about 2 minutes</span>
            </div>
          }
        />
        <div className="shell section max-w-3xl">
          <div className="border border-rule bg-surface p-5 sm:p-7">
            <EventForm submitLabel="Create event" onSubmit={async (values) => {
              try {
                await createEvent(values);
                toast.success("Event created.");
                router.push("/events");
                router.refresh();
              } catch (reason) {
                toast.error(reason instanceof Error ? reason.message : "The event could not be created.");
              }
            }} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
