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
import { registerSchema, type RegisterValues } from "@/lib/validation";
import { site } from "@/lib/site";

export function RegisterForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      image: "",
      password: "",
      confirm: "",
      agree: false,
    },
  });

  const onSubmit = async (values: RegisterValues) => {
    setFormError(null);
    await new Promise((resolve) => window.setTimeout(resolve, 800));

    if (values.email === "taken@example.com") {
      setFormError("That email is already registered. Try logging in.");
      return;
    }

    toast.success("Account created", {
      description: "Let's find you something to join.",
    });
    router.push("/events");
  };

  return (
    <AuthShell>
      <h1 className="t-display text-foreground">Register</h1>
      <p className="t-small mt-4 text-muted">
        Join {site.name}. Two minutes now, then a Saturday you will remember.
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

        <Field label="Full name" htmlFor="name" required error={errors.name?.message}>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Nusrat Jahan"
            invalid={!!errors.name}
            {...register("name")}
          />
        </Field>

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
          label="Photo URL"
          htmlFor="image"
          hint="Optional. Leave blank and we will use your initials."
          error={errors.image?.message}
        >
          <Input
            id="image"
            placeholder="https://…"
            invalid={!!errors.image}
            {...register("image")}
          />
        </Field>

        <Field
          label="Password"
          htmlFor="password"
          required
          hint="At least 6 characters, with one uppercase and one lowercase letter."
          error={errors.password?.message}
        >
          <div className="flex items-center gap-3">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
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

        <Field
          label="Confirm password"
          htmlFor="confirm"
          required
          error={errors.confirm?.message}
        >
          <Input
            id="confirm"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            invalid={!!errors.confirm}
            {...register("confirm")}
          />
        </Field>

        <div>
          <Checkbox
            label="I agree to the community guidelines: show up when I say I will, and leave a place cleaner than I found it."
            invalid={!!errors.agree}
            aria-describedby="agree-error"
            {...register("agree")}
          />
          {errors.agree?.message ? (
            <p id="agree-error" className="t-micro mt-1.5 text-danger">
              {errors.agree.message}
            </p>
          ) : null}
        </div>

        <Button type="submit" block size="lg" loading={isSubmitting}>
          Create account
        </Button>
      </form>

      <p className="t-small mt-6 text-muted">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-brand-ink underline underline-offset-4 hover:text-foreground"
        >
          Log in
        </Link>
        .
      </p>
    </AuthShell>
  );
}
