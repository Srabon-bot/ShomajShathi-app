"use client";

import Link from "next/link";

import { AuthForm } from "@/components/auth/auth-form";
import { SocialButtons } from "@/components/auth/social-buttons";

export default function LoginPage() {
  return (
    <section className="border border-rule bg-surface p-6 sm:p-8">
      <p className="t-label text-brand-ink">Welcome back</p>
      <h1 className="t-h2 mt-3">Log in.</h1>
      <p className="t-small mt-3 text-muted">
        Pick up where you left off. Your events and joined work are waiting.
      </p>
      <div className="mt-8">
        <SocialButtons />
      </div>
      <div className="my-7 flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-rule-soft" />
        <span className="t-label text-muted">or use email</span>
        <span className="h-px flex-1 bg-rule-soft" />
      </div>
      <AuthForm mode="login" />
      <p className="t-small mt-7 border-t border-rule pt-5 text-muted">
        New here?{" "}
        <Link className="font-bold text-brand-ink underline underline-offset-4" href="/register">
          Create an account
        </Link>
      </p>
    </section>
  );
}
