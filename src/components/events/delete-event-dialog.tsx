"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api";
import { deleteEvent } from "@/lib/events-api";
import type { EventItem } from "@/lib/events";

export function DeleteEventDialog({ event, onDeleted }: { event: EventItem; onDeleted: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  async function confirmDelete() {
    setPending(true);
    try {
      await deleteEvent(event.id);
      onDeleted(event.id);
      setOpen(false);
      toast.success("Event deleted.");
    } catch (reason) {
      toast.error(reason instanceof ApiError ? reason.message : "The event could not be deleted.");
    } finally {
      setPending(false);
    }
  }

  const joined = event.attendeeCount;

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!pending) setOpen(next); }}>
      <DialogTrigger asChild>
        <button className="t-small border border-danger px-3 py-2 text-danger hover:bg-danger-soft" type="button">
          Delete
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <p className="t-label text-brand">Delete event</p>
          <DialogTitle className="mt-2">Delete “{event.title}”?</DialogTitle>
          <DialogDescription>
            {joined > 0
              ? `${joined} ${joined === 1 ? "person has" : "people have"} joined this event. Deleting it removes the event and those join records.`
              : "No one has joined this event yet. Deleting it removes it from Upcoming for good."}{" "}
            This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={pending}
            onClick={() => setOpen(false)}
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            loading={pending}
            onClick={confirmDelete}
            type="button"
            variant="destructive"
          >
            Delete event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
