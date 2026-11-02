import Link from "next/link";

import { cn } from "@/lib/utils";

export const mastheadPrimary =
  "inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-bold text-brand-foreground hover:bg-brand-hover";
export const mastheadSecondary =
  "inline-flex min-h-11 items-center justify-center rounded-md border border-hero-foreground px-5 text-sm font-bold text-hero-foreground hover:bg-hero-foreground hover:text-hero";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  meta,
  back,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  meta?: React.ReactNode;
  back?: { href: string; label: string };
}) {
  return (
    <section className={cn("bg-hero text-hero-foreground", !meta && "border-b border-rule")}>
      <div className="shell py-10 md:py-14">
        {back && (
          <Link
            className="t-small inline-flex items-center gap-2 text-hero-muted hover:text-hero-foreground"
            href={back.href}
          >
            <span aria-hidden="true">&larr;</span>
            {back.label}
          </Link>
        )}
        <p className={cn("t-label flex items-center gap-2 text-brand", back && "mt-8")}>
          <span className="h-px w-6 bg-brand" aria-hidden="true" />
          {eyebrow}
        </p>
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="t-display">{title}</h1>
            {description && <p className="t-lead mt-4 max-w-2xl text-hero-muted">{description}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </div>
      {meta && (
        <div className="border-y border-rule bg-band text-band-foreground">
          <div className="shell py-3">{meta}</div>
        </div>
      )}
    </section>
  );
}
