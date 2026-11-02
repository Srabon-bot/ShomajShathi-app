import type { EventStats } from "@/lib/events-api";

function daysUntil(iso: string | null): number | null {
  if (!iso) return null;
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return 0;
  return Math.ceil(diff / 86_400_000);
}

type Stat = { value: string; label: string };

function buildStats(data: EventStats): Stat[] {
  const days = daysUntil(data.nextEventDate);
  return [
    { value: String(data.pastEvents), label: "events completed" },
    { value: data.volunteers.toLocaleString("en-GB"), label: "volunteers showed up" },
    { value: String(data.upcomingEvents), label: "events ahead" },
    {
      value: days === null ? "—" : days === 0 ? "Today" : String(days),
      label: days === 0 ? "happening today" : "days to the next one",
    },
  ];
}

const PLACEHOLDER: Stat[] = [
  { value: "—", label: "events completed" },
  { value: "—", label: "volunteers showed up" },
  { value: "—", label: "events ahead" },
  { value: "—", label: "days to the next one" },
];

/**
 * Renders impact statistics on the home page.
 * Data is fetched server-side in the parent page and passed as a prop —
 * no client-side waterfall.
 */
export function ImpactBand({ stats: data }: { stats: EventStats | null }) {
  const stats = data ? buildStats(data) : PLACEHOLDER;

  return (
    <section className="border-y border-rule bg-hero py-14 text-hero-foreground" aria-label="Impact statistics">
      <div className="shell">
        <p className="t-label text-brand">By the numbers</p>
        <div className="mt-8 grid grid-cols-2 gap-y-8 sm:gap-y-10 border-t border-hero-foreground/20 pt-8 md:grid-cols-4">
          {stats.map(({ value, label }, index) => (
            <div
              key={label}
              className={`pl-4 sm:pl-6 ${
                index % 2 === 0 ? "border-l-0" : "border-l border-hero-foreground/20"
              } md:border-l md:border-hero-foreground/20 md:first:border-l-0`}
            >
              <p className="t-figure font-display text-3xl sm:text-5xl md:text-6xl leading-none text-hero-foreground">
                {value}
              </p>
              <p className="t-small mt-2 sm:mt-3 text-hero-muted text-xs sm:text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
