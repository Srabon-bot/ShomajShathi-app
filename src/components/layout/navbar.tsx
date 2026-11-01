import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-background/95">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link className="font-display text-[22px] lowercase tracking-tight" href="/">
            <span className="text-foreground">shomaj</span> <span className="text-brand">shathi</span>
          </Link>
          <Link className="hidden text-sm text-muted hover:text-foreground md:block" href="/events">
            Upcoming events
          </Link>
        </div>
        <Link className="inline-flex min-h-9 items-center border border-rule px-3 text-xs font-bold hover:bg-foreground hover:text-background" href="/login">
          Log in
        </Link>
      </div>
    </header>
  );
}
