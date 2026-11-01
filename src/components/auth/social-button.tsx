"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.8l-3.9-3c-1.1.7-2.4 1.2-4 1.2a7 7 0 0 1-6.6-4.8H1.4v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.6a7.2 7.2 0 0 1 0-5.2V6.3H1.4a12 12 0 0 0 0 10.6l4-2.3Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.8 0 3.3.6 4.5 1.8l3.4-3.4A12 12 0 0 0 1.4 6.3l4 3.1A7 7 0 0 1 12 4.8Z"
      />
    </svg>
  );
}

export function SocialButton({
  provider = "Google",
  loading,
  onClick,
}: {
  provider?: "Google" | "GitHub";
  loading?: boolean;
  onClick?: () => void;
}) {
  const [pending, setPending] = useState(false);
  const busy = loading ?? pending;

  return (
    <Button
      variant="secondary"
      block
      size="lg"
      aria-busy={busy || undefined}
      onClick={() => {
        if (onClick) return onClick();
        setPending(true);
        // UI-only: auth arrives in a later phase.
        window.setTimeout(() => setPending(false), 1600);
      }}
    >
      {busy ? (
        <Loader2 aria-hidden className="animate-spin" />
      ) : provider === "Google" ? (
        <GoogleMark className="size-[18px]" />
      ) : (
        <svg viewBox="0 0 16 16" aria-hidden className="size-[18px] fill-current">
          <path d="M8 0C3.6 0 0 3.6 0 8c0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1.1-2.7-1.1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.6 7.6 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2.1 0 3.1-1.8 3.8-3.6 4 .3.2.5.7.5 1.4v2.1c0 .2.1.5.5.4A8 8 0 0 0 8 0Z" />
        </svg>
      )}
      Continue with {provider}
    </Button>
  );
}
