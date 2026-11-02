import Link from "next/link";

import { AreaIndex } from "@/components/home/area-index";
import { HomeEvents } from "@/components/home/home-events";
import { ImpactBand } from "@/components/home/impact-band";
import { GalleryCarousel } from "@/components/home/moments-carousel";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

const features = [
  ["Create it", "Turn a good idea into a clear event that neighbours can find."],
  ["Show up", "Browse upcoming work and join the effort that fits your Saturday."],
  ["Keep the record", "See what you have joined and the places you have helped."],
] as const;

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="border-b border-rule bg-hero text-hero-foreground">
          <div className="shell flex min-h-[60svh] sm:min-h-[70svh] flex-col justify-end gap-6 sm:gap-8 py-14 sm:py-20 md:py-28">
            <p className="t-label text-brand">Dhaka · Community service</p>
            <div className="max-w-3xl">
              <h1 className="t-mega">Show up. That&apos;s the whole thing.</h1>
              <p className="t-lead mt-4 sm:mt-6 max-w-xl text-hero-muted">Plan a cleanup, plant a hundred saplings, or collect winter clothes with people who live nearby.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center rounded-md bg-brand px-5 text-sm font-bold text-brand-foreground hover:bg-brand-hover text-center" href="/events">Browse events</Link>
              <Link className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center rounded-md border border-hero-foreground px-5 text-sm font-bold text-hero-foreground hover:bg-hero-foreground hover:text-hero text-center" href="/events/new">Create an event</Link>
            </div>
          </div>
        </section>

        {/* Upcoming events band */}
        <section className="border-b border-rule bg-band py-12 text-band-foreground md:py-16">
          <div className="shell">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="t-label">Upcoming events</p>
                <h2 className="t-h2 mt-4">Find the next useful thing to do.</h2>
              </div>
              <Link className="t-label text-band-foreground/70 hover:text-band-foreground shrink-0" href="/events/past">
                See the archive →
              </Link>
            </div>
            <div className="mt-8"><HomeEvents /></div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-b border-rule bg-white py-16 dark:bg-[#1C1D16]" id="about">
          <div className="shell grid gap-8 md:grid-cols-3">
            {features.map(([title, description], index) => (
              <article className="border-t border-rule pt-5" key={title}>
                <p className="t-label">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mt-4 text-[#0B0B0B] dark:text-[#EAE4D5]">{title}</h3>
                <p className="t-small mt-3 text-muted dark:text-[#A8A295]">{description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Impact stats */}
        <ImpactBand />

        {/* Gallery carousel */}
        <section className="border-b border-rule bg-[#F3F0E7] py-14 dark:bg-[#1C1D16]" id="gallery">
          <div className="shell">
            <div className="mb-6">
              <p className="t-label text-brand">Gallery</p>
              <h2 className="t-h2 mt-4 text-[#0B0B0B] dark:text-[#EAE4D5]">Small actions, visible change.</h2>
            </div>
            <GalleryCarousel />
          </div>
        </section>

        {/* Where we work */}
        <AreaIndex />

        {/* Newsletter */}
        <section
          className="border-b border-rule bg-[#0B0B0B] py-16 text-white dark:border-[#11120E] dark:bg-[#F0E94A] dark:text-[#11120E]"
          aria-label="Newsletter signup"
        >
          <div className="shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="t-label text-brand dark:text-[#11120E]">Newsletter</p>
              <h2 className="t-h2 mt-3 text-white dark:text-[#11120E]">Good things happen when we show up.</h2>
              <p className="t-lead mt-3 text-white/85 dark:text-[#11120E]/85">Get notified when new community events open.</p>
              <p className="t-small mt-2 text-white/50 dark:text-[#11120E]/60">Design preview — no emails are stored.</p>
            </div>
            <div className="w-full md:max-w-sm">
              <label className="t-label text-white/70 dark:text-[#11120E]/80" htmlFor="newsletter-email">Email address</label>
              <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  id="newsletter-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="flex h-11 w-full rounded-md border border-[#2a2a2a] bg-[#1a1a1a] px-3.5 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none focus:ring-1 focus:ring-white dark:border-[#11120E] dark:bg-[#11120E]/10 dark:text-[#11120E] dark:placeholder:text-[#11120E]/50 dark:focus:border-[#11120E] dark:focus:ring-[#11120E]"
                />
                <button
                  className="inline-flex min-h-11 shrink-0 w-full sm:w-auto items-center justify-center rounded-md bg-[#F5EF3F] px-5 text-sm font-bold text-[#0B0B0B] transition-colors hover:bg-[#eae432] dark:bg-[#11120E] dark:text-[#EAE4D5] dark:hover:bg-[#1C1D16]"
                  type="button"
                >
                  Subscribe &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
