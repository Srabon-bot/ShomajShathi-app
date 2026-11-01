"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";

/**
 * Sonner keeps its own light/dark tokens, so it has to be told which one the
 * page is in — otherwise the close button and icon colours drift.
 */
function ThemedToaster() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      position="bottom-right"
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "!rounded-none !border !border-rule !bg-surface !text-foreground !font-sans !shadow-none",
          title: "!text-[13px] !font-bold !uppercase !tracking-[0.04em]",
          description: "!text-[13px] !text-muted",
          actionButton: "!rounded-md !bg-foreground !text-background !text-xs",
          cancelButton:
            "!rounded-full !border !border-rule !bg-transparent !text-foreground !text-xs",
          closeButton:
            "!rounded-full !border-rule !bg-surface !text-muted hover:!text-foreground",
          success: "[&_[data-icon]]:!text-brand",
          error: "[&_[data-icon]]:!text-danger",
        },
      }}
    />
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <ThemedToaster />
    </ThemeProvider>
  );
}
