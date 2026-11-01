import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { SectionHeading, Stat } from "@/components/ui/section-heading";
import { Skeleton, EmptyState } from "@/components/ui/states";
import { InlineAlert } from "@/components/ui/inline-alert";
import { ThemeToggle } from "@/components/theme-toggle";
import { EventCard, EventRow } from "@/components/events/event-card";
import { events } from "@/lib/mock-data";
import { ToastDemo } from "@/components/styleguide/toast-demo";
import {
  ChipsDemo,
  DialogDemo,
  FormDemo,
  TabsDemo,
} from "./samples";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "Every component in the system, in both themes.",
};

const colours = [
  { name: "Ground", className: "bg-background", ratio: "19.68" },
  { name: "Surface", className: "bg-surface", ratio: "19.68" },
  { name: "Sand", className: "bg-sand", ratio: "14.90" },
  { name: "Sun", className: "bg-sun", ratio: "16.12" },
  { name: "Ink", className: "bg-foreground", ratio: "—" },
  { name: "Muted", className: "bg-muted", ratio: "6.69" },
  { name: "Subtle", className: "bg-subtle", ratio: "4.54" },
  { name: "Rule", className: "bg-rule", ratio: "—" },
  { name: "Rule soft", className: "bg-rule-soft", ratio: "—" },
  { name: "Brand", className: "bg-brand", ratio: "6.37 (ink on brand)" },
  { name: "Brand ink", className: "bg-brand-ink", ratio: "4.87" },
  { name: "Danger", className: "bg-danger", ratio: "—" },
];

const typeRoles = [
  { className: "t-mega", label: "t-mega", sample: "Show up." },
  { className: "t-display", label: "t-display", sample: "Every event" },
  { className: "t-h2", label: "t-h2", sample: "Upcoming events" },
  { className: "t-h3", label: "t-h3", sample: "How it works" },
  { className: "t-h4", label: "t-h4", sample: "What to bring" },
  { className: "t-lead", label: "t-lead", sample: "One sentence of lead copy under the heading." },
  { className: "t-body", label: "t-body", sample: "Body copy at sixteen pixels, one and a half line height." },
  { className: "t-small", label: "t-small", sample: "Small copy for card metadata and hints." },
  { className: "t-micro", label: "t-micro", sample: "Micro copy for captions and legal lines." },
  { className: "t-label", label: "t-label", sample: "Table header" },
  { className: "t-figure", label: "t-figure", sample: "1,284" },
];

