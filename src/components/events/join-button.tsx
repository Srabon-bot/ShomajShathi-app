"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import type { EventItem } from "@/lib/events";
import { isPast } from "@/lib/events";
import { getJoinState, joinEvent, leaveEvent, type JoinState } from "@/lib/joins-api";

export function JoinButton({ event }: { event: EventItem }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user?.id;
  const [status, setStatus] = useState<{ userId: string; state: JoinState } | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!userId) return;
    let active = true;
    getJoinState(event.id)
      .then((next) => {
        if (active) setStatus({ userId, state: next });
      })
      .catch(() => {
        // Fall back to the public attendee count.
      });
    return () => {
      active = false;
    };
  }, [event.id, userId]);

  const state = status && status.userId === userId ? status.state : null;

  const count = state?.attendeeCount ?? event.attendeeCount;
  const spots = Math.max(event.capacity - count, 0);
  const joined = state?.joined ?? false;

  async function toggle() {
    setPending(true);
    try {
      const next = joined ? await leaveEvent(event.id) : await joinEvent(event.id);
      if (userId) setStatus({ userId, state: next });
      toast.success(joined ? "You left this event." : "You joined this event.");
      router.refresh();
    } catch (reason) {
      toast.error(reason instanceof Error ? reason.message : "The request could not be completed.");
    } finally {
      setPending(false);
    }
  }

  // Past events: show attendance record; joining/leaving is blocked server-side.
  if (isPast(event)) {
    return (
      <>
        <p className="t-label text-muted">This event has finished</p>
        <p className="t-figure mt-2 text-3xl">{event.attendeeCount}</p>
        <p className="t-small text-muted">people attended</p>
        <p className="t-micro mt-4 text-subtle">Attendance is permanently recorded. See what happened in the description.</p>
      </>
    );
  }

  return (
    <>
      <p className="t-label text-muted">Places</p>
      <p className="t-figure mt-2 text-3xl">{spots}</p>
      <p className="t-small text-muted">spots left</p>
      {isPending ? (
        <Button block className="mt-6" disabled>
          Checking…
        </Button>
      ) : !session?.user ? (
        <Link
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-foreground px-5 text-sm font-bold text-background hover:bg-brand hover:text-brand-foreground"
          href={`/login?next=/events/${event.id}`}
        >
          Log in to join
        </Link>
      ) : joined ? (
        <Button block className="mt-6" variant="secondary" loading={pending} onClick={() => void toggle()}>
          Leave event
        </Button>
      ) : spots === 0 ? (
        <Button block className="mt-6" disabled>
          Event full
        </Button>
      ) : (
        <Button block className="mt-6" loading={pending} onClick={() => void toggle()}>
          Join event
        </Button>
      )}
      <p className="t-micro mt-3 text-muted">
        {!session?.user
          ? "You can read the details without an account."
          : joined
            ? "You are on the list. This event is saved in Joined events."
            : "Joining adds this event to your joined list."}
      </p>
    </>
  );
}
