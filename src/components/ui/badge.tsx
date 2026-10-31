import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "success" | "danger";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        tone === "neutral" && "border-border bg-surface-2 text-muted",
        tone === "accent" && "border-accent/25 bg-accent-soft text-accent",
        tone === "success" && "border-success/20 bg-success/10 text-success",
        tone === "danger" && "border-destructive/20 bg-destructive/10 text-destructive",
      )}
    >
      {children}
    </span>
  );
}