function ThemeIsland({
  theme,
  children,
}: {
  theme: "light" | "dark";
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        theme === "light"
          ? "theme-light border border-rule bg-background p-5 text-foreground"
          : "theme-dark border border-rule bg-background p-5 text-foreground"
      }
    >
      <p className="t-label mb-4 text-muted">{theme}</p>
      {children}
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <div className="shell py-10 md:py-14">
      <div className="sticky top-18 z-20 -mx-5 mb-8 flex items-center justify-between border-b border-rule bg-background px-5 py-3 md:-mx-8 md:px-8 xl:-mx-10 xl:px-10">
        <h1 className="t-h3 text-foreground">Styleguide</h1>
        <ThemeToggle />
      </div>

      <div className="space-y-16">
        {/* 1. Colour */}
        <section>
          <h2 className="t-h2 text-foreground">Colour</h2>
          <p className="t-lead mt-3 max-w-xl">
            One accent. Orange always carries black text; orange text uses the
            darker cut. Ratios are measured, not estimated.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {(["light", "dark"] as const).map((theme) => (
              <ThemeIsland key={theme} theme={theme}>
                <div className="grid grid-cols-2 gap-2">
                  {colours.map((colour) => (
                    <div key={colour.name} className="border border-rule">
                      <div className={`h-10 w-full ${colour.className}`} />
                      <div className="p-2">
                        <p className="t-label text-foreground">{colour.name}</p>
                        <p className="t-micro text-muted">{colour.ratio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ThemeIsland>
            ))}
          </div>
        </section>

        {/* 2. Typography */}
        <section>
          <h2 className="t-h2 text-foreground">Typography</h2>
          <p className="t-lead mt-3 max-w-xl">
            Archivo Black for display, Archivo for everything else. No serif, no
            mono.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {(["light", "dark"] as const).map((theme) => (
              <ThemeIsland key={theme} theme={theme}>
                <div className="space-y-4">
                  {typeRoles.map((role) => (
                    <div key={role.label}>
                      <p className="t-label text-subtle">{role.label}</p>
                      <p className={`${role.className} mt-1 text-foreground`}>
                        {role.sample}
                      </p>
                    </div>
                  ))}
                </div>
              </ThemeIsland>
            ))}
          </div>
        </section>

        {/* 3. Rules and shape */}
        <section>
          <h2 className="t-h2 text-foreground">Rules &amp; shape</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div>
              <div className="h-24 border border-rule bg-surface" />
              <p className="t-label mt-2 text-muted">Square · surfaces</p>
            </div>
            <div>
              <div className="grid h-24 place-items-center">
                <span className="grid h-12 w-40 place-items-center rounded-md bg-foreground text-background t-label">
                  Action
                </span>
              </div>
              <p className="t-label mt-2 text-muted">8px · primary button</p>
            </div>
            <div>
              <div className="grid h-24 place-items-center">
                <span className="t-label rounded-full border border-rule px-4 py-2 text-foreground">
                  Pill
                </span>
              </div>
              <p className="t-label mt-2 text-muted">Pill · controls</p>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            <div className="h-px w-full bg-rule" />
            <div className="h-px w-full bg-rule-soft" />
            <div className="h-px w-full bg-rule-sand" />
          </div>
          <p className="t-micro mt-3 text-subtle">
            rule · rule-soft · rule-sand. No shadows anywhere.
          </p>
        </section>

        {/* 4. Buttons */}
        <section>
          <h2 className="t-h2 text-foreground">Buttons</h2>
          <div className="mt-6 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link action</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Icon action">
                +
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button variant="secondary" disabled>
                Disabled secondary
              </Button>
            </div>
            <Button block size="lg">
              Full width action
            </Button>
          </div>
        </section>

        {/* 5. Forms */}
        <section>
          <h2 className="t-h2 text-foreground">Forms</h2>
          <p className="t-lead mt-3 max-w-xl">
            Fields are underlines, not boxes. Errors replace hints.
          </p>
          <div className="mt-6">
            <FormDemo />
          </div>
        </section>

        {/* 6. Chips and metadata */}
        <section>
          <h2 className="t-h2 text-foreground">Chips &amp; metadata</h2>
          <div className="mt-6 space-y-6">
            <ChipsDemo />
            <div className="grid grid-cols-2 gap-6 border-y border-rule py-6 md:grid-cols-4">
              <Stat value="1,284" label="Hours volunteered" />
              <Stat value="342" label="Volunteers" />
              <Stat value="26" label="Events run" />
              <Stat value="11" label="Neighbourhoods" />
            </div>
          </div>
        </section>

        {/* 7. Event card */}
        <section>
          <h2 className="t-h2 text-foreground">Event card</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <EventCard event={events[0]} />
            <EventCard event={events[2]} />
            <EventCard event={events[4]} />
          </div>
          <div className="mt-8 border-t border-rule">
            <EventRow
              event={events[1]}
              status={<span className="t-label text-subtle">Closed</span>}
              actions={
                <Button variant="secondary" size="sm">
                  View
                </Button>
              }
            />
          </div>
        </section>

        {/* 8. Dashboard shell */}
        <section>
          <h2 className="t-h2 text-foreground">Dashboard shell</h2>
          <p className="t-lead mt-3 max-w-xl">
            Sand sidebar, ruled content column. Signed-in pages only.
          </p>
          <div className="mt-6 grid gap-0 border border-rule sm:grid-cols-[17.5rem_1fr]">
            <div className="border-b border-rule bg-sand p-6 sm:border-b-0 sm:border-r">
              <p className="t-h3 text-foreground">Nusrat Jahan</p>
              <p className="t-label mt-2 break-all text-muted">
                nusrat@example.com
              </p>
              <div className="mt-6 border-t border-rule-sand" />
              <div className="mt-6 space-y-2">
                <span className="t-label block rounded-full border border-foreground bg-foreground px-4 py-3 text-background">
                  Your events
                </span>
                <span className="t-label block rounded-full border border-rule px-4 py-3 text-foreground">
                  Joined events
                </span>
                <span className="t-label block rounded-full border border-rule px-4 py-3 text-foreground">
                  Profile
                </span>
              </div>
              <div className="mt-10 border-t border-rule-sand pt-4">
                <span className="t-label flex items-center justify-between text-foreground">
                  Log out <span aria-hidden>→</span>
                </span>
              </div>
            </div>
            <div className="min-w-0 bg-background p-6">
              <SectionHeading
                title="Your events"
                description="One page header, one action, then the record."
                action={<Button size="sm">Create event</Button>}
              />
              <div className="mt-6 border-t border-rule">
                <EventRow event={events[0]} />
              </div>
            </div>
          </div>
        </section>

        {/* 9. Feedback */}
        <section>
          <h2 className="t-h2 text-foreground">Feedback</h2>
          <div className="mt-6 space-y-6">
            <div className="grid gap-3 md:grid-cols-2">
              <InlineAlert tone="danger">
                That email and password do not match an account.
              </InlineAlert>
              <InlineAlert tone="success">
                Account created. Let&apos;s find you something to join.
              </InlineAlert>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <ToastDemo />
              <DialogDemo />
              <TabsDemo />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Skeleton className="aspect-[4/3] w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>

            <EmptyState
              title="No events joined yet"
              description="Pick a cleanup and it lands here with your volunteer hours."
              action={<Button variant="secondary">Browse events</Button>}
            />
          </div>
        </section>

        {/* 10. Composition */}
        <section>
          <h2 className="t-h2 text-foreground">Composition</h2>
          <p className="t-lead mt-3 max-w-xl">
            A real fragment assembled from the components above — never a
            lorem-filled mock.
          </p>
          <div className="mt-8 border-t border-rule pt-8">
            <SectionHeading
              title="Upcoming events"
              description="Every event below was created by someone in the community."
              action={<Button variant="secondary">All events</Button>}
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <EventCard event={events[0]} />
              <EventCard event={events[1]} />
              <EventCard event={events[3]} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
