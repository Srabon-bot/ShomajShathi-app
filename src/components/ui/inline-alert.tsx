import * as React from "react";
import { cn } from "@/lib/utils";

const tones = {
  danger: "border-l-danger bg-danger-soft",
  success: "border-l-brand bg-surface",
  info: "border-l-transparent bg-surface",
} as const;

/** Form-level messages. Field-level errors stay inside <Field>. */
export function InlineAlert({
  tone = "info",
  children,
  className,
}: {
  tone?: keyof typeof tones;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn(
        "t-small border border-rule border-l-4 px-4 py-3 text-foreground",
        tones[tone],
        className,
      )}
    >
      {children}
    </div>
  );
}
