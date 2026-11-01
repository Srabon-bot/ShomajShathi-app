"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { EventForm } from "@/components/events/event-form";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SectionHeading } from "@/components/ui/section-heading";
import { createEvent } from "@/lib/events-api";

export default function NewEventPage() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <main className="section">
      <div className="shell max-w-3xl">
        <Link className="t-small text-muted hover:text-foreground" href="/events">← Back to events</Link>
        <SectionHeading eyebrow="Create event" title="Make something useful happen." description="Publish a free community event for people to discover and join." />
        <div className="mt-10">
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
