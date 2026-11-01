"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  LogOut,
  PenLine,
  Settings,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/events/manage", label: "Your events", icon: SlidersHorizontal },
  { href: "/events/joined", label: "Joined events", icon: CalendarCheck },
  { href: "/events/new", label: "Create event", icon: PenLine },
  { href: "/profile", label: "Profile", icon: Settings },
] as const;

/**
 * The signed-in frame: sand sidebar, ruled content column. Below lg the
 * sidebar becomes a horizontal pill row above the page body.
 */
export function DashboardShell({
  user,
  children,
}: {
  user: { name: string; email: string; image?: string | null };
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="shell">
      <div className="lg:grid lg:grid-cols-[17.5rem_1fr]">
        <aside className="border-b border-rule py-6 lg:sticky lg:top-18 lg:flex lg:h-[calc(100svh-4.5rem)] lg:flex-col lg:border-b-0 lg:border-r lg:bg-sand lg:px-6 lg:py-8">
          <div className="hidden lg:block">
            <p className="t-h3 text-foreground">{user.name}</p>
            <p className="t-label mt-2 break-all text-muted">{user.email}</p>
            <div className="mt-6 border-t border-rule-sand" />
          </div>

          <nav aria-label="Dashboard" className="flex flex-wrap gap-2 lg:mt-6 lg:flex-col">
            {items.map((item) => {
              const active =
                item.href === "/events/manage"
                  ? pathname === "/events/manage" || pathname.endsWith("/edit")
                  : pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "t-label inline-flex items-center gap-2.5 rounded-full border px-4 py-3 transition-colors duration-150",
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-rule text-foreground hover:bg-foreground hover:text-background",
                  )}
                >
                  <item.icon aria-hidden className="size-4" strokeWidth={1.75} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="t-label mt-auto hidden items-center justify-between gap-2 border-t border-rule-sand pt-4 text-left text-foreground transition-colors hover:text-brand-ink lg:flex"
          >
            Log out
            <LogOut aria-hidden className="size-4" strokeWidth={1.75} />
          </button>
        </aside>

        <div className="min-w-0 py-8 lg:py-10 lg:pl-10">{children}</div>
      </div>
    </div>
  );
}
