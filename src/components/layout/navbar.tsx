import Link from "next/link";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { ProfileMenu } from "@/components/layout/profile-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-background/95">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link className="font-display text-[22px] lowercase tracking-tight" href="/">
            <span className="text-foreground">shomaj</span> <span className="text-brand">shathi</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
            <Link className="text-sm text-muted hover:text-foreground" href="/events">
              Upcoming events
            </Link>
            <Link className="text-sm text-muted hover:text-foreground" href="/#gallery">
              Gallery
            </Link>
            <Link className="text-sm text-muted hover:text-foreground" href="/#about">
              About
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ProfileMenu />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
