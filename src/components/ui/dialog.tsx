"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * shadcn's `dialog` primitive (Radix) with the panel rebuilt: no radius, no
 * shadow, no blur. Radix keeps the focus trap, Esc handling and scroll lock.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/60" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2",
            "border border-rule bg-surface p-8 text-foreground focus:outline-none",
            className,
          )}
        >
          <DialogPrimitive.Title className="t-h3 pr-10 text-foreground">
            {title}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description
            className={cn(description ? "t-small mt-3 text-muted" : "sr-only")}
          >
            {description ?? title}
          </DialogPrimitive.Description>

          {children}
          {footer ? (
            <div className="mt-8 flex flex-wrap justify-end gap-2">{footer}</div>
          ) : null}

          <DialogPrimitive.Close
            aria-label="Close"
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-rule text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            <X aria-hidden className="size-4" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
