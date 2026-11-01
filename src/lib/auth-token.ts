"use client";

import { authClient } from "@/lib/auth-client";

/**
 * Returns a short-lived BetterAuth JWT for the current browser session.
 * Components pass it to the Express API as `Authorization: Bearer <token>`.
 */
export async function getTokenFromClient(): Promise<string | null> {
  const { data, error } = await authClient.token();
  if (error) return null;
  return data?.token ?? null;
}
