"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          toast.success("Event created", {
            description: "Live now. Redirecting to upcoming events…",
          })
        }
      >
        Success toast
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          toast.error("Could not join", {
            description: "This one filled up. Try another event nearby.",
          })
        }
      >
        Error toast
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() =>
          toast("You're going", {
            description: "Wednesday, 18 November · Mirpur 10 Roundabout",
          })
        }
      >
        Neutral toast
      </Button>
    </div>
  );
}
