import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { GalleryGrid } from "@/components/home/gallery-grid";
import { NewsletterForm } from "@/components/home/newsletter-form";
import { CategoryBand } from "@/components/home/category-band";
import { upcomingEvents } from "@/lib/mock-data";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const features = [
  {
    number: "01",
    title: "Create it",
    body: "A cleanup, a plantation drive, a winter clothes run. Four fields and a date — a stranger can find it the same afternoon.",
  },
  {
    number: "02",
    title: "Show up",
    body: "See how many places are left and join in one click. Leave the same way if plans change.",
  },
  {
    number: "03",
    title: "Keep the record",
    body: "Every event you attend is kept, with the hours and the neighbourhood. Something to point at in December.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — no photograph, type at poster scale */}
      <section className="shell pt-16 pb-10 md:pt-24 md:pb-14">
        <h1 className="t-mega text-foreground">
          Show up.
          <br />
          Clean, plant, give.
        </h1>

        <div className="mt-8 flex flex-col gap-4 border-t border-rule pt-6 md:flex-row md:items-start md:justify-between">
          <p className="t-h3 text-foreground">{site.tagline}</p>
          <p className="t-lead max-w-lg">
            Plan a cleanup, plant two hundred saplings, or collect winter clothes —
            then find the people who will stand next to you while you do it.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row">
          <Link href="/events" className={cn(buttonVariants({ size: "lg" }))}>
            Browse events
          </Link>
          <Link
            href="/events/new"
            className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
          >
            Create an event
          </Link>
        </div>
      </section>

      {/* The single yellow band */}
      <CategoryBand events={upcomingEvents.slice(0, 6)} />

      {/* How it works */}
      <section id="about" className="scroll-mt-24 py-16 md:py-24">
        <div className="shell">
          <h2 className="t-h2 text-foreground">How it works</h2>
          <div className="mt-10 grid gap-8 border-t border-rule pt-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.number}
                className={cn(index > 0 && "md:border-l md:border-rule md:pl-6")}
              >
                <p className="t-label text-muted">{feature.number}</p>
                <h3 className="t-h4 mt-3 text-foreground">{feature.title}</h3>
                <p className="t-small mt-2 text-muted">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="scroll-mt-24 border-t border-rule py-16 md:py-24">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="t-h2 text-foreground">From the field</h2>
              <p className="t-lead mt-3">
                Five frames from five Saturdays. No stock photography, no borrowed
                faces.
              </p>
            </div>
            <Link
              href="/#gallery"
              className={cn(buttonVariants({ variant: "secondary" }), "self-start")}
            >
              All photos
            </Link>
          </div>

          <GalleryGrid className="mt-8" />
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-y border-rule py-12">
        <div className="shell grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="t-h3 text-foreground">
              The next cleanup, in your inbox, before the group chat hears about it.
            </h2>
            <p className="t-small mt-2 max-w-md text-muted">
              One email a month, written by whoever ran the last event. Unsubscribe
              in a line.
            </p>
          </div>
          <div className="md:justify-self-end md:w-full md:max-w-md">
            <NewsletterForm />
            <p className="t-micro mt-3 text-subtle">Roughly 340 people get this.</p>
          </div>
        </div>
      </section>
    </>
  );
}
