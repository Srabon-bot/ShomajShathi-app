import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="border-b border-rule">
        <div className="shell grid gap-12 py-12 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-start lg:gap-20 lg:py-16">
          <aside className="hidden border border-rule bg-hero p-8 text-hero-foreground lg:block lg:p-10">
            <p className="t-label flex items-center gap-2 text-brand">
              <span aria-hidden="true" className="h-px w-6 bg-brand" />
              Community access
            </p>
            <h1 className="t-display mt-6">
              Show up.
              <br />
              Do the work.
            </h1>
            <p className="t-lead mt-6 max-w-md text-hero-muted">
              An account lets you publish service events, join the ones that matter to you, and keep a record of every
              cleanup, plantation and donation drive you took part in.
            </p>
            <dl className="mt-10 grid gap-4 border-t border-hero-foreground/20 pt-6">
              <div className="grid grid-cols-[2rem_1fr] gap-3">
                <dt className="t-label text-brand">01</dt>
                <dd className="t-small text-hero-muted">Create an event with a date, place and capacity.</dd>
              </div>
              <div className="grid grid-cols-[2rem_1fr] gap-3">
                <dt className="t-label text-brand">02</dt>
                <dd className="t-small text-hero-muted">Join work near you and see it in your joined list.</dd>
              </div>
              <div className="grid grid-cols-[2rem_1fr] gap-3">
                <dt className="t-label text-brand">03</dt>
                <dd className="t-small text-hero-muted">Keep your profile and photo up to date.</dd>
              </div>
            </dl>
          </aside>
          <div className="w-full">
            <div className="mb-8 lg:hidden">
              <p className="t-label flex items-center gap-2 text-brand-ink">
                <span aria-hidden="true" className="h-px w-6 bg-brand" />
                Community access
              </p>
              <h2 className="t-display mt-3">Show up. Do the work.</h2>
            </div>
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
