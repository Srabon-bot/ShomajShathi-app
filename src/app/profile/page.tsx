"use client";

import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ProfileForm } from "@/components/profile/profile-form";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState, Skeleton } from "@/components/ui/states";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";

function initials(name: string, email: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return email.slice(0, 2).toUpperCase();
  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const memberSince = user
    ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(user.createdAt))
    : null;

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Your account"
          title="Profile."
          description="Keep the name and photo other organisers see when you publish or join an event."
          meta={
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="t-label">Account details</span>
              <span className="t-label">
                {isPending ? "Loading" : memberSince ? `Member since ${memberSince}` : "Sign in required"}
              </span>
            </div>
          }
        />
        <div className="shell section max-w-4xl">
          {isPending ? (
            <div className="space-y-4" aria-busy="true" aria-label="Loading profile">
              <Skeleton className="h-10 w-56" />
              <Skeleton className="h-64" />
            </div>
          ) : !user ? (
            <EmptyState
              title="Sign in to view your profile"
              description="Your profile holds the name and photo other organisers see."
              action={
                <Link
                  className="inline-flex min-h-11 items-center rounded-md bg-foreground px-5 text-sm font-bold text-background"
                  href="/login?next=/profile"
                >
                  Log in
                </Link>
              }
            />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
              <aside className="h-fit border border-rule bg-surface p-5">
                <Avatar className="size-20">
                  {user.image ? <AvatarImage src={user.image} alt="" /> : null}
                  <AvatarFallback className="text-lg">{initials(user.name ?? "", user.email ?? "")}</AvatarFallback>
                </Avatar>
                <p className="t-h4 mt-4 break-words">{user.name || "Community member"}</p>
                <p className="t-small break-words text-muted">{user.email}</p>
                <dl className="mt-5 space-y-3 border-t border-rule pt-4">
                  <div>
                    <dt className="t-label text-muted">Member since</dt>
                    <dd className="t-small mt-1">{memberSince}</dd>
                  </div>
                  <div>
                    <dt className="t-label text-muted">Quick links</dt>
                    <dd className="t-small mt-1 flex flex-col gap-1">
                      <Link className="hover:underline" href="/events/joined">
                        Joined events
                      </Link>
                      <Link className="hover:underline" href="/events/manage">
                        My events
                      </Link>
                      <Link className="hover:underline" href="/events/new">
                        Create event
                      </Link>
                    </dd>
                  </div>
                </dl>
              </aside>

              <section className="border border-rule bg-surface p-5 sm:p-6">
                <h2 className="t-h3">Account details</h2>
                <p className="t-small mt-2 text-muted">Changes are saved to your BetterAuth account immediately.</p>
                <div className="mt-7">
                  <ProfileForm user={{ name: user.name ?? "", email: user.email ?? "", image: user.image }} />
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
