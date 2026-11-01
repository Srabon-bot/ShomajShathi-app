import { z } from "zod";

import { eventTypes } from "@/lib/events";

export const eventFormSchema = z.object({
  title: z.string().trim().min(6, "Use at least 6 characters.").max(90, "Keep the title under 90 characters."),
  description: z.string().trim().min(20, "Use at least 20 characters.").max(2000, "Keep the description under 2000 characters."),
  type: z.enum(eventTypes),
  image: z.string().url("Use a valid image URL.").refine((value) => /^https?:\/\//.test(value), "Use an http or https image URL."),
  location: z.string().trim().min(3, "Use at least 3 characters.").max(120, "Keep the location under 120 characters."),
  date: z.string().min(1, "Choose a future date and time.").refine((value) => new Date(value).getTime() > Date.now(), "Date and time must be in the future."),
  capacity: z.number().int().min(1, "Capacity must be at least 1.").max(1000, "Capacity cannot exceed 1000."),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
