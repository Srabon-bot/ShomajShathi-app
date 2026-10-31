import Link from "next/link";

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
        <section className="border-b border-border bg-surface-inverse text-primary-foreground">
          <div className="shell flex min-h-[70svh] flex-col justify-end gap-8 py-20 md:py-28">
            <p className="t-label text-accent">Dhaka · Community service</p>
            <div className="max-w-3xl">
              <h1 className="t-display-xl">Show up. That&apos;s the whole thing.</h1>
              <p className="t-lead mt-6 max-w-xl text-primary-foreground/75">
                Plan a cleanup, plant a hundred saplings, or collect winter clothes
                with people who live nearby.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className="button button-primary" href="/events">
                Browse events
              </Link>
              <Link className="button button-secondary" href="/events/new">
                Create an event
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell">
            <p className="t-label text-accent">How it works</p>
            <h2 className="t-h2 mt-4">Neighbourhood service, organised.</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {features.map(([title, description]) => (
                <article className="card" key={title}>
                  <h3 className="t-h4">{title}</h3>
                  <p className="t-small mt-3 text-muted">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section border-y border-border bg-surface">
          <div className="shell grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="t-label text-accent">Start here</p>
              <h2 className="t-h2 mt-4">Find the next useful thing to do.</h2>
              <p className="t-lead mt-4 max-w-2xl">
                Every event is created by someone in the community. Pick one and
                show up.
              </p>
            </div>
            <Link className="button button-primary" href="/events">
              Upcoming events
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
