import { notFound } from "next/navigation";

import { EventDetail } from "@/components/events/event-detail";

export const instant = false;

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) notFound();
  return <EventDetail id={id} />;
}
