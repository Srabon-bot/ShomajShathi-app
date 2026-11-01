"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { demoUser } from "@/lib/mock-data";
import { profileSchema, type ProfileValues } from "@/lib/validation";

function Row({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 border-b border-rule-soft py-4 focus-within:border-brand sm:grid-cols-[10rem_1fr] sm:gap-6">
      <label htmlFor={htmlFor} className="t-label pt-2 text-muted">
        {label}
      </label>
      <div>
        {children}
        {error ? (
          <p className="t-micro mt-1 text-danger">{error}</p>
        ) : hint ? (
          <p className="t-micro mt-1 text-subtle">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}

export function ProfileDetails() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: demoUser.name,
      image: demoUser.image ?? "",
      password: "",
    },
  });

  const onSubmit = async (values: ProfileValues) => {
    await new Promise((resolve) => window.setTimeout(resolve, 600));
    toast.success("Profile updated", {
      description: values.password
        ? `Your name now reads ${values.name}, and your password has changed.`
        : `Your name now reads ${values.name}.`,
    });
    router.refresh();
  };

  return (
    <>
      <h1 className="t-display text-foreground">Profile</h1>
      <div className="mt-6 border-b border-rule" />

      <form className="mt-6 max-w-2xl" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Row label="Full name" htmlFor="name" error={errors.name?.message}>
          <Input id="name" invalid={!!errors.name} {...register("name")} />
        </Row>

        <div className="grid gap-2 border-b border-rule-soft py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
          <label htmlFor="email" className="t-label pt-2 text-muted">
            Email
          </label>
          <div>
            <Input
              id="email"
              value={demoUser.email}
              disabled
              readOnly
              className="text-muted"
            />
          </div>
        </div>

        <Row
          label="Password"
          htmlFor="password"
          hint="Leave blank to keep your current password."
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
        </Row>

        <Row
          label="Photo URL"
          htmlFor="image"
          hint="Leave blank to use your initials."
          error={errors.image?.message}
        >
          <Input
            id="image"
            placeholder="https://…"
            invalid={!!errors.image}
            {...register("image")}
          />
        </Row>

        <p className="t-micro mt-4 text-muted">
          Your email is used to sign in and cannot be changed here.
        </p>

        <div className="mt-6">
          <Button type="submit" loading={isSubmitting}>
            Save changes
          </Button>
        </div>
      </form>
    </>
  );
}
