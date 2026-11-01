/**
 * Reads the `?next=` redirect target and falls back to `fallback` when the
 * value is missing, absolute, or protocol-relative. Reads from `window` so
 * pages do not need a Suspense boundary around `useSearchParams`.
 */
export function getNextPath(fallback = "/events"): string {
  if (typeof window === "undefined") return fallback;
  const next = new URLSearchParams(window.location.search).get("next");
  if (!next || !next.startsWith("/") || next.startsWith("//")) return fallback;
  return next;
}

export function getAbsoluteNextPath(fallback = "/events"): string {
  if (typeof window === "undefined") return fallback;
  return new URL(getNextPath(fallback), window.location.origin).toString();
}
