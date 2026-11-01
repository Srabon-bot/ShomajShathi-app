"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { getNextPath } from "@/lib/auth-redirect";
import { loginSchema, registerSchema, type LoginValues, type RegisterValues } from "@/lib/auth-validation";

function friendlyError(message: string | undefined, fallback: string) {
  const text = message?.trim();
  if (!text) return fallback;
  if (/invalid origin/i.test(text)) return "This site is not allowed to sign in. Check BETTER_AUTH_URL.";
  if (/password/i.test(text) && /(short|length)/i.test(text)) return "Use at least 6 characters for your password.";
  return text;
}

function FormError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p className="border border-danger bg-danger-soft px-3 py-2 text-sm text-danger" role="alert">
      {message}
    </p>
  );
}

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  return mode === "login" ? <LoginForm /> : <RegisterForm />;
}

function LoginForm() {
  const router = useRouter();
  const [formError, setFormError] = useState("");
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginValues) {
    setFormError("");
    const { error } = await authClient.signIn.email({
      email: values.email.trim().toLowerCase(),
      password: values.password,
    });
    if (error) {
      const message = friendlyError(error.message, "Email or password is incorrect.");
      setFormError(message);
      toast.error(message);
      return;
    }
    toast.success("Signed in.");
    router.replace(getNextPath());
    router.refresh();
  }

  return (
    <form className="space-y-6" noValidate onSubmit={form.handleSubmit(onSubmit)}>
      <FormError message={formError} />
      <Field label="Email" htmlFor="email" required error={form.formState.errors.email?.message}>
        <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" {...form.register("email")} />
      </Field>
      <Field label="Password" htmlFor="password" required error={form.formState.errors.password?.message}>
        <Input id="password" type="password" autoComplete="current-password" placeholder="Your password" {...form.register("password")} />
      </Field>
      <Button block type="submit" loading={form.formState.isSubmitting}>
        Log in
      </Button>
    </form>
  );
}

function RegisterForm() {
  const router = useRouter();
  const [formError, setFormError] = useState("");
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      image: "",
      password: "",
      confirmPassword: "",
      guidelines: false,
    },
  });

  async function onSubmit(values: RegisterValues) {
    setFormError("");
    const { error } = await authClient.signUp.email({
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      password: values.password,
      image: values.image.trim(),
    });
    if (error) {
      const message = friendlyError(error.message, "Your account could not be created.");
      setFormError(message);
      toast.error(message);
      return;
    }
    toast.success("Account created. Welcome to Shomaj Shathi.");
    router.replace(getNextPath());
    router.refresh();
  }

  return (
    <form className="space-y-6" noValidate onSubmit={form.handleSubmit(onSubmit)}>
      <FormError message={formError} />
      <Field label="Full name" htmlFor="name" required error={form.formState.errors.name?.message}>
        <Input id="name" autoComplete="name" placeholder="Ayesha Rahman" {...form.register("name")} />
      </Field>
      <Field label="Email" htmlFor="register-email" required error={form.formState.errors.email?.message}>
        <Input id="register-email" type="email" autoComplete="email" placeholder="you@example.com" {...form.register("email")} />
      </Field>
      <Field
        label="Photo URL"
        htmlFor="image"
        required
        hint="A public https link to a square photo works best."
        error={form.formState.errors.image?.message}
      >
        <Input id="image" type="url" autoComplete="photo" placeholder="https://example.com/photo.jpg" {...form.register("image")} />
      </Field>
      <Field label="Password" htmlFor="register-password" required hint="At least 6 characters." error={form.formState.errors.password?.message}>
        <Input id="register-password" type="password" autoComplete="new-password" placeholder="Choose a password" {...form.register("password")} />
      </Field>
      <Field label="Confirm password" htmlFor="confirm-password" required error={form.formState.errors.confirmPassword?.message}>
        <Input id="confirm-password" type="password" autoComplete="new-password" placeholder="Repeat your password" {...form.register("confirmPassword")} />
      </Field>
      <div className="space-y-2">
        <label className="flex cursor-pointer items-start gap-3 border border-rule-soft p-3" htmlFor="guidelines">
          <input
            id="guidelines"
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 accent-[var(--brand)]"
            aria-invalid={form.formState.errors.guidelines ? true : undefined}
            {...form.register("guidelines")}
          />
          <span className="t-small text-muted">
            I will show up for events I join, respect the people I work with, and leave every place cleaner than I found it.
          </span>
        </label>
        {form.formState.errors.guidelines && (
          <p className="t-small text-danger">{form.formState.errors.guidelines.message}</p>
        )}
      </div>
      <Button block type="submit" loading={form.formState.isSubmitting}>
        Create account
      </Button>
    </form>
  );
}
