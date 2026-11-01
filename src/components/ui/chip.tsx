import * as React from "react";
import { cn } from "@/lib/utils";
import type { EventType } from "@/lib/events";

/**
 * One pill shape, three jobs. Chips filter, TypeDot names the work in a single
 * colour, CountChip carries exactly one number. There are no taxonomy hues.
 */
export function Chip({
  selected,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "t-label rounded-full border px-3 py-1.5 transition-colors duration-150",
        selected
          ? "border-foreground bg-foreground text-background"
          : "border-rule text-foreground hover:bg-foreground hover:text-background",
        className,
      )}
      {...props}
    />
  );
}

export function TypeDot({
  type,
  className,
}: {
  type: EventType;
  className?: string;
}) {
  return (
    <span className={cn("t-label inline-flex items-center gap-1.5 text-muted", className)}>
      <span aria-hidden className="size-1.5 bg-foreground" />
      {type}
    </span>
  );
}

export function CountChip({
  children,
  full,
  className,
}: {
  children: React.ReactNode;
  full?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "t-label rounded-full px-2.5 py-1",
        full
          ? "bg-foreground text-background"
          : "bg-brand text-brand-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
