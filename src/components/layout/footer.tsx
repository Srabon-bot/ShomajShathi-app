import Link from "next/link";

import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="shell grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl">{site.wordmark}<span className="ml-1 inline-block size-1.5 rounded-full bg-accent" /></p>
          <p className="t-small mt-3 max-w-xs text-muted">{site.tagline}</p>
        </div>
        <div>
          <p className="t-label text-muted">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/events">Upcoming events</Link>
            <Link href="/events/new">Create event</Link>
          </div>
        </div>
        <div>
          <p className="t-label text-muted">Contact</p>
          <p className="t-small mt-4 text-muted">{site.location}</p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="shell py-5">
          <p className="t-small text-muted">© 2026 {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
