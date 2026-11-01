"use client";

import { useState } from "react";
import { EventCard } from "@/components/events/event-card";
import { Chip } from "@/components/ui/chip";
import { eventTypes, type EventItem } from "@/lib/events";

/**
 * The one yellow band in the product. White ruled cards pasted onto it.
 */
export function CategoryBand({ events }: { events: EventItem[] }) {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All" ? events : events.filter((event) => event.type === active);

  const chipClass = (selected: boolean) =>
    selected
      ? "border-sun-foreground bg-sun-foreground text-sun"
      : "border-sun-foreground text-sun-foreground hover:bg-sun-foreground hover:text-sun";

  return (
    <section className="bg-sun py-10 md:py-16">
      <div className="shell">
        <h2 className="t-h2 text-sun-foreground">Categories</h2>

        <div className="mt-6 flex flex-wrap gap-2">
          <Chip
            selected={active === "All"}
            onClick={() => setActive("All")}
            className={chipClass(active === "All")}
          >
            All
          </Chip>
          {eventTypes.map((type) => (
            <Chip
              key={type}
              selected={active === type}
              onClick={() => setActive(type)}
              className={chipClass(active === type)}
            >
              {type}
            </Chip>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.slice(0, 6).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
