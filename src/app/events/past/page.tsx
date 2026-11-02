import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PageHeader } from "@/components/ui/page-header";
import { PastEventsBrowser } from "@/components/events/past-events-browser";
import Link from "next/link";
import { mastheadSecondary } from "@/components/ui/page-header";

export const metadata = {
  title: "Past Events — Shomaj Shathi",
  description:
    "A record of every cleanup, plantation, donation drive, and education session that Shomaj Shathi volunteers completed around Dhaka.",
};

export default function PastEventsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Archive"
          title="What we already did."
          description="Every event that has passed, with the numbers to show for it."
          action={
            <Link className={mastheadSecondary} href="/events">
              See upcoming events
            </Link>
          }
          meta={
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="t-label">Completed events</span>
              <span className="t-label">Sorted newest first by default</span>
            </div>
          }
        />
        <PastEventsBrowser />
      </main>
      <Footer />
    </>
  );
}
