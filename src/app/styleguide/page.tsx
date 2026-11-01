"use client";

import { EventCard } from "@/components/events/event-card";
import { EventRow } from "@/components/events/event-row";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { CountChip, Chip, TypeDot } from "@/components/ui/metadata";
import { SectionHeading, Stat } from "@/components/ui/section-heading";
import { EmptyState, Skeleton } from "@/components/ui/states";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import type { EventItem } from "@/lib/events";

const sample: EventItem = {
  id: "styleguide",
  title: "Buriganga Bank Cleanup",
  description: "A sample community event.",
  type: "Cleanup",
  date: "2026-12-10T04:00:00.000Z",
  location: "Buriganga ghat, Old Dhaka",
  image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
  capacity: 80,
  attendeeCount: 24,
  organizer: { id: "sample", name: "Shomaj Shathi", email: "hello@example.com" },
  joined: false,
  createdAt: "2026-01-01T00:00:00.000Z",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section id={title.toLowerCase().replaceAll(" ", "-")} className="border-t border-rule py-12"><h2 className="t-h2 mb-7">{title}</h2>{children}</section>;
}

export default function StyleguidePage() {
  return (
    <main>
      <header className="sticky top-0 z-30 border-b border-rule bg-background">
        <div className="shell flex items-center justify-between py-4">
          <p className="t-label">Shomaj Shathi / Styleguide</p>
          <ThemeToggle />
        </div>
      </header>
      <div className="shell grid gap-12 py-10 lg:grid-cols-[12rem_1fr]">
        <nav className="hidden self-start lg:sticky lg:top-24 lg:block" aria-label="Styleguide sections">
          <p className="t-label mb-4">Contents</p>
          <div className="space-y-2 t-small">
            {["Colour", "Typography", "Rules & shape", "Buttons", "Forms", "Chips & metadata", "Event card", "Dashboard shell", "Feedback", "Composition"].map((item) => <a className="block text-muted hover:text-foreground" href={`#${item.toLowerCase().replaceAll(" ", "-")}`} key={item}>{item}</a>)}
          </div>
        </nav>
        <div>
          <SectionHeading eyebrow="Interface specification" title="Styleguide" description="The visual contract used by every page." />
          <Section title="Colour"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{["background", "foreground", "brand", "sun", "sand", "danger"].map((token) => <div className="border border-rule p-4" key={token}><div className={`mb-3 h-16 bg-${token}`} /><p className="t-label">{token}</p></div>)}</div><div className="mt-8 grid gap-4 md:grid-cols-2"><div className="theme-light border border-rule bg-background p-6 text-foreground"><p className="t-label">Light island · ink on ground 19.68:1</p><p className="t-h3 mt-4">Printed poster</p></div><div className="theme-dark border border-rule bg-background p-6 text-foreground"><p className="t-label">Dark island · ink on ground 17.26:1</p><p className="t-h3 mt-4">Reversed poster</p></div></div></Section>
          <Section title="Typography"><div className="space-y-5"><p className="t-mega">Display</p><p className="t-h2">Heading two</p><p className="t-h3">Heading three</p><p className="t-lead">Lead paragraph for introductory information.</p><p className="t-body">Body copy is direct, readable, and set in one family.</p><p className="t-label">Labels use uppercase Archivo</p></div></Section>
          <Section title="Rules & shape"><div className="grid gap-4 md:grid-cols-3"><div className="border border-rule p-5">Square surfaces</div><div className="rounded-md border border-rule p-5">Action radius</div><div className="rounded-full border border-rule p-5">Pill metadata</div></div></Section>
          <Section title="Buttons"><div className="flex flex-wrap gap-3"><Button>Primary</Button><Button variant="accent">Brand</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button><Button variant="destructive">Delete</Button></div></Section>
          <Section title="Forms"><div className="grid gap-6 md:grid-cols-2"><Field label="Event title" htmlFor="title" required><Input id="title" placeholder="Buriganga Bank Cleanup" /></Field><Field label="Type" htmlFor="type"><Select id="type"><option>Cleanup</option><option>Donation</option></Select></Field><Field label="Description" htmlFor="description"><Textarea id="description" placeholder="What happens on the day?" /></Field></div></Section>
          <Section title="Chips & metadata"><div className="flex flex-wrap items-center gap-3"><Chip>Upcoming</Chip><TypeDot type="Cleanup" /><CountChip count={56} label="available" /><Badge tone="danger">Full</Badge><Stat value="24" label="events" /></div></Section>
          <Section title="Event card"><div className="max-w-sm"><EventCard event={sample} /></div></Section>
          <Section title="Dashboard shell"><div className="grid gap-0 border border-rule md:grid-cols-[12rem_1fr]"><aside className="bg-sand p-6"><p className="t-label">Member area</p><p className="t-h4 mt-4">Dashboard</p></aside><div className="p-6"><EventRow event={sample} /></div></div></Section>
          <Section title="Feedback"><div className="space-y-4"><Skeleton className="h-5 w-2/3" /><EmptyState title="No events yet" description="Create your first event and it will appear here." /></div></Section>
          <Section title="Composition"><div className="border border-rule bg-sun p-8"><p className="t-label">Yellow appears once</p><p className="t-display mt-4">Make time. Make change.</p><Button className="mt-6" variant="primary">Explore events</Button></div></Section>
        </div>
      </div>
    </main>
  );
}
