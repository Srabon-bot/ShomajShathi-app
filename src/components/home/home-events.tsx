import { EventCard } from "@/components/events/event-card";
import { EmptyState } from "@/components/ui/states";
import type { EventItem } from "@/lib/events";

/**
 * Renders the 6-event grid on the home page.
 * Data is fetched server-side in the parent page and passed as a prop —
 * no client-side waterfall.
 */
export function HomeEvents({ events }: { events: EventItem[] }) {
  if (!events.length) {
    return <EmptyState title="Events are resting" description="The next community events will appear here shortly." />;
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {events.slice(0, 6).map((event) => <EventCard event={event} key={event.id} />)}
    </div>
  );
}
