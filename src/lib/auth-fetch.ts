"use client";

import { apiFetch, ApiError } from "@/lib/api";
import { getTokenFromClient } from "@/lib/auth-token";

/**
 * Authenticated wrapper around `apiFetch`. Fetches a short-lived BetterAuth
 * JWT and sends it to the Express API as a Bearer token.
 */
export async function authFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = await getTokenFromClient();
  if (!token) {
    throw new ApiError("Your session has expired. Please log in again.", 401);
  }

  const headers: Record<string, string> = {};
  new Headers(init?.headers).forEach((value, key) => {
    headers[key] = value;
  });
  headers.Authorization = `Bearer ${token}`;

  return apiFetch<T>(path, { ...init, headers });
}
