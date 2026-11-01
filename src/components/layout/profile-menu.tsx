"use client";

import * as React from "react";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  CalendarCheck,
  LogOut,
  PenLine,
  Settings,
  SlidersHorizontal,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

export interface MenuUser {
  name: string;
  email: string;
  image?: string | null;
}

const items = [
  { href: "/events/new", label: "Create event", icon: PenLine },
  { href: "/events/manage", label: "Manage events", icon: SlidersHorizontal },
  { href: "/events/joined", label: "Joined events", icon: CalendarCheck },
  { href: "/profile", label: "Profile", icon: Settings },
] as const;

/**
 * The shadcn `dropdown-menu` primitive (Radix). The display name appears on
 * hover; the menu opens on click. Radix supplies positioning and arrow keys;
 * the panel has no radius and no shadow.
 */
export function ProfileMenu({ user }: { user: MenuUser }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="Account menu"
          className="group relative inline-flex items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Avatar name={user.name} src={user.image} size="md" />

          {/* Hover label — hidden on touch widths, where the menu shows it. */}
          <span
            className="pointer-events-none absolute right-0 top-full z-10 mt-2 hidden whitespace-nowrap bg-foreground px-2 py-1 text-background opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 md:block t-label"
            aria-hidden
          >
            {user.name}
          </span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 w-60 border border-rule bg-surface p-0"
        >
          <div className="border-b border-rule px-4 py-3 md:hidden">
            <p className="t-label truncate text-foreground">{user.name}</p>
            <p className="t-micro mt-1 truncate text-muted">{user.email}</p>
          </div>

          {items.map((item) => (
            <DropdownMenu.Item key={item.href} asChild>
              <Link
                href={item.href}
                className="t-label flex cursor-pointer items-center gap-2.5 px-4 py-3 text-foreground outline-none transition-colors hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background"
              >
                <item.icon aria-hidden className="size-4" strokeWidth={1.75} />
                {item.label}
              </Link>
            </DropdownMenu.Item>
          ))}

          <DropdownMenu.Separator className="h-px bg-rule" />

          <DropdownMenu.Item asChild>
            <button
              type="button"
              className="t-label flex w-full cursor-pointer items-center gap-2.5 px-4 py-3 text-left text-danger outline-none transition-colors hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background"
            >
              <LogOut aria-hidden className="size-4" strokeWidth={1.75} />
              Sign out
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
