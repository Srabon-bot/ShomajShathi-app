"use client";

import Link from "next/link";

import { AuthForm } from "@/components/auth/auth-form";
import { SocialButtons } from "@/components/auth/social-buttons";

export default function RegisterPage() {
  return (
    <section className="border border-rule bg-surface p-6 sm:p-8">
      <p className="t-label text-brand-ink">Join Shomaj Shathi</p>
      <h1 className="t-h2 mt-3">Create account.</h1>
      <p className="t-small mt-3 text-muted">
        One account for the events you organise and the work you show up for.
      </p>
      <div className="mt-8">
        <SocialButtons />
      </div>
      <div className="my-7 flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-rule-soft" />
        <span className="t-label text-muted">or use email</span>
        <span className="h-px flex-1 bg-rule-soft" />
      </div>
      <AuthForm mode="register" />
      <p className="t-small mt-7 border-t border-rule pt-5 text-muted">
        Already have an account?{" "}
        <Link className="font-bold text-brand-ink underline underline-offset-4" href="/login">
          Log in
        </Link>
      </p>
    </section>
  );
}
