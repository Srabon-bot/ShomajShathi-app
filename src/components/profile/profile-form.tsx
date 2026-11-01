"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";

const profileSchema = z.object({
  name: z.string().trim().min(2, "Use at least 2 characters.").max(60, "Keep your name under 60 characters."),
  image: z
    .string()
    .trim()
    .min(1, "Add a photo URL.")
    .url("Use a valid photo URL.")
    .refine((value) => /^https?:\/\//.test(value), "Use an http or https photo URL."),
});

type ProfileValues = z.infer<typeof profileSchema>;

export function ProfileForm({ user }: { user: { name: string; email: string; image?: string | null } }) {
  const router = useRouter();
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user.name ?? "", image: user.image ?? "" },
  });

  async function onSubmit(values: ProfileValues) {
    const { error } = await authClient.updateUser({
      name: values.name.trim(),
      image: values.image.trim(),
    });
    if (error) {
      toast.error(error.message || "Your profile could not be updated.");
      return;
    }
    form.reset(values);
    toast.success("Profile updated.");
    router.refresh();
  }

  return (
    <form className="space-y-6" noValidate onSubmit={form.handleSubmit(onSubmit)}>
      <Field label="Full name" htmlFor="profile-name" required error={form.formState.errors.name?.message}>
        <Input id="profile-name" autoComplete="name" {...form.register("name")} />
      </Field>
      <Field label="Email" htmlFor="profile-email" hint="Email changes are not available in this assignment.">
        <Input id="profile-email" type="email" value={user.email} disabled readOnly />
      </Field>
      <Field
        label="Photo URL"
        htmlFor="profile-image"
        required
        hint="Paste a public https link to a square photo."
        error={form.formState.errors.image?.message}
      >
        <Input id="profile-image" type="url" autoComplete="photo" {...form.register("image")} />
      </Field>
      <Button type="submit" loading={form.formState.isSubmitting}>
        Save changes
      </Button>
    </form>
  );
}
