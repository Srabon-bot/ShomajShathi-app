import { z } from "zod";

const password = z
  .string()
  .min(6, "Use at least 6 characters.")
  .regex(/[a-z]/, "Add one lowercase letter.")
  .regex(/[A-Z]/, "Add one uppercase letter.");

export const loginSchema = z.object({
  email: z.email("Enter an email like name@example.com."),
  password: z.string().min(1, "Enter your password."),
  remember: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Use at least 2 characters.")
      .max(60, "Keep it under 60 characters."),
    email: z.email("Enter an email like name@example.com."),
    image: z
      .string()
      .trim()
      .refine(
        (value) => value === "" || /^https?:\/\/\S+$/i.test(value),
        "Use a full image URL starting with http.",
      )
      .optional(),
    password,
    confirm: z.string(),
    agree: z
      .boolean()
      .refine((value) => value, "Agree to the community guidelines to continue."),
  })
  .refine((values) => values.password === values.confirm, {
    path: ["confirm"],
    message: "Both passwords must match.",
  });

export const eventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(6, "Give the event a title of at least 6 characters.")
    .max(90, "Keep the title under 90 characters."),
  type: z.enum(["Cleanup", "Plantation", "Donation", "Education"]),
  date: z.string().min(1, "Pick a date."),
  time: z.string().min(1, "Pick a start time."),
  location: z
    .string()
    .trim()
    .min(3, "Where should people meet?")
    .max(120, "Keep the location under 120 characters."),
  description: z
    .string()
    .trim()
    .min(20, "Write at least 20 characters — what happens on the day?")
    .max(2000, "Keep the description under 2,000 characters."),
  bring: z.string().max(300, "Keep this list short.").optional(),
  capacity: z
    .number({ error: "Enter a number." })
    .int("Use a whole number.")
    .min(1, "At least one place.")
    .max(1000, "Cap it at 1,000 places."),
  image: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^https?:\/\/\S+$/i.test(value),
      "Use a full image URL starting with http.",
    ),
  free: z
    .boolean()
    .refine((value) => value, "Confirm the event is free and open to anyone."),
});

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Use at least 2 characters.")
    .max(60, "Keep it under 60 characters."),
  image: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^https?:\/\/\S+$/i.test(value),
      "Use a full image URL starting with http.",
    ),
  /** Blank means "leave the current password alone". */
  password: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        (value.length >= 6 && /[a-z]/.test(value) && /[A-Z]/.test(value)),
      "At least 6 characters, with one uppercase and one lowercase letter.",
    ),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type EventValues = z.infer<typeof eventSchema>;
export type ProfileValues = z.infer<typeof profileSchema>;
