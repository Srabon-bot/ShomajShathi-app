"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "./wordmark";
import { ProfileMenu, type MenuUser } from "./profile-menu";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * A strip divided into cells, not a row of floating links. The last cell is
 * the register action when signed out, the account trigger when signed in.
 */
export function Navbar({ user }: { user?: MenuUser | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const onAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  const signedIn = Boolean(user) && !onAuthPage;

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-background">
      <div className="flex h-18 items-stretch">
        <div className="flex items-center pl-5 pr-2 md:px-6">
          <Wordmark />
        </div>

        <nav aria-label="Main" className="ml-auto hidden items-stretch md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/events"
                ? pathname.startsWith("/events")
                : false;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "t-label flex h-full items-center border-l border-rule px-6 transition-colors duration-150",
                  active
                    ? "bg-foreground text-background"
                    : "text-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="flex items-center border-l border-rule px-3">
            <ThemeToggle />
          </div>

          {signedIn && user ? (
            <div className="flex items-center border-l border-rule px-4">
              <ProfileMenu user={user} />
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="t-label flex h-full items-center border-l border-rule px-6 text-muted transition-colors hover:text-foreground"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="t-label flex h-full items-center border-l border-rule bg-brand px-6 text-brand-foreground transition-colors hover:bg-brand-hover"
              >
                Register
              </Link>
            </>
          )}
        </nav>

        <div className="ml-auto flex items-stretch md:hidden">
          <div className="flex items-center border-l border-rule px-3">
            <ThemeToggle />
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid w-14 place-items-center border-l border-rule text-foreground"
          >
            {open ? (
              <X aria-hidden className="size-5" strokeWidth={1.75} />
            ) : (
              <Menu aria-hidden className="size-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-b border-rule bg-background md:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="t-label border-t border-rule px-5 py-4 text-foreground"
              >
                {item.label}
              </Link>
            ))}

            {signedIn ? (
              <>
                <Link
                  href="/events/manage"
                  onClick={() => setOpen(false)}
                  className="t-label border-t border-rule px-5 py-4 text-foreground"
                >
                  Your events
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="t-label border-t border-rule px-5 py-4 text-foreground"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="t-label border-t border-rule px-5 py-4 text-foreground"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="t-label border-t border-rule bg-brand px-5 py-4 text-brand-foreground"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
