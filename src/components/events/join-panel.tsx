"use client";

import { useState } from "react";
import { CalendarPlus, Check, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Chip, CountChip } from "@/components/ui/chip";
import { CapacityMeter } from "@/components/events/capacity-meter";
import { formatDateParts, isPast, type EventItem } from "@/lib/events";

export function JoinPanel({ event }: { event: EventItem }) {
  const [joined, setJoined] = useState(event.joined);
  const [attendees, setAttendees] = useState(event.attendeeCount);
  const [busy, setBusy] = useState(false);

  const left = Math.max(0, event.capacity - attendees);
  const full = left === 0;
  const past = isPast(event);
  const date = formatDateParts(event.date);

  const join = () => {
    setBusy(true);
    window.setTimeout(() => {
      setJoined(true);
      setAttendees((count) => Math.min(event.capacity, count + 1));
      setBusy(false);
      toast.success("You're going", {
        description: `${date.short} · ${event.location}`,
      });
    }, 550);
  };

  const leave = () => {
    setBusy(true);
    window.setTimeout(() => {
      setJoined(false);
      setAttendees((count) => Math.max(0, count - 1));
      setBusy(false);
      toast("Removed from your list", {
        description: "You can join again while places last.",
      });
    }, 400);
  };

  return (
    <aside className="space-y-4 border border-rule bg-surface p-5 lg:sticky lg:top-24">
      <CapacityMeter joined={attendees} capacity={event.capacity} />

      {past ? (
        <div className="space-y-2">
          <Chip className="pointer-events-none">Past event</Chip>
          <p className="t-small text-muted">
            {attendees} people turned up. This one is closed.
          </p>
        </div>
      ) : full && !joined ? (
        <div className="space-y-2">
          <CountChip full>Full</CountChip>
          <p className="t-small text-muted">
            Every place is taken. Join another event nearby.
          </p>
        </div>
      ) : joined ? (
        <div className="space-y-2">
          <Button variant="secondary" block size="lg" disabled>
            <Check aria-hidden />
            You&apos;re going
          </Button>
          <Button variant="ghost" block size="sm" loading={busy} onClick={leave}>
            Leave event
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {left <= 10 ? (
            <p className="t-h3 text-foreground">
              {left}{" "}
              <span className="t-small font-normal normal-case text-muted">
                places left
              </span>
            </p>
          ) : (
            <p className="t-small text-muted">{left} places still open</p>
          )}
          <Button variant="primary" block size="lg" loading={busy} onClick={join}>
            Join this event
          </Button>
        </div>
      )}

      <div className="space-y-1 border-t border-rule pt-3">
        <Button
          variant="secondary"
          block
          size="sm"
          className="justify-start"
          onClick={() =>
            toast.success("Calendar file ready", {
              description: "In the full build this downloads an .ics file.",
            })
          }
        >
          <CalendarPlus aria-hidden />
          Add to calendar
        </Button>
        <Button
          variant="ghost"
          block
          size="sm"
          className="justify-start"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(window.location.href);
              toast.success("Link copied");
            } catch {
              toast.error("Could not copy the link", {
                description: "Select the address bar and copy it instead.",
              });
            }
          }}
        >
          <Share2 aria-hidden />
          Share
        </Button>
      </div>

      <p className="t-micro text-subtle">
        Free to attend. {event.organizer.name} is organising.
      </p>
    </aside>
  );
}
