import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SectionHeading } from "@/components/ui/section-heading";
import { EventsBrowser } from "@/components/events/events-browser";

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main className="section">
        <div className="shell">
          <SectionHeading eyebrow="Upcoming" title="Next useful things to do." description="Events created by people in the community, sorted by date." />
          <div className="mt-8"><EventsBrowser /></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
