"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Both icons render and CSS decides which one is visible. No mounted state,
 * so there is no hydration flash and no lint complaint.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle colour theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "relative grid size-10 place-items-center rounded-full border border-rule text-foreground transition-colors duration-150",
        "hover:bg-foreground hover:text-background",
        className,
      )}
    >
      <Sun
        aria-hidden
        strokeWidth={1.75}
        className="absolute size-4 transition-transform duration-200 dark:rotate-90 dark:scale-0 dark:opacity-0"
      />
      <Moon
        aria-hidden
        strokeWidth={1.75}
        className="absolute size-4 -rotate-90 scale-0 opacity-0 transition-transform duration-200 dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
    </button>
  );
}
