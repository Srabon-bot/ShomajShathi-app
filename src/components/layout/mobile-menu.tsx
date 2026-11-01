"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/events", label: "Upcoming events" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#about", label: "About" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

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
        <div id="mobile-menu" className="absolute inset-x-0 top-full border-b border-rule bg-background">
          <nav className="shell py-2" aria-label="Mobile">
            {links.map((link) => (
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
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
