"use client";

import { useState } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { getAbsoluteNextPath } from "@/lib/auth-redirect";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48Z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.3-1.69-1.3-1.69-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.11-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.42.36.79 1.08.79 2.17 0 1.57-.01 2.83-.01 3.21 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"
      />
    </svg>
  );
}

const providers = [
  { id: "google", label: "Google", Icon: GoogleIcon },
  { id: "github", label: "GitHub", Icon: GitHubIcon },
] as const;

export function SocialButtons() {
  const [pending, setPending] = useState<"google" | "github" | null>(null);

  async function signIn(provider: "google" | "github") {
    setPending(provider);
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: getAbsoluteNextPath(),
      });
      if (error) {
        const label = provider === "google" ? "Google" : "GitHub";
        toast.error(
          /provider|config|not found|disabled/i.test(error.message ?? "")
            ? `${label} sign-in is not configured on this deployment yet.`
            : error.message || `${label} sign-in failed.`,
        );
        setPending(null);
      }
    } catch {
      toast.error("Social sign-in is unavailable right now. Try email instead.");
      setPending(null);
    }
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {providers.map(({ id, label, Icon }) => (
        <button
          key={id}
          className="inline-flex min-h-11 items-center justify-center gap-2 border border-rule px-4 text-sm font-bold hover:bg-foreground hover:text-background disabled:opacity-60"
          type="button"
          disabled={pending !== null}
          aria-busy={pending === id || undefined}
          onClick={() => signIn(id)}
        >
          <Icon />
          {pending === id ? "Opening…" : `Continue with ${label}`}
        </button>
      ))}
    </div>
  );
}
