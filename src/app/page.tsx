import Link from "next/link";

import { HomeEvents } from "@/components/home/home-events";
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
        <section className="border-b border-rule bg-foreground text-background">
          <div className="shell flex min-h-[70svh] flex-col justify-end gap-8 py-20 md:py-28">
            <p className="t-label text-brand">Dhaka · Community service</p>
            <div className="max-w-3xl">
              <h1 className="t-mega">Show up. That&apos;s the whole thing.</h1>
              <p className="t-lead mt-6 max-w-xl text-background/75">Plan a cleanup, plant a hundred saplings, or collect winter clothes with people who live nearby.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-bold text-brand-foreground hover:bg-brand-hover" href="/events">Browse events</Link>
              <Link className="inline-flex min-h-11 items-center justify-center rounded-md border border-background px-5 text-sm font-bold text-background" href="/events/new">Create an event</Link>
            </div>
          </div>
        </section>
        <section className="border-b border-rule bg-sun py-12 md:py-16">
          <div className="shell">
            <p className="t-label">Upcoming events</p>
            <h2 className="t-h2 mt-4">Find the next useful thing to do.</h2>
            <div className="mt-8"><HomeEvents /></div>
          </div>
        </section>
        <section className="py-16">
          <div className="shell grid gap-8 md:grid-cols-3">
            {features.map(([title, description], index) => <article className="border-t border-rule pt-5" key={title}><p className="t-label">{String(index + 1).padStart(2, "0")}</p><h3 className="t-h3 mt-4">{title}</h3><p className="t-small mt-3 text-muted">{description}</p></article>)}
          </div>
        </section>
        <section className="border-y border-rule py-16"><div className="shell grid gap-8 md:grid-cols-2"><div><p className="t-label text-brand-ink">Gallery</p><h2 className="t-h2 mt-4">Small actions, visible change.</h2></div><div className="grid grid-cols-2 gap-2">{["photo-1488521787991-ed7bbaae773c", "photo-1542601906990-b4d3fb778b09", "photo-1532996122724-e3c354a0b15b", "photo-1503676260728-1c00da094a0b"].map((photo) => <img className="aspect-square size-full object-cover" alt="" key={photo} src={`https://images.unsplash.com/${photo}`} />)}</div></div></section>
        <section className="py-12"><div className="shell flex flex-col gap-5 md:flex-row md:items-center md:justify-between"><div><p className="t-label">Stay close to the work</p><p className="t-lead mt-2">A design-only newsletter for future community updates.</p></div><Link className="inline-flex min-h-11 items-center justify-center rounded-md bg-foreground px-5 text-sm font-bold text-background" href="/events">Explore events</Link></div></section>
      </main>
      <Footer />
    </>
  );
}
