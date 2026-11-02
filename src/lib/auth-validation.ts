import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Enter your email address.").max(160, "That email is too long.").email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Use at least 2 characters.").max(60, "Keep your name under 60 characters."),
    email: z.string().trim().min(1, "Enter your email address.").max(160, "That email is too long.").email("Enter a valid email address."),
    image: z.string().trim().min(1, "Add a photo URL.").url("Use a valid photo URL.").refine((value) => /^https?:\/\//.test(value), "Use an http or https photo URL."),
    password: z
      .string()
      .min(6, "Use at least 6 characters.")
      .max(100, "Keep your password under 100 characters.")
      .regex(/[A-Z]/, "Include at least one uppercase letter.")
      .regex(/[a-z]/, "Include at least one lowercase letter."),
    confirmPassword: z.string().min(1, "Repeat your password."),
    guidelines: z.boolean().refine((value) => value, "Please agree to the community guidelines."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
