import Link from "next/link";
import { Wordmark } from "./wordmark";
import { footer, site } from "@/lib/site";

function XMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1.3 2H7.8l4.4 5.9L18.9 2Zm-1.1 18h1.7L7.1 3.8H5.3L17.8 20Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Wordmark />
          <p className="t-small mt-3 max-w-xs text-muted">{site.tagline}</p>
          <p className="t-micro mt-4 text-subtle">{site.location}</p>
        </div>

        <nav aria-label="Explore">
          <h2 className="t-label text-muted">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {footer.explore.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="t-small text-foreground hover:underline hover:underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Community">
          <h2 className="t-label text-muted">Community</h2>
          <ul className="mt-4 space-y-2.5">
            {footer.community.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="t-small text-foreground hover:underline hover:underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="t-label text-muted">Contact</h2>
          <ul className="mt-4 space-y-2.5">
            {footer.contact.map((item) => (
              <li key={item.label} className="t-small text-foreground">
                {item.href ? (
                  <a
                    href={item.href}
                    className="hover:underline hover:underline-offset-4"
                  >
                    {item.label}
                  </a>
                ) : (
                  item.label
                )}
              </li>
            ))}
            <li>
              <a
                href="https://x.com"
                aria-label="Shomaj Shathi on X"
                className="mt-1 inline-flex items-center gap-1.5 text-foreground hover:underline hover:underline-offset-4"
              >
                <XMark className="size-3.5" />
                <span className="t-small">X ↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell overflow-hidden pb-6">
        <p className="t-mega whitespace-nowrap text-[clamp(2rem,10vw,8.5rem)] leading-none">
          <span className="text-foreground">shomaj</span>
          <span className="text-brand">shathi</span>
        </p>
      </div>

      <div className="border-t border-rule">
        <div className="shell flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-label text-muted">
            Privacy &amp; policy · Terms · Contact us
          </p>
          <p className="t-label text-muted">Shomaj Shathi © 2026</p>
        </div>
      </div>
    </footer>
  );
}
