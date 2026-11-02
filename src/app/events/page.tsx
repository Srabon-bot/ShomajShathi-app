import Link from "next/link";

import { EventsBrowser } from "@/components/events/events-browser";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { mastheadPrimary, PageHeader } from "@/components/ui/page-header";

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Upcoming"
          title="Next useful things to do."
          description="Events created by people in the community, sorted by date."
          action={
            <Link className={mastheadPrimary} href="/events/new">
              Create event
            </Link>
          }
        />
        <EventsBrowser />
      </main>
      <Footer />
    </>
  );
}
