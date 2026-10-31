import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { SectionHeading, Stat } from "@/components/ui/section-heading";
import { Skeleton, EmptyState } from "@/components/ui/states";

export default function StyleguidePage() {
  return (
    <main className="shell space-y-16 py-12">
      <SectionHeading eyebrow="Uddom system" title="Styleguide" description="The shared materials and components behind every page." />
      <section className="space-y-6">
        <h2 className="t-h2">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Primary action</Button>
          <Button variant="accent">Create event</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </section>
      <section className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <h2 className="t-h2">Forms</h2>
          <Field label="Event title" htmlFor="title" required hint="What a volunteer would search for.">
            <Input id="title" placeholder="Buriganga Bank Cleanup" />
          </Field>
          <Field label="Type" htmlFor="type">
            <Select id="type"><option>Cleanup</option><option>Plantation</option></Select>
          </Field>
          <Field label="Description" htmlFor="description">
            <Textarea id="description" placeholder="What happens on the day?" />
          </Field>
        </div>
        <div className="space-y-5">
          <h2 className="t-h2">States</h2>
          <div className="flex flex-wrap gap-2"><Badge>Upcoming</Badge><Badge tone="accent">Closing soon</Badge><Badge tone="success">Joined</Badge><Badge tone="danger">Full</Badge></div>
          <div className="grid grid-cols-2 gap-4 rounded-md border border-border p-5"><Stat value="24" label="events" /><Stat value="1,284" label="hours volunteered" /></div>
          <Skeleton className="h-5 w-2/3" />
          <EmptyState title="No events yet" description="Create your first event and it will appear here." />
        </div>
      </section>
    </main>
  );
}
