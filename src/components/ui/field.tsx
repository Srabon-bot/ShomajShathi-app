import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

/**
 * The shadcn `input` / `textarea` shells with the box removed. A field is an
 * underline, never a bordered control.
 */
const controlBase = [
  "w-full bg-transparent py-2 text-base text-foreground",
  "placeholder:text-subtle",
  "focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:text-muted",
];

export function Input({
  className,
  invalid,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(controlBase, invalid && "text-danger", className)}
      {...props}
    />
  );
}

export function Textarea({
  className,
  invalid,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={cn(controlBase, "min-h-28 resize-y leading-relaxed", className)}
      {...props}
    />
  );
}

export function Select({
  className,
  invalid,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <div className="relative">
      <select
        aria-invalid={invalid || undefined}
        className={cn(controlBase, "cursor-pointer appearance-none pr-8", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        strokeWidth={1.75}
        className="pointer-events-none absolute right-1 top-1/2 size-4 -translate-y-1/2 text-muted"
      />
    </div>
  );
}

export function Field({
  label,
  hint,
  error,
  required,
  htmlFor,
  className,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const messageId = htmlFor ? `${htmlFor}-message` : undefined;

  // Tie the visible message to the control so screen readers read it on focus.
  const control =
    React.isValidElement<{ "aria-describedby"?: string }>(children) &&
    (error || hint) &&
    messageId
      ? React.cloneElement(children, {
          "aria-describedby": children.props["aria-describedby"]
            ? `${children.props["aria-describedby"]} ${messageId}`
            : messageId,
        })
      : children;

  return (
    <div className={cn("flex flex-col", className)}>
      <div
        className={cn(
          "flex flex-col gap-1 border-b border-rule-soft pb-2 transition-colors duration-150",
          "focus-within:border-brand",
          error && "border-danger focus-within:border-danger",
        )}
      >
        <div className="flex items-baseline gap-2">
          <Label htmlFor={htmlFor}>
            {label}
          </Label>
          {required ? (
            <span className="t-label text-[9px] text-subtle">Required</span>
          ) : null}
        </div>
        {control}
      </div>
      {error ? (
        <p id={messageId} className="t-micro mt-1.5 text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="t-micro mt-1.5 text-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function Checkbox({
  label,
  className,
  invalid,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  invalid?: boolean;
}) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-3", className)}>
      <span className="relative mt-0.5 grid size-[18px] shrink-0 place-items-center">
        <input
          type="checkbox"
          aria-invalid={invalid || undefined}
          className={cn(
            "peer size-[18px] cursor-pointer appearance-none border transition-colors",
            "checked:border-foreground checked:bg-foreground",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            invalid ? "border-danger" : "border-rule",
          )}
          {...props}
        />
        <Check
          aria-hidden
          strokeWidth={3}
          className="pointer-events-none absolute size-3 text-background opacity-0 transition-opacity peer-checked:opacity-100"
        />
      </span>
      <span className="t-small text-foreground">{label}</span>
    </label>
  );
}
