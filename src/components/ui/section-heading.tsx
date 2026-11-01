import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Every section heading, with no eyebrow prop. A big caps line is the whole
 * announcement; a label above it is a bug.
 */
export function SectionHeading({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <h2 className="t-h2 text-balance text-foreground">{title}</h2>
        {description ? <p className="t-lead mt-3">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/** Proof numbers. Tabular figures, no icons, divided by rules. */
export function Stat({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("px-4 first:pl-0", className)}>
      <span className="t-figure block text-4xl text-foreground md:text-5xl">
        {value}
      </span>
      <span className="t-label mt-2 block text-muted">{label}</span>
    </div>
  );
}
