import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Two words, two colours, always lowercase, always one line. The only place
 * the brand is spelled out.
 */
export function Wordmark({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-block text-[20px] font-bold lowercase tracking-[-0.03em] text-foreground",
        className,
      )}
    >
      {site.wordmark.first}
      <span className="text-brand">{site.wordmark.second}</span>
    </Link>
  );
}
