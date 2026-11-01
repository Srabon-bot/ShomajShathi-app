import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const controlClass =
  "w-full border-0 border-b border-rule-soft bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-subtle focus:border-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-70";

export function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="t-label" htmlFor={htmlFor}>
        {label} {required && <span className="text-brand" aria-hidden="true">*</span>}
      </label>
      {children}
      <p className={cn("t-small", error ? "text-danger" : "text-muted")}>
        {error ?? hint}
      </p>
    </div>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClass, "h-11", className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(controlClass, "min-h-28 resize-y py-3", className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(controlClass, "h-11", className)} {...props}>
      {children}
    </select>
  );
}
