"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export function Pagination({
  page,
  totalPages,
  onChange,
  className,
}: {
  page: number;
  totalPages: number;
  onChange?: (page: number) => void;
  className?: string;
}) {
  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-between gap-4", className)}
    >
      <Button
        variant="secondary"
        size="sm"
        disabled={page <= 1}
        onClick={() => onChange?.(page - 1)}
      >
        <ChevronLeft aria-hidden />
        Previous
      </Button>

      <p className="t-label text-muted">
        Page {page} / {totalPages}
      </p>

      <Button
        variant="secondary"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onChange?.(page + 1)}
      >
        Next
        <ChevronRight aria-hidden />
      </Button>
    </nav>
  );
}
