import { cn } from "@/lib/utils";

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center rounded-full border border-rule-soft px-3 py-1 t-label", className)}>{children}</span>;
}

export function TypeDot({ type }: { type: string }) {
  return <span className="inline-flex items-center gap-2 t-label"><span className="size-2 rounded-full bg-brand" aria-hidden="true" />{type}</span>;
}

export function CountChip({ count, label = "spots" }: { count: number; label?: string }) {
  return <span className="inline-flex items-center rounded-full bg-brand px-3 py-1 t-label text-brand-foreground">{count} {label}</span>;
}
