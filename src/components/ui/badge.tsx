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
        "inline-flex items-center rounded-full border px-2.5 py-1 t-label",
        tone === "neutral" && "border-rule-soft bg-surface text-muted",
        tone === "accent" && "border-brand bg-brand text-brand-foreground",
        tone === "success" && "border-rule bg-surface text-foreground",
        tone === "danger" && "border-danger bg-danger-soft text-danger",
      )}
    >
      {children}
    </span>
  );
}
