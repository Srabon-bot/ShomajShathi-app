"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export interface TabItem {
  value: string;
  label: string;
  count?: number;
}

/**
 * shadcn's `tabs` primitive (Radix) restyled as pills. Radix keeps the roving
 * tabindex and `aria-selected`; the underline strip is thrown away.
 */
export function Tabs({
  items,
  value,
  onChange,
  className,
}: {
  items: readonly TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <TabsPrimitive.Root value={value} onValueChange={onChange} className={className}>
      <TabsPrimitive.List className="flex flex-wrap gap-2 bg-transparent">
        {items.map((item) => (
          <TabsPrimitive.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              "t-label rounded-full border border-rule px-4 py-2 text-muted transition-colors duration-150",
              "hover:text-foreground",
              "data-[state=active]:border-foreground data-[state=active]:bg-foreground data-[state=active]:text-background",
            )}
          >
            {item.label}
            {item.count !== undefined ? (
              <span className="ml-2 text-[10px] tabular-nums opacity-70">
                {item.count}
              </span>
            ) : null}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}
