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
    <footer className="border-t border-[#D5D0C3] bg-[#F3F0E7] text-[#0B0B0B] dark:border-[#363628] dark:bg-[#1C1D16] dark:text-[#EAE4D5]">
      <div className="shell grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl">
            <span className="text-[#0B0B0B] dark:text-[#EAE4D5]">shomaj</span>{" "}
            <span className="text-brand">shathi</span>
          </p>
          <p className="t-small mt-3 max-w-xs text-[#0B0B0B]/75 dark:text-[#EAE4D5]/70">{site.tagline}</p>
        </div>
        <div>
          <p className="t-label text-[#0B0B0B]/60 dark:text-[#EAE4D5]/60">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-[#0B0B0B]/90 dark:text-[#EAE4D5]/90">
            <Link className="hover:text-brand hover:underline dark:hover:text-[#F0E94A]" href="/events">Upcoming events</Link>
            <Link className="hover:text-brand hover:underline dark:hover:text-[#F0E94A]" href="/events/past">Past events</Link>
            <Link className="hover:text-brand hover:underline dark:hover:text-[#F0E94A]" href="/#gallery">Gallery</Link>
            <Link className="hover:text-brand hover:underline dark:hover:text-[#F0E94A]" href="/#about">About</Link>
          </div>
        </div>
        <div>
          <p className="t-label text-[#0B0B0B]/60 dark:text-[#EAE4D5]/60">Community</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-[#0B0B0B]/90 dark:text-[#EAE4D5]/90">
            <Link className="hover:text-brand hover:underline dark:hover:text-[#F0E94A]" href="/events/new">Create event</Link>
            <Link className="hover:text-brand hover:underline dark:hover:text-[#F0E94A]" href="/events/manage">Manage events</Link>
            <a className="hover:text-brand hover:underline dark:hover:text-[#F0E94A]" href={`mailto:${site.email}`}>Get involved</a>
          </div>
        </div>
        <div>
          <p className="t-label text-[#0B0B0B]/60 dark:text-[#EAE4D5]/60">Contact</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-[#0B0B0B]/90 dark:text-[#EAE4D5]/90">
            <a className="hover:text-brand hover:underline dark:hover:text-[#F0E94A]" href={`mailto:${site.email}`}>{site.email}</a>
            <p className="text-[#0B0B0B]/75 dark:text-[#EAE4D5]/70">{site.location}</p>
            <a
              aria-label="Shomaj Shathi on X"
              className="mt-1 inline-flex items-center gap-2 text-[#0B0B0B]/75 hover:text-black dark:text-[#EAE4D5]/70 dark:hover:text-[#EAE4D5]"
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
      <div className="border-t border-[#D5D0C3] dark:border-[#363628]">
        <div className="shell flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-small text-[#0B0B0B]/70 dark:text-[#EAE4D5]/60">© 2026 {site.name}</p>
          <p className="t-small text-[#0B0B0B]/70 dark:text-[#EAE4D5]/60">Community service, organised in Dhaka.</p>
        </div>
      </div>
    </footer>
  );
}
