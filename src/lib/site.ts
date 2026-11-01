export const site = {
  name: "Shomaj Shathi",
  wordmark: { first: "shomaj", second: "shathi" },
  tagline: "Neighbourhood service, organised.",
  description:
    "Plan a cleanup, plant two hundred saplings, or collect winter clothes — then find the people who will show up with you.",
  location: "Dhaka, Bangladesh",
  email: "hello@shomajshathi.org",
} as const;

export const nav = [
  { label: "Upcoming Events", href: "/events" },
  { label: "Gallery", href: "/#gallery" },
  { label: "About", href: "/#about" },
] as const;

/** Everything the footer promises, in one place. */
export const footer = {
  explore: [
    { label: "Upcoming events", href: "/events" },
    { label: "Gallery", href: "/#gallery" },
    { label: "How it works", href: "/#about" },
  ],
  community: [
    { label: "Create event", href: "/events/new" },
    { label: "Joined events", href: "/events/joined" },
    { label: "Your events", href: "/events/manage" },
  ],
  contact: [
    { label: "hello@shomajshathi.org", href: "mailto:hello@shomajshathi.org" },
    { label: "Dhaka, Bangladesh", href: null },
  ],
} as const;
