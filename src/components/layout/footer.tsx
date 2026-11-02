import Link from "next/link";

import { site } from "@/lib/site";

function XIcon() {
  return (
    <svg aria-hidden="true" className="size-4 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-rule bg-surface mt-2">
      <div className="shell grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl"><span className="text-foreground">shomaj</span> <span className="text-brand">shathi</span></p>
          <p className="t-small mt-3 max-w-xs text-muted">{site.tagline}</p>
        </div>
        <div>
          <p className="t-label text-muted">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link className="hover:underline" href="/events">Upcoming events</Link>
            <Link className="hover:underline" href="/#gallery">Gallery</Link>
            <Link className="hover:underline" href="/#about">About</Link>
          </div>
        </div>
        <div>
          <p className="t-label text-muted">Community</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link className="hover:underline" href="/events/new">Create event</Link>
            <Link className="hover:underline" href="/events/manage">Manage events</Link>
            <a className="hover:underline" href={`mailto:${site.email}`}>Get involved</a>
          </div>
        </div>
        <div>
          <p className="t-label text-muted">Contact</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <a className="hover:underline" href={`mailto:${site.email}`}>{site.email}</a>
            <p className="text-muted">{site.location}</p>
            <a
              aria-label="Shomaj Shathi on X"
              className="mt-1 inline-flex items-center gap-2 text-muted hover:text-foreground"
              href={site.xUrl}
              rel="noreferrer"
              target="_blank"
            >
              <XIcon />
              Follow on X
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-rule">
        <div className="shell flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-small text-muted">© 2026 {site.name}</p>
          <p className="t-small text-muted">Community service, organised in Dhaka.</p>
        </div>
      </div>
    </footer>
  );
}
