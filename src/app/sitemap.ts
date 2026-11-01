import type { MetadataRoute } from "next";
import { upcomingEvents } from "@/lib/mock-data";

/**
 * Absolute URLs need a base. Set NEXT_PUBLIC_SITE_URL on the deployment; the
 * localhost fallback only matters in development.
 */
const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/events", "/events/new", "/events/joined", "/login", "/register"].map(
    (path) => ({
      url: `${base}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const eventPages = upcomingEvents.map((event) => ({
    url: `${base}/events/${event.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...pages, ...eventPages];
}
