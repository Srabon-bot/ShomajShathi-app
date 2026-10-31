import Link from "next/link";

import { site } from "@/lib/site";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link className="font-display text-[22px] lowercase tracking-tight" href="/">
            {site.wordmark}<span className="ml-1 inline-block size-1.5 rounded-full bg-accent" />
          </Link>
          <Link className="hidden text-sm text-muted hover:text-foreground md:block" href="/events">
            Upcoming events
          </Link>
        </div>
        <Link className="button button-secondary min-h-9 px-3 text-xs" href="/login">
          Log in
        </Link>
      </div>
    </header>
  );
}
