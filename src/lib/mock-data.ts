import type { EventItem, Organizer } from "./events";
import { isPast } from "./events";

const nusrat: Organizer = {
  id: "usr_nusrat",
  name: "Nusrat Jahan",
  email: "nusrat@example.com",
  image: null,
};

const arif: Organizer = {
  id: "usr_arif",
  name: "Arif Hossain",
  email: "arif@example.com",
  image: null,
};

const farhana: Organizer = {
  id: "usr_farhana",
  name: "Farhana Akter",
  email: "farhana@example.com",
  image: null,
};

/**
 * UI-only fixtures. Every shape here matches EventItem, so swapping these for
 * API responses later changes the import and nothing else.
 */
export const events: EventItem[] = [
  {
    id: "winter-clothes-mirpur",
    title: "Winter Clothes Drive — Mirpur 10",
    type: "Donation",
    date: "2026-11-07T03:30:00.000Z", // 9:30 AM Dhaka
    location: "Mirpur 10 Roundabout, Dhaka",
    image: "/images/events/winter-clothes-mirpur.jpg",
    capacity: 60,
    attendeeCount: 41,
    organizer: nusrat,
    joined: true,
    createdAt: "2026-10-12T06:00:00.000Z",
    description:
      "We are collecting jackets, blankets and warm clothes for families in the Mirpur basti behind the roundabout. Everything is sorted on site and handed out the same afternoon, so nothing sits in storage over the winter.",
    bring: [
      "One clean jacket or blanket you no longer use",
      "Two large sacks if you have them",
      "A tiffin — the sorting takes the whole morning",
    ],
  },
  {
    id: "buriganga-bank-cleanup",
    title: "Buriganga Bank Cleanup",
    type: "Cleanup",
    date: "2026-11-14T02:00:00.000Z", // 8:00 AM
    location: "Buriganga ghat, Old Dhaka",
    image: "/images/events/buriganga-cleanup.jpg",
    capacity: 80,
    attendeeCount: 61,
    organizer: arif,
    joined: false,
    createdAt: "2026-10-14T05:20:00.000Z",
    description:
      "Four hours along the ghat, working in pairs with gloves and sacks. The Dhaka South City Corporation truck meets us at noon, so what we collect leaves the bank the same day. Expect mud, sharp edges and a very good lunch.",
    bring: [
      "Closed shoes you do not mind ruining",
      "A cap and a full water bottle",
      "Work gloves if you own a pair — we have 30 spare",
    ],
  },
  {
    id: "hatirjheel-plantation",
    title: "Plant 200 Saplings — Hatirjheel",
    type: "Plantation",
    date: "2026-11-21T03:00:00.000Z", // 9:00 AM
    location: "Hatirjheel east bank, Dhaka",
    image: "/images/events/hatirjheel-plantation.jpg",
    capacity: 100,
    attendeeCount: 74,
    organizer: nusrat,
    joined: false,
    createdAt: "2026-10-18T04:45:00.000Z",
    description:
      "Two hundred saplings, one Saturday. We dig in teams of three — one hole, one sapling, one water carrier — and the last hour is for labelling so the next volunteer group can find them again.",
    bring: [
      "A hand trowel if you have one",
      "Old clothes and a change of shoes",
      "Sun protection",
    ],
  },
  {
    id: "mohammadpur-blankets",
    title: "Blankets for Mohammadpur Basti",
    type: "Donation",
    date: "2026-11-28T04:00:00.000Z", // 10:00 AM
    location: "Mohammadpur, Dhaka",
    image: "/images/events/mohammadpur-blankets.jpg",
    capacity: 50,
    attendeeCount: 47,
    organizer: farhana,
    joined: false,
    createdAt: "2026-10-20T07:10:00.000Z",
    description:
      "A short, quiet distribution: 120 blankets into 120 homes, one list, no photographs of faces. We walk the lanes in groups of four and finish before the afternoon prayer.",
    bring: [
      "One blanket or 300 taka towards the second batch",
      "A pen — you will be ticking names",
      "Patience for narrow lanes",
    ],
  },
  {
    id: "dhanmondi-plastic-sweep",
    title: "Dhanmondi Lake Plastic Sweep",
    type: "Cleanup",
    date: "2026-12-05T01:30:00.000Z", // 7:30 AM
    location: "Dhanmondi Lake, Road 27",
    image: "/images/events/dhanmondi-sweep.jpg",
    capacity: 40,
    attendeeCount: 40,
    organizer: arif,
    joined: false,
    createdAt: "2026-10-21T03:00:00.000Z",
    description:
      "The full loop, clockwise from Road 27, with a stop at the bamboo bridge for the worst of it. This one fills fast — it is the shortest cleanup we run and the easiest to bring a friend to.",
    bring: [
      "Gloves",
      "A reusable bag for your own water",
      "Closed shoes",
    ],
  },
  {
    id: "reading-circle-uttara",
    title: "Reading Circle for Street Children",
    type: "Education",
    date: "2026-12-12T10:00:00.000Z", // 4:00 PM
    location: "Uttara Sector 7, Dhaka",
    image: "/images/events/reading-circle.jpg",
    capacity: 25,
    attendeeCount: 12,
    organizer: farhana,
    joined: true,
    createdAt: "2026-10-22T09:00:00.000Z",
    description:
      "An hour of reading aloud, then an hour of drawing. We bring the books and the mats; you bring a voice. No teaching experience needed — most volunteers read the same three stories every week, and the children know them by heart.",
    bring: [
      "A picture book you loved as a child",
      "Crayons if you have spares",
      "Nothing else — this one is indoors",
    ],
  },
  {
    id: "gulshan-lake-sweep",
    title: "Gulshan Lake Saturday Sweep",
    type: "Cleanup",
    date: "2026-12-19T02:30:00.000Z", // 8:30 AM
    location: "Gulshan Lake, Road 11",
    image: "/images/events/dhanmondi-sweep.jpg",
    capacity: 45,
    attendeeCount: 9,
    organizer: arif,
    joined: false,
    createdAt: "2026-10-25T05:30:00.000Z",
    description:
      "A new route this month: the northern edge, where the water hyacinth collects. Two hours, one truck, and a count of what we pull out so the numbers go somewhere.",
    bring: ["Gloves", "A cap", "Water"],
  },
  {
    id: "buriganga-tributary-sweep",
    title: "Buriganga Tributary Sweep",
    type: "Cleanup",
    date: "2026-10-17T02:00:00.000Z", // past
    location: "Postogola, Dhaka",
    image: "/images/events/buriganga-cleanup.jpg",
    capacity: 50,
    attendeeCount: 50,
    organizer: nusrat,
    joined: true,
    createdAt: "2026-09-28T06:00:00.000Z",
    description:
      "The October sweep. Fifty volunteers, nine truckloads, and a section of bank that is still clear two weeks later.",
    bring: ["Gloves", "Closed shoes"],
  },
];

