"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { EventRow } from "@/components/events/event-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Tabs } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/states";
import { Stat } from "@/components/ui/section-heading";
import { isPast, type EventItem } from "@/lib/events";
import { cn } from "@/lib/utils";

export function ManageList({ events }: { events: EventItem[] }) {
  const [tab, setTab] = useState("all");
  const [rows, setRows] = useState(events);
  const [pendingDelete, setPendingDelete] = useState<EventItem | null>(null);

  const counts = useMemo(
    () => ({
      all: rows.length,
      published: rows.filter((event) => !isPast(event)).length,
      past: rows.filter((event) => isPast(event)).length,
      totalAttendees: rows.reduce((sum, event) => sum + event.attendeeCount, 0),
    }),
    [rows],
  );

  const visible = rows.filter((event) => {
    if (tab === "published") return !isPast(event);
    if (tab === "past") return isPast(event);
    return true;
  });

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="t-display text-foreground">Your events</h1>
        <Link
          href="/events/new"
          className={cn(buttonVariants({ size: "md" }), "shrink-0")}
        >
          Create event
        </Link>
      </div>
      <div className="mt-6 border-b border-rule" />

      <div className="mt-6 grid grid-cols-3 divide-x divide-rule border-b border-rule pb-6">
        <Stat value={String(counts.published)} label="Published" />
        <Stat value={String(counts.past)} label="Past" />
        <Stat value={String(counts.totalAttendees)} label="Total attendees" />
      </div>

      <Tabs
        className="mt-6"
        value={tab}
        onChange={setTab}
        items={[
          { value: "all", label: "All", count: counts.all },
          { value: "published", label: "Published", count: counts.published },
          { value: "past", label: "Past", count: counts.past },
        ]}
      />

      {visible.length ? (
        <div className="mt-4 border-t border-rule">
          {visible.map((event) => (
            <EventRow
              key={event.id}
              event={event}
              status={
                isPast(event) ? (
                  <span className="t-label text-subtle">Closed</span>
                ) : null
              }
              actions={
                <>
                  <Link
                    href={`/events/${event.id}`}
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "sm" }),
                    )}
                  >
                    View
                  </Link>
                  <Link
                    href={`/events/${event.id}/edit`}
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "sm" }),
                    )}
                  >
                    <Pencil aria-hidden />
                    Edit
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Delete ${event.title}`}
                    onClick={() => setPendingDelete(event)}
                  >
                    <Trash2 aria-hidden />
                  </Button>
                </>
              }
            />
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-4"
          title="No events here yet"
          description="Create your first cleanup or plantation drive and it will show up on this list."
          action={
            <Link href="/events/new" className={cn(buttonVariants())}>
              Create event
            </Link>
          }
        />
      )}

      <Dialog
        open={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        title="Delete this event?"
        description={
          pendingDelete
            ? `“${pendingDelete.title}” will be removed, along with ${pendingDelete.attendeeCount} places people have taken. This cannot be undone.`
            : undefined
        }
        footer={
          <>
            <Button variant="secondary" onClick={() => setPendingDelete(null)}>
              Keep event
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                const title = pendingDelete?.title;
                setRows((current) =>
                  current.filter((event) => event.id !== pendingDelete?.id),
                );
                setPendingDelete(null);
                toast.success("Event deleted", {
                  description: title
                    ? `“${title}” is no longer listed.`
                    : undefined,
                });
              }}
            >
              Delete event
            </Button>
          </>
        }
      />
    </>
  );
}
