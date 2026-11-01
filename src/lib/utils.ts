import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "1,284" — tabular figures read as records, not marketing. */
export function nf(value: number) {
  return new Intl.NumberFormat("en-GB").format(value);
}
