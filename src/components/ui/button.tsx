import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva("inline-flex min-h-11 items-center justify-center rounded-md px-5 text-sm font-bold transition-colors", {
  variants: {
    variant: {
      primary: "bg-foreground text-background hover:bg-brand hover:text-brand-foreground",
      secondary: "border border-rule bg-surface text-foreground hover:bg-foreground hover:text-background",
      accent: "bg-brand text-brand-foreground hover:bg-brand-hover",
      ghost: "text-foreground hover:bg-surface",
      destructive: "border border-danger text-danger hover:bg-danger-soft",
    },
    size: {
      sm: "min-h-9 px-3.5 text-xs",
      md: "min-h-11 px-5 text-sm",
      lg: "min-h-12 px-6 text-[15px]",
      icon: "size-11 px-0",
    },
    block: { true: "w-full", false: "" },
  },
  defaultVariants: { variant: "primary", size: "md", block: false },
});

export function Button({
  className,
  variant,
  size,
  block,
  loading = false,
  children,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { loading?: boolean }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, block }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? "Working…" : children}
    </button>
  );
}
