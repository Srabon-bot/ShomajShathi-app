"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth/auth-shell";
import { SocialButton } from "@/components/auth/social-button";
import { Button } from "@/components/ui/button";
import { Checkbox, Field, Input } from "@/components/ui/field";
import { InlineAlert } from "@/components/ui/inline-alert";
import { loginSchema, type LoginValues } from "@/lib/validation";

export function LoginForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: true },
  });

  const onSubmit = async (values: LoginValues) => {
    setFormError(null);
    await new Promise((resolve) => window.setTimeout(resolve, 700));

    // UI-only build: any well-formed pair signs you in as the demo volunteer.
    if (values.password.length < 6) {
      setFormError("That email and password do not match an account.");
      return;
    }

    toast.success("Signed in", { description: "Welcome back, Nusrat." });
    router.push("/events");
  };

  return (
    <AuthShell>
      <h1 className="t-display text-foreground">Log in</h1>
      <p className="t-small mt-4 text-muted">
        Your joined events and your hours are where you left them.
      </p>
      <div className="mt-6 border-b border-rule" />

      <div className="mt-8">
        <SocialButton />
      </div>

      <div className="my-6 flex items-center gap-4">
        <span aria-hidden className="h-px flex-1 bg-rule-soft" />
        <span className="t-label text-subtle">Or</span>
        <span aria-hidden className="h-px flex-1 bg-rule-soft" />
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        {formError ? <InlineAlert tone="danger">{formError}</InlineAlert> : null}

        <Field label="Email" htmlFor="email" required error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            invalid={!!errors.email}
            {...register("email")}
          />
        </Field>

        <Field
          label="Password"
          htmlFor="password"
          required
          error={errors.password?.message}
        >
          <div className="flex items-center gap-3">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              invalid={!!errors.password}
              className="flex-1"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="t-label shrink-0 rounded-full border border-rule px-3 py-1 text-foreground hover:bg-foreground hover:text-background"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </Field>

        <Checkbox label="Keep me signed in" {...register("remember")} />

        <Button type="submit" block size="lg" loading={isSubmitting}>
          Log in
        </Button>
      </form>

      <p className="t-small mt-6 text-muted">
        New here?{" "}
        <Link
          href="/register"
          className="text-brand-ink underline underline-offset-4 hover:text-foreground"
        >
          Create an account
        </Link>
        .
      </p>
    </AuthShell>
  );
}
