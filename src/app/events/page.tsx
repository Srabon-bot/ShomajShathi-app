import type { Metadata } from "next";
import { events } from "@/lib/mock-data";
import { EventsBrowser } from "./events-browser";

export const metadata: Metadata = {
  title: "Upcoming events",
  description:
    "Cleanups, plantation drives, clothes runs and reading circles happening across Dhaka in the next few weeks.",
};

export default function EventsPage() {
  return (
    <div className="shell py-12 md:py-16">
      <h1 className="t-display text-foreground">Every event, sorted by the next one.</h1>
      <p className="t-lead mt-4 max-w-2xl">
        Four kinds of work, eleven neighbourhoods, and no membership. Join the one
        that fits your Saturday.
      </p>
      <div className="mt-8 border-b border-rule" />
      <EventsBrowser events={events} />
    </div>
  );
}
