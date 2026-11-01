import { cn } from "@/lib/utils";

/**
 * Square ends, black fill. Colour never carries meaning alone: the number is
 * always on screen.
 */
export function CapacityMeter({
  joined,
  capacity,
  className,
}: {
  joined: number;
  capacity: number;
  className?: string;
}) {
  const safeCapacity = Math.max(1, capacity);
  const ratio = Math.min(1, Math.max(0, joined / safeCapacity));
  const left = Math.max(0, safeCapacity - joined);
  const full = left === 0;

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className="h-2 w-full overflow-hidden bg-foreground/10"
        role="progressbar"
        aria-valuenow={joined}
        aria-valuemin={0}
        aria-valuemax={safeCapacity}
        aria-label={`${joined} of ${safeCapacity} places taken`}
      >
        <div
          className={cn(
            "h-full transition-[width] duration-500 ease-out",
            full ? "bg-danger" : ratio >= 0.9 ? "bg-brand" : "bg-foreground",
          )}
          style={{ width: `${ratio * 100}%` }}
        />
      </div>

      <div className="flex items-baseline justify-between gap-3">
        <p className="t-label text-muted">
          {joined} of {safeCapacity} places
        </p>
        {full ? (
          <p className="t-label text-danger">Full</p>
        ) : left <= 10 ? (
          <p className="t-label text-brand-ink">{left} left</p>
        ) : null}
      </div>
    </div>
  );
}
