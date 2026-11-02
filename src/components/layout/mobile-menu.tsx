"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

const links = [
  { href: "/events", label: "Upcoming events" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#about", label: "About" },
];

const memberLinks = [
  { href: "/events/new", label: "Create event" },
  { href: "/events/joined", label: "Joined events" },
  { href: "/events/manage", label: "My events" },
  { href: "/profile", label: "Profile" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  async function handleSignOut() {
    setOpen(false);
    await authClient.signOut();
    toast.success("Signed out.");
    router.replace("/");
    router.refresh();
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex size-10 items-center justify-center rounded-full border border-rule-soft hover:bg-surface"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
      {open && (
        <div id="mobile-menu" className="absolute inset-x-0 top-full border-b border-rule bg-surface">
          <nav className="shell py-2" aria-label="Mobile">
            {[...links, ...(user ? memberLinks : [])].map((link) => (
              <Link
                className="block border-t border-rule py-4 text-sm text-muted first:border-t-0 hover:text-foreground"
                href={link.href}
                key={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 border-t border-rule py-4">
              {user ? (
                <button
                  className="inline-flex min-h-9 items-center border border-rule px-3 text-xs font-bold hover:bg-foreground hover:text-background"
                  type="button"
                  onClick={() => void handleSignOut()}
                >
                  Sign out
                </button>
              ) : (
                <>
                  <Link
                    className="inline-flex min-h-9 items-center border border-rule px-3 text-xs font-bold hover:bg-foreground hover:text-background"
                    href="/login"
                    onClick={() => setOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    className="inline-flex min-h-9 items-center bg-brand px-3 text-xs font-bold text-brand-foreground hover:bg-brand-hover"
                    href="/register"
                    onClick={() => setOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