export function getEvent(id: string) {
  return events.find((event) => event.id === id);
}

/** What the home page and the list page treat as joinable. */
export const upcomingEvents = events.filter((event) => !isPast(event));

/** The signed-in volunteer this UI is designed around. */
export const demoUser = {
  id: "usr_nusrat",
  name: "Nusrat Jahan",
  email: "nusrat@example.com",
  image: null as string | null,
  memberSince: "March 2025",
  eventsJoined: 2,
  hoursVolunteered: 14,
};

export const gallery = [
  {
    src: "/images/events/buriganga-cleanup.jpg",
    caption: "Buriganga ghat · November 2025",
    alt: "Volunteers clearing a bank of the Buriganga with sacks and rakes",
  },
  {
    src: "/images/events/hatirjheel-plantation.jpg",
    caption: "Hatirjheel · July 2025",
    alt: "A volunteer planting a sapling beside the Hatirjheel waterline",
  },
  {
    src: "/images/events/winter-clothes-mirpur.jpg",
    caption: "Mirpur 10 · January 2025",
    alt: "Winter clothes sorted into piles before distribution",
  },
  {
    src: "/images/events/mohammadpur-blankets.jpg",
    caption: "Mohammadpur · December 2024",
    alt: "Blankets being handed out in a narrow lane",
  },
  {
    src: "/images/events/reading-circle.jpg",
    caption: "Uttara · August 2025",
    alt: "Children sitting in a reading circle on mats",
  },
] as const;
