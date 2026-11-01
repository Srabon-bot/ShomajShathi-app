import { EventCardSkeleton } from "@/components/events/event-card";

export default function Loading() {
  return (
    <div className="shell py-12 md:py-16">
      <div className="skeleton h-12 w-2/3 max-w-xl" />
      <div className="skeleton mt-4 h-4 w-1/2 max-w-md" />
      <div className="mt-8 border-b border-rule" />
      <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
