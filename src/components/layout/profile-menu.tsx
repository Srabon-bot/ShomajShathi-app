"use client";

import { CalendarCheck, CalendarPlus, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

const registerClass =
  "hidden min-h-9 items-center bg-brand px-3 text-xs font-bold text-brand-foreground hover:bg-brand-hover sm:inline-flex";
const loginClass =
  "inline-flex min-h-9 items-center border border-rule px-3 text-xs font-bold hover:bg-foreground hover:text-background";

function initials(name: string, email: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return email.slice(0, 2).toUpperCase();
  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function ProfileMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("Signed out.");
    router.replace("/");
    router.refresh();
  }

  if (isPending || !user) {
    return (
      <>
        <Link className={registerClass} href="/register">
          Register
        </Link>
        <Link className={loginClass} href="/login">
          Log in
        </Link>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open account menu"
          title={user.name || "Community member"}
          className="inline-flex size-10 items-center justify-center rounded-full border border-rule-soft hover:bg-surface"
        >
          <Avatar>
            {user.image ? <AvatarImage src={user.image} alt="" /> : null}
            <AvatarFallback>{initials(user.name ?? "", user.email ?? "")}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="px-3 py-2">
          <p className="max-w-52 truncate text-sm font-bold">{user.name || "Community member"}</p>
          <p className="t-micro max-w-52 truncate text-muted">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/events/new">
            <CalendarPlus aria-hidden="true" className="size-4" />
            Create event
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/events/joined">
            <CalendarCheck aria-hidden="true" className="size-4" />
            Joined events
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/events/manage">
            <CalendarCheck aria-hidden="true" className="size-4" />
            My events
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserRound aria-hidden="true" className="size-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => void handleSignOut()}>
          <LogOut aria-hidden="true" className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
