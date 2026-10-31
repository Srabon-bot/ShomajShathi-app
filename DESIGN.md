# Uddom — Interface Specification

A visual contract for a community-service events product: what everything looks
like, and the code-level rules that keep it that way. It assumes you have never
seen the product and starts from an empty folder.

- **This document** — the interface: direction, tokens, components, pages, copy
- **`PRD.md`** — the product: routes, data, API, order of work, tests
- **Runtime source of truth** — `src/app/globals.css` (reproduced in Appendix A)

Read this before writing any UI. When in doubt, the token file wins.

---

## Contents

1. [How to use this document](#1-how-to-use-this-document)
2. [Direction](#2-direction)
3. [Colour](#3-colour)
4. [Typography](#4-typography)
5. [Space, shape, depth](#5-space-shape-depth)
6. [Layout](#6-layout)
7. [Components](#7-components)
8. [Page compositions](#8-page-compositions)
9. [States and feedback](#9-states-and-feedback)
10. [Copy](#10-copy)
11. [Accessibility](#11-accessibility)
12. [Rules for agents](#12-rules-for-agents)
13. [Definition of done](#13-definition-of-done)
- [Appendix A — `globals.css`](#appendix-a--globalscss)
- [Appendix B — Imagery](#appendix-b--imagery)
- [Appendix C — Dependencies and config](#appendix-c--dependencies-and-config)

---

## 1. How to use this document

1. **Build the token layer first.** Copy Appendix A into
   `src/app/globals.css` before writing a single component. Nothing below works
   without it.
2. **Build components before pages.** §7 is ordered top to bottom. Each component
   lands in `src/components` and appears on the styleguide page in the same
   commit.
3. **Pages are compositions.** §8 gives the order and spacing for each page type.
   Do not invent a section that is not listed.
4. **Do not hardcode.** Every colour, radius, shadow and font size comes from a
   token or a role class.
5. **Keep the styleguide page in the build.** It is where the system proves
   itself, in both materials, and it is how a reviewer checks that two pages use
   the same heading and the same button. It is not a scratch page to delete.

If a page needs something this document does not define, add the component here
and to the styleguide page **first**, then build the page.

---

## 2. Direction

**Field notes, not brochure.** The interface borrows from printed community
noticeboards and field records: warm paper, forest ink, one ochre signal for the
thing that matters, and monospace for anything that is a fact.

It should feel **human, local, organised, quietly confident**.
It should not feel like a corporate NGO site, a SaaS dashboard, a crypto landing
page, or a purchased template.

Three commitments produce that impression:

1. **Two materials, not two brightness levels.** Light is paper. Dark is deep
   green-black. Both are designed; neither is an inversion of the other.
2. **Metadata is typed as metadata.** Dates, counts, distances and places are
   mono. That is what makes the product read as a record instead of marketing.
3. **One signal colour.** Ochre appears at most once per screen, on the single
   most valuable action.

Photography is local and documentary — real drives, real streets, real
volunteers — never western stock. One shared treatment (`.photo-treat`) makes
mixed sources look art-directed.

**Brand name:** *Uddom* (উদ্যম — initiative) is a working name. It lives in one
place, `src/lib/site.ts`, so the wordmark, metadata and footer follow a change.

---

## 3. Colour

Never write a hex value in a component. Use the Tailwind alias, which resolves
to the token in both themes.

### Surfaces

| Token | Light | Dark | Alias | Use |
| --- | --- | --- | --- | --- |
| `background` | `#FAF7F0` | `#0F1613` | `bg-background` | Page ground |
| `surface` | `#FFFDF8` | `#17211C` | `bg-surface` | Cards, panels, inputs |
| `surface-2` | `#F4EFE4` | `#1E2A23` | `bg-surface-2` | Inset wells, ghost hover, skeletons |
| `surface-inverse` | `#14231B` | `#EDE7DA` | `bg-surface-inverse` | One dark band on a light page |

### Text

| Token | Light | Dark | Alias | Use |
| --- | --- | --- | --- | --- |
| `foreground` | `#16241C` | `#EDE7DA` | `text-foreground` | Headings, primary text |
| `muted` | `#5B6A60` | `#9BA79E` | `text-muted` | Lead paragraphs, secondary |
| `subtle` | `#8A968C` | `#74827A` | `text-subtle` | Captions, annotations, placeholders |

### Lines

| Token | Light | Dark | Alias |
| --- | --- | --- | --- |
| `border` | `#E6DFD0` | `#27342C` | `border-border` |
| `border-strong` | `#D3C8B4` | `#36463C` | `border-border-strong` |

### Brand

| Token | Light | Dark | Alias | Use |
| --- | --- | --- | --- | --- |
| `primary` | `#2C6350` | `#7FBFA0` | `bg-primary` / `text-primary` | Main action, links, active nav |
| `primary-hover` | `#245444` | `#93CCB0` | `hover:bg-primary-hover` | Hover only |
| `primary-foreground` | `#FBF9F3` | `#0B1210` | `text-primary-foreground` | Text on primary |
| `accent` | `#B9752A` | `#E2A45C` | `bg-accent` / `text-accent` | **One** high-value action per screen |
| `accent-hover` | `#A2651F` | `#EFB473` | `hover:bg-accent-hover` | Hover only |
| `accent-foreground` | `#FFFDF8` | `#1A1206` | `text-accent-foreground` | Text on accent |
| `accent-soft` | `#F6E9D6` | `#2A2118` | `bg-accent-soft` | Accent callout background |
| `accent-ink` | `#7A4A12` | `#F0C088` | `text-accent-ink` | Text on `accent-soft` |

### Status

| Token | Light | Dark | Meaning |
| --- | --- | --- | --- |
| `success` | `#2F6A45` | `#7FCFA0` | Confirmed, joined, attended |
| `warning` | `#92610F` | `#E2B45C` | Closing soon, needs attention |
| `destructive` | `#A23B24` | `#E0785F` | Errors, delete |

### Event taxonomy

Each type owns a hue **and** a soft pair. These colours exist only inside chips
and meters.

| Type | Token | Light | Dark | Soft light | Soft dark |
| --- | --- | --- | --- | --- | --- |
| Cleanup | `type-cleanup` | `#1F5E6B` | `#8FD3DE` | `#DCEBED` | `#152A2E` |
| Plantation | `type-plantation` | `#2F5D2A` | `#A8D69A` | `#E4EEDE` | `#1A2A18` |
| Donation | `type-donation` | `#8A4A1C` | `#E9B081` | `#F7E6D6` | `#2B1D14` |
| Education | `type-education` | `#43407A` | `#B3B0E8` | `#E6E5F3` | `#1F1E33` |

### Colour rules

1. **One primary button per view.** Two is a bug.
2. **Ochre is earned.** `accent` appears once per screen, normally on *Create
   event*. Never a full-bleed section background.
3. **Never ochre text on ochre.** Use `accent-ink` on `accent-soft`.
4. **Taxonomy hues stay in chips.** No coloured card borders, tinted sections or
   coloured headings.
5. **No gradients.** No mesh, no glow, no coloured shadows.
6. **Check both themes before calling it done.** If dark mode breaks, a literal
   colour slipped in.

Contrast in use: ink on paper 13.9:1, muted on paper 5.4:1, paper on forest
6.6:1. Body text passes AAA; everything else passes AA.

---

## 4. Typography

Three families, three jobs, never mixed.

| Role | Family | Used for |
| --- | --- | --- |
| Display | **Fraunces** 600 | `h1`, `h2`, `h3`, section titles |
| Body | **Instrument Sans** 400/500/600 | prose, labels, buttons, all UI |
| Mono | **JetBrains Mono** 500 | dates, counts, places, IDs, eyebrows |

Loaded with `next/font/google` in `src/app/layout.tsx`. **The variables must be
on `<html>`** — if they sit on `<body>`, every `var(--font-display)` resolved at
`:root` silently falls back to system UI and the whole direction collapses.

```tsx
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

<html lang="en" suppressHydrationWarning
  className={`${fraunces.variable} ${instrument.variable} ${jetbrains.variable}`}>
```

### Roles

These classes are the only type styles allowed. They live in `@layer components`
in `globals.css` (Appendix A).

| Class | Size | Line height | Where |
| --- | --- | --- | --- |
| `t-display-xl` | 44 → 76px | 0.95 | Home banner only, once per page |
| `t-display` | 36 → 56px | 1.00 | Page header |
| `t-h2` | 28 → 40px | 1.08 | Section heading |
| `t-h3` | 22 → 28px | 1.20 | Sub-section |
| `t-h4` | 18px sans | 1.40 | Card and dialog titles |
| `t-lead` | 17 → 20px | 1.65 | Intro under a heading |
| `t-body` | 16px | 1.70 | Prose |
| `t-small` | 14px | 1.60 | Helper text, dense UI |
| `t-micro` | 12.5px | 1.50 | Captions, legal |
| `t-label` | 11px mono, `0.14em`, uppercase | 1.20 | Eyebrows, metadata labels |
| `t-mono` | inherited mono, tabular | — | Figures, IDs, date blocks |

### Type rules

1. **One `t-display-xl` per page.** One `t-display` per page at most.
2. **A section heading is never hand-rolled.** Use `SectionHeading`.
3. **Fact with a unit → mono.** Date, count, distance, duration, place, ID.
   Thought → Instrument Sans.
4. Body copy maxes at ~68 characters (`max-w-2xl` at `t-body`).
5. Never centre a paragraph longer than two lines.
6. No weights below 400, no decorative italics, no letter-spaced body text.

---

## 5. Space, shape, depth

- **Base unit 4px.** Use 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96. Nothing else.
- **Section rhythm:** `py-16 md:py-24` (64 / 96px). Every public section, no
  exceptions — this is what makes separate sections read as one document.
- **Container:** `.shell` — `max-width: 78rem`, `padding-inline: 1.25rem`,
  `2rem` from `md`.
- **Card grid:** `grid gap-5 sm:grid-cols-2 xl:grid-cols-3`.

### Radii

| Alias | Value | Use |
| --- | --- | --- |
| `rounded-xs` | 4px | checkboxes, skeleton blocks |
| `rounded-sm` | 8px | **buttons, inputs**, date stub |
| `rounded-md` | 12px | cards, panels, toasts |
| `rounded-lg` | 16px | large feature panels |
| `rounded-full` | 9999px | badges/pills only, avatar, meter track |

Nothing above 16px except pills and circles. Soft 24px cards are what make a
civic product look like a consumer app.

### Depth

**Borders, not shadows.** Cards: `border border-border bg-surface`.
`shadow-pop` is reserved for popovers, menus and toasts. There is no
`shadow-lg`, no `shadow-xl`, no inner shadow.

### Motion

150ms for state changes, 200–500ms for a hover zoom. Never bounce, never
parallax. Respect `prefers-reduced-motion` — Appendix A already disables the
skeleton shimmer and smooth scroll there.

### Photography

All editorial images go through one wrapper:

```tsx
<div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
  <div className="photo-treat absolute inset-0">
    <img src={src} alt="" className="size-full object-cover" />
  </div>
</div>
```

`.photo-treat` applies `saturate(.82) contrast(1.04) brightness(1.02)` plus a 10%
ochre multiply layer. The parent must be `relative` and `overflow-hidden` with a
fixed aspect ratio (`16/10` cards, `16/9` hero, `21/9` detail banner).

**Image element choice:**

- **Local, trusted images** (banner, gallery, bundled photography) → `next/image`
  with `fill` + `sizes`; the first hero image gets `priority`.
- **User-supplied thumbnail URLs** (anything typed into Create Event) → plain
  `<img loading="lazy" decoding="async" referrerPolicy="no-referrer">`.
  A user can paste any host; `next/image` would throw at runtime for hosts not
  listed in `next.config.ts`. Do not add a wildcard `remotePatterns` just to
  make it work.

Decorative images use `alt=""`. Meaningful images need real alt text.

---

## 6. Layout

### Page skeleton

```
<header>   sticky top-0 z-40 h-16 border-b bg-background/85 backdrop-blur-md
<main>
  <section class="py-16 md:py-24"> … </section>
</main>
<footer>   border-t border-border
```

`scroll-padding-top` is `6rem` globally, so anchor links clear the sticky nav.

### Section recipe

Eyebrow → heading → lead → content. Always in that order, 32px between the
heading block and the content.

```tsx
<section className="py-16 md:py-24">
  <div className="shell">
    <SectionHeading
      eyebrow="Upcoming"
      title="Next three Saturdays, sorted by date."
      description="Every event below was created by someone in the community. Pick one and show up."
      action={<Button variant="secondary">All events <ArrowRight /></Button>}
    />
    <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => <EventCard key={event.id} event={event} />)}
    </div>
  </div>
</section>
```

### Responsive behaviour

| Width | Expectation |
| --- | --- |
| 390px | Single column. Nav collapses to wordmark + toggle + menu. Buttons full width where they are the only action. Nothing scrolls horizontally. |
| 768px | Two-column card grids. Side panels stack below content. |
| 1280px | Three-column card grid, sticky side panel on detail pages, 96px section rhythm. |

Test all three before finishing. `text-wrap: balance` on headings and `pretty`
on paragraphs are set globally — don't fight them.

### Global chrome

A fixed paper-grain overlay sits on `body::after` at 2.8% opacity. Toasts are
raised above it (`z-index: 100`). Do not add another full-screen overlay.

---

## 7. Components

Build in the order below. Put files exactly where the heading says — paths are
relative to `src/components/` — accept `className` on every component, and add
each one to the styleguide page when it lands.

**General rules**

- Use `cn()` (`clsx` + `tailwind-merge`) for every class merge.
- Variants via `cva` when a component has more than two.
- Never accept a `color` prop. Colour is decided by variant.
- Every interactive component needs hover, focus-visible, disabled and (where
  relevant) loading states.

### `src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### `Button` — `ui/button.tsx`

```tsx
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium",
    "transition-[background-color,border-color,color,transform,opacity] duration-150 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-45",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover active:translate-y-px",
        accent: "bg-accent text-accent-foreground hover:bg-accent-hover active:translate-y-px",
        secondary: "border border-border-strong bg-surface text-foreground hover:bg-surface-2 active:translate-y-px",
        ghost: "text-foreground hover:bg-surface-2 active:bg-border",
        link: "h-auto! px-0! text-primary underline-offset-4 hover:underline",
        destructive: "bg-destructive text-white hover:brightness-110 active:translate-y-px",
      },
      size: {
        sm: "h-9 px-3.5 text-[13px]",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[15px]",
        icon: "size-9 px-0",
      },
      block: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", size: "md", block: false },
  },
);
```

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `primary` `accent` `secondary` `ghost` `link` `destructive` | `primary` |
| `size` | `sm` 36px · `md` 44px · `lg` 48px · `icon` 36×36 | `md` |
| `block` | boolean | `false` |
| `loading` | spinner + disabled + `aria-busy` | `false` |

Usage: `primary` for the page's main action · `accent` for the single
highest-value action · `secondary` for card-level actions · `ghost` for tertiary
and cancel · `link` inline only · `destructive` for delete, always behind a
confirmation dialog. Icon-only buttons require `aria-label`.

### `Field`, `Input`, `Textarea`, `Select`, `Checkbox` — `ui/field.tsx`

Shared field base:

```
w-full rounded-sm border bg-surface text-foreground
placeholder:text-subtle transition-colors duration-150
focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25
disabled:cursor-not-allowed disabled:bg-surface-2 disabled:opacity-70
```

| Control | Height / shape | Invalid |
| --- | --- | --- |
| `Input` | `h-11 px-3.5 text-sm` | `border-destructive` + destructive ring |
| `Textarea` | `min-h-28 resize-y px-3.5 py-3 text-sm` | same |
| `Select` | `h-11 pr-10` + own chevron SVG at right | same |
| `Checkbox` | 16px, 4px radius, `peer` + `Check` icon | — |

`Field` renders label (13px, medium), optional ochre `*` with screen-reader
`(required)`, the control, then `error` **or** `hint` (error replaces hint).
Error text is `t-micro text-destructive` with a 14px alert icon.

```tsx
<Field label="Event title" htmlFor="title" required
  hint="What a volunteer would search for."
  error={errors.title?.message}>
  <Input id="title" invalid={!!errors.title} {...register("title")} />
</Field>
```

Two-column field rows: `grid gap-5 sm:grid-cols-2`.

### `Badge`, `TypeBadge` — `ui/badge.tsx`

`inline-flex items-center gap-1.5 rounded-full border font-medium`, sizes
`sm` (`px-2 py-0.5 text-[11px]`) and `md` (`px-2.5 py-1 text-xs`).

| Tone | Classes |
| --- | --- |
| `neutral` | `border-border bg-surface-2 text-muted` |
| `outline` | `border-border-strong bg-transparent text-muted` |
| `accent` | `border-accent/25 bg-accent-soft text-accent-ink` |
| `success` | `border-success/20 bg-success/10 text-success` |
| `danger` | `border-destructive/20 bg-destructive/10 text-destructive` |
| `cleanup` | `border-type-cleanup/20 bg-type-cleanup-soft text-type-cleanup` |
| `plantation` | `border-type-plantation/20 bg-type-plantation-soft text-type-plantation` |
| `donation` | `border-type-donation/20 bg-type-donation-soft text-type-donation` |
| `education` | `border-type-education/20 bg-type-education-soft text-type-education` |

`TypeBadge` maps `EventType` → tone and prepends a 6px dot
(`size-1.5 rounded-full bg-current opacity-70`). Never hand-build a type chip.

### `SectionHeading`, `Stat` — `ui/section-heading.tsx`

`SectionHeading` — `flex flex-col gap-4 md:flex-row md:items-end md:justify-between`.
Eyebrow is `t-label text-accent` preceded by a 24px ochre rule
(`h-px w-6 bg-accent`). Title is `t-h2 text-balance`. Description is
`t-lead mt-3`, `max-w-2xl`. `action` sits right on desktop.
`align="center"` centres the block and hides the rule.

`Stat` — value `t-mono text-3xl md:text-4xl font-semibold tracking-tight`,
label `t-micro text-muted`. No icons, no colour.

### `Skeleton`, `EmptyState` — `ui/states.tsx`

`Skeleton` — `skeleton rounded-xs bg-surface-2`, `aria-hidden`. The `skeleton`
class supplies the 1.6s shimmer (Appendix A). Shape it like the real content:

```tsx
<Skeleton className="aspect-[16/10] rounded-none" />   // card media
<Skeleton className="h-5 w-2/3" />                       // title line
```

`EmptyState` — `rounded-md border border-dashed border-border-strong
bg-surface/50 px-6 py-14 text-center`; optional 48px icon circle, `t-h4` title,
`t-small text-muted` description (`max-w-sm`), optional action. Copy explains
the next step.

### `EventCard`, `EventRow` — `events/event-card.tsx`

The atomic unit of the product. Equal height **by construction**: fixed media
ratio, clamped title, footer pinned with `mt-auto`. Never wrap it in a
fixed-height container.

```
article  group relative flex h-full flex-col overflow-hidden rounded-md
         border border-border bg-surface hover:border-border-strong
  media   relative aspect-[16/10] overflow-hidden bg-surface-2
            photo-treat wrapper + <img> (user URL, lazy)
            date stub: absolute left-3 top-3 min-w-12 rounded-sm
                       border border-border bg-background/95 px-2 py-1.5 text-center
                       day = t-mono text-[17px] font-semibold
                       month = t-label text-[9px]
            urgency:  absolute right-3 top-3 Badge tone="accent" size="sm"
                      when spotsLeft ≤ 10 ("Full" at 0)
  body    flex flex-1 flex-col gap-3 p-5
            row: TypeBadge sm + "34 going" (t-label text-subtle, Users icon)
            h3:  t-h4 line-clamp-2 min-h-[2.7em]
            meta: mt-auto border-t border-border pt-3, two lines
                  t-micro text-muted, MapPin + CalendarDays at 14px
            Button variant="secondary" block mt-2 justify-between
                  "View event" + ArrowUpRight
```

`EventRow` (Manage, Joined) — `flex flex-col gap-4 rounded-md border border-border
bg-surface p-3 sm:flex-row sm:items-center`; 128×80 thumb on `sm`, 128×128 on
mobile; `TypeBadge` + attendee count; truncated `t-h4`; one `t-micro` line
`Wednesday, 18 Nov · Mirpur 10`; actions `ghost`/`secondary` `size="sm"`.

### `ThemeToggle` — `theme-toggle.tsx`

Navbar only. Hydration-safe: both icons render and **CSS** decides visibility —
no `mounted` state, which React 19's lint rules reject.

```tsx
<Sun className="absolute size-[18px] transition-transform duration-200 dark:rotate-90 dark:scale-0 dark:opacity-0" />
<Moon className="absolute size-[18px] -rotate-90 scale-0 opacity-0 transition-transform duration-200 dark:rotate-0 dark:scale-100 dark:opacity-100" />
```

Label: `aria-label="Toggle colour theme"`. `onClick` flips
`resolvedTheme === "dark"`.

### `Avatar` — `ui/avatar.tsx`

Sizes `sm` 28 · `md` 32 · `lg` 56. `rounded-full object-cover`, `alt=""`.
Fallback: initials from the first two words, uppercase, `t-label`,
`bg-surface-2 text-muted border border-border`. Never a stock face, never a
coloured circle.

### `Navbar` — `layout/navbar.tsx`

```
<header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
  <div className="shell flex h-16 items-center justify-between gap-4">
```

- **Left:** wordmark `font-display text-[22px] lowercase tracking-tight` + ochre
  dot (`size-1.5 rounded-full bg-accent`), then `Upcoming Events` text link.
  Never an image logo.
- **Right, signed out:** `ThemeToggle`, then `Button variant="ghost" size="sm"`
  **Log in**.
- **Right, signed in:** `ThemeToggle`, then `ProfileMenu`.
- **Active link:** `text-foreground` with a 2px underline offset 6px via
  `after:`. Inactive `text-muted hover:text-foreground`.
- **Mobile (<768px):** hide the text link; `ghost` icon button (`Menu`,
  `aria-label="Open menu"`, `aria-expanded`) opens a panel **below** the header
  (`border-b border-border bg-surface`, not a floating card) with the links and
  auth actions.
- **Scrolled:** border only. No shadow, no height change.

### `ProfileMenu` — `layout/profile-menu.tsx`

The display name appears on **hover**; the menu opens on **click**. Two
affordances, one trigger — do not make the user guess which.

- Trigger: `Avatar size="md"` in a `button`, `aria-haspopup="menu"`,
  `aria-expanded`, `aria-label="Account menu"`.
- Hover label: `t-micro` pill, `absolute right-0 top-full mt-2 whitespace-nowrap
  rounded-sm border border-border bg-surface px-2 py-1 shadow-pop`, shown on
  hover and `:focus-visible`. Hidden below `md`; the menu shows the name instead.
- Panel: `w-56 rounded-md border border-border bg-surface p-1.5 shadow-pop`.
  Rows `flex items-center gap-2.5 rounded-sm px-3 py-2 text-sm hover:bg-surface-2`,
  icons 16px `text-muted`.
- Order: Create event · Manage events · Joined events · Profile · divider ·
  Sign out (`text-destructive`).
- Closes on outside click, `Esc`, or selection. Arrow keys move focus; focus
  returns to the trigger.

### `Footer` — `layout/footer.tsx`

```
<footer className="border-t border-border bg-surface">
  <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
```

Column 1: wordmark, one `t-small text-muted` line, ochre dot.
Columns 2–4 with `t-label` headings: **Explore** (Upcoming, Gallery, About) ·
**Community** (Create event, Joined events) · **Contact** (email,
`Dhaka, Bangladesh`, social icons). Use the current **X** mark, not the legacy
Twitter bird; every icon link needs `aria-label`.

Bottom bar: `border-t border-border py-6`, `t-micro text-subtle`, `© 2026 Uddom`
left, **Photography credits** link right.

### `Dialog` — `ui/dialog.tsx`

Native `<dialog>` + `showModal()`. No portal library.

- Panel `w-[calc(100%-2rem)] max-w-md rounded-lg border border-border bg-surface
  p-6 shadow-pop`.
- `dialog::backdrop { background: rgb(15 22 19 / .55); backdrop-filter: blur(2px) }`.
- Title `t-h4`; body `t-small text-muted mt-2`; actions `mt-6 flex justify-end gap-2`.
- Destructive confirm right (`destructive`), Cancel left (`ghost`). `Esc`
  cancels; focus returns to the trigger.

### `Tabs` — `ui/tabs.tsx`

`role="tablist"`, `flex gap-1 border-b border-border`. Tab: `t-small px-3 py-2
-mb-px border-b-2 border-transparent text-muted hover:text-foreground`; selected
`border-primary text-foreground`. Optional count `t-mono text-subtle`.
No pills, no cards.

### `Pagination` — `ui/pagination.tsx`

`Button variant="secondary" size="sm"` Previous / Next + `t-mono text-[13px]`
`Page 2 of 5`. Disabled at the ends. Never infinite scroll on a public list.

### `CapacityMeter` — `events/capacity-meter.tsx`

```tsx
<CapacityMeter joined={42} capacity={60} />
```

Track `h-1.5 w-full overflow-hidden rounded-full bg-surface-2`; fill
`h-full rounded-full bg-primary`. At ≥90% use `bg-accent`; when full use
`bg-destructive`. Label row: `t-label` left `42 of 60 places`, right `18 left`
(mono, only ≤10). Full: right label **Full** in `text-destructive`.
The number is always visible — colour never carries meaning alone.

### `SocialButton` — `auth/social-button.tsx`

`Button variant="secondary" block`, 44px, provider mark 18px, label
**Continue with Google**. Sits **above** the email form, followed by a divider
(`flex items-center gap-3`, two `h-px flex-1 bg-border`, `t-label text-subtle`
**or**). Loading disables the button and swaps the mark for a spinner.

### `InlineAlert` — `ui/inline-alert.tsx`

`rounded-sm border px-3.5 py-3 t-small`, 16px icon, optional bold title.
Tones: `danger` (`border-destructive/30 bg-destructive/10 text-destructive`),
`success` (`border-success/30 bg-success/10 text-success`), `info`
(`border-border-strong bg-surface-2 text-foreground`).
Form-level only; field-level errors stay in `Field`.

### `NewsletterForm` — `home/newsletter-form.tsx`

`flex flex-col gap-2 sm:flex-row`, input `max-w-sm`, `primary` button.
**Design only** — no backend. On submit:
`toast.success("You're on the list", { description: "We'll write once a month, no more." })`
and clear. Never claim a subscription that is not stored.

### `GalleryGrid` — `home/gallery-grid.tsx`

`grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2`; first image
`col-span-2 row-span-2`, four square. Every tile `overflow-hidden rounded-md`
with `.photo-treat`. Caption below: `t-micro text-subtle`. Static only, no
lightbox in v1.

### `Toaster` — `providers.tsx`

`next-themes` with `attribute="class"`, `defaultTheme="light"`,
`enableSystem`, `disableTransitionOnChange`. Sonner bottom-right, close button,
toasts styled: `!rounded-md !border !border-border !bg-surface !text-foreground
!shadow-pop !font-sans`; title `!text-sm !font-semibold`; description
`!text-[13px] !text-muted`; success icon `!text-success`; error icon
`!text-destructive`.

### Data the interface receives — `src/lib/events.ts`

The wire format belongs to `PRD.md`; this is only the shape the UI code is
allowed to assume. Map once at the edge, then hand components these props.

```ts
export const eventTypes = ["Cleanup", "Plantation", "Donation", "Education"] as const;
export type EventType = (typeof eventTypes)[number];

export interface EventItem {
  id: string;
  title: string;
  description: string;
  type: EventType;
  date: string;              // ISO 8601
  location: string;
  image: string;
  capacity: number;
  attendeeCount: number;
  organizer: { id: string; name: string; email: string; image?: string | null };
  joined: boolean;
  createdAt: string;
}

export function formatDateParts(iso: string) { /* Intl, timeZone: "Asia/Dhaka" */ }
```

`formatDateParts` returns `{ day, month, weekday, full, time }` using `en-GB`
and `Asia/Dhaka`. **Never** call `toLocaleDateString()` inline — server and
client produce different strings and React hydration fails.

### Component build order

| # | Component | Phase | Needed by |
| --- | --- | --- | --- |
| 1 | `Button` | P0 | everything |
| 2 | `Field` + controls | P0 | forms |
| 3 | `Badge`, `TypeBadge` | P0 | cards, filters |
| 4 | `SectionHeading`, `Stat` | P0 | every section |
| 5 | `Skeleton`, `EmptyState` | P0 | loading, empty |
| 6 | `ThemeToggle`, `Providers` | P0 | all pages |
| 7 | `EventCard`, `EventRow` | P0 | lists |
| 8 | `Avatar`, `Navbar`, `Footer` | P1 | chrome |
| 9 | `Dialog`, `Tabs`, `Pagination`, `InlineAlert` | P1 | manage, forms |
| 10 | `GalleryGrid`, `NewsletterForm`, `CapacityMeter` | P1 | home, detail |
| 11 | `SocialButton`, `ProfileMenu` | P2 | auth |
| 12 | `Styleguide` page | P0/P1 | proof |

`P0`/`P1`/`P2` are the build phases in `PRD.md` §9. The mapping is a convenience —
the binding rule is the order in this table.

---

## 8. Page compositions

A page is assembled from the components in §7 — never from fresh markup. Each
entry below fixes the order, the spacing and the states. Nothing here names a
URL: where a page lives is the product's business, not the design's.

Every page shares the skeleton in §6: sticky header, `<main>`, footer, sections
on `py-16 md:py-24`.

### 8.1 Home

1. **Banner** — full-bleed `16/9` photo with a dark scrim, `.shell` content,
   bottom-aligned, `min-h-[70svh]`.
   - Eyebrow `t-label`: `Dhaka · Community service`
   - `h1.t-display-xl`, `max-w-3xl`: *Show up. That's the whole thing.*
   - `t-lead` in paper colour, `max-w-xl`
   - Actions: `primary` **Browse events** + `secondary` **Create an event**
   - Stat strip below on `bg-background`, `border-t border-border`: four `Stat`s
     with real numbers only. A figure that cannot be counted does not appear.
2. **Features** — `SectionHeading` + three bordered cards
   (`grid gap-5 md:grid-cols-3`). Icon 24px `text-primary`, `t-h4`, `t-small`.
   Titles: *Create it*, *Show up*, *Keep the record*.
3. **Upcoming** — `SectionHeading` with an **All events** action, then exactly
   six `EventCard`s in the card grid. Six is the number; a seventh breaks the
   rhythm of the page.
4. **Gallery** — `GalleryGrid`, five photos, one caption line.
5. **Newsletter** — `bg-accent-soft` panel, `rounded-lg p-6 md:p-10`, heading
   left, `NewsletterForm` right on desktop.
6. **Footer**.

### 8.2 Event list

- Page header: `t-display` title, one `t-lead` sentence. No banner image — the
  cards carry the photography.
- Filter bar `border-y border-border py-4`: `Input` search (`max-w-xs`),
  `Select` type, `Select` sort (Soonest / Most attended). Same row on desktop,
  stacked on mobile, controls `w-full` below `sm`.
- Result count `t-label`: `24 events`.
- Grid of `EventCard`s, `grid gap-5 sm:grid-cols-2 xl:grid-cols-3`.
- Loading = six skeletons shaped like cards. No results = `EmptyState` with a
  **Clear filters** ghost button.
- `Pagination` under the grid, `mt-10`.

### 8.3 Event detail

Two columns from `lg`: content `min-w-0 flex-1`, panel `w-80 shrink-0` sticky at
`top-24`.

**Content**

1. Back link — `Button variant="link"` + `ArrowLeft`, `t-small`.
2. Banner — `aspect-[21/9] rounded-lg overflow-hidden`, `photo-treat`, date stub
   bottom-left, `TypeBadge` top-left.
3. `h1.t-display`.
4. Meta row — three columns on `sm`, each `t-label` over `t-small`: **Date**
   (`Wednesday, 18 November`), **Time** (`9:30 AM`), **Place**.
5. Description — `t-body max-w-2xl`.
6. **What to bring** — bordered panel, `t-h4`, list with ochre markers, 3–5
   concrete items.
7. **Organiser** — initials avatar, name, `t-micro` "Created 3 events".

**Join panel** — `rounded-md border border-border bg-surface p-5 space-y-4`,
sticky, same width as the column. Five visual states, one per situation:

| State | Panel |
| --- | --- |
| Available | `CapacityMeter`, spots left (`t-h3` mono when ≤10, otherwise `t-small text-muted`), `primary block size="lg"` **Join this event** |
| Joined | `secondary block` **You're going** + `Check`, `ghost` **Leave event** below |
| Full | `primary` disabled, label **Event full**, `Badge tone="danger"` |
| Past | join control hidden, `Badge tone="outline"` **Past event**, attendance summary in its place |
| Signed out | `primary` **Log in to join** — same position, same weight |

Below any state: `secondary` **Add to calendar**, `ghost` **Share**. Icon 16px,
`justify-start`, gap 2.

### 8.4 Sign in / Sign up

Split layout `lg:grid-cols-2`, full height minus nav.

- **Left** (hidden below `lg`): `bg-surface-inverse`, `photo-treat` image at 40%
  opacity, `t-h3` quote in paper colour, `t-label` attribution. No form.
- **Right:** centred `max-w-sm`, `py-16`.
  - `h1.t-h3` — *Welcome back.* / *Join Uddom.*
  - One `t-small text-muted` sentence.
  - `SocialButton` + **or** divider.
  - Sign up: name, email, photo URL, password, confirm. Sign in: email,
    password.
  - `Checkbox` — *Keep me signed in* / *I agree to the community guidelines*.
  - `primary block` — **Log in** / **Create account**, with `loading`.
  - `link` — *New here? Create an account.* / *Already have an account? Log in.*
  - Form-level error: `InlineAlert` above the fields.
  - Password message: *Use at least 6 characters with one uppercase and one
    lowercase letter.*
  - An error never reveals whether an email exists.

Both pages must look like the same document: same width, same field rhythm, same
button size. Only the labels and field count change.

### 8.5 Event editor (create / edit)

Single column `max-w-3xl`, groups separated by `border-t border-border pt-8`
with a `t-label` group title.

1. **The event** — title, type, date, time, location.
2. **The details** — description, what to bring, capacity.
3. **The image** — URL field + live `16/10` preview. Invalid URL → field error +
   `bg-surface-2` placeholder, never a broken image icon.
4. **Publish** — `Checkbox` confirming the event is free and open to anyone.

Action bar `sticky bottom-0 bg-background/95 backdrop-blur border-t
border-border py-4`: `primary` **Publish event**, `ghost` **Cancel**.

Edit mode changes three things only: the heading (`t-display` → *Edit event*),
the primary label (**Save changes**), and a `destructive` **Delete** at the far
right, behind the confirm dialog.

Error copy is a sentence with a remedy (see §10). The rules behind it — future
date, capacity 1–1000, title 6–90, description 20–2000 — belong to `PRD.md`;
the *placement* and *wording style* are this document's.

### 8.6 Owner's event list

- `SectionHeading eyebrow="Your events"`, action = `accent` **Create event** —
  the one ochre moment on the page.
- Summary row: three `Stat`s (published, draft, total attendees) on a
  `border-y border-border` strip.
- `Tabs`: All · Published · Draft · Past.
- `EventRow` list, `space-y-3`. Each row: **View** (`secondary`), **Edit**
  (`secondary`), and a `MoreHorizontal` ghost icon whose menu holds **Delete**
  (`destructive`).
- Delete dialog names the event and how many people joined. Never a browser
  confirm.
- Empty: *No events yet* / *Create your first cleanup or plantation drive and it
  will show up here.* / **Create event**.

### 8.7 Personal record

- `SectionHeading eyebrow="Your record"` — *What you've shown up for.*
- Four `Stat`s in a bordered strip: events joined, hours volunteered, types
  covered, member since. Hours are counted from attendance, never estimated.
- `EventRow` list, each with `Badge tone="success"` **Attended** or
  `tone="neutral"` **Upcoming**, ordered by event date ascending.
- Empty: *No events joined yet* / *Pick a cleanup and it lands here with your
  volunteer hours.* / **Browse upcoming events**.

### 8.8 Account settings

- Two columns from `lg`: identity card left (`Avatar size="lg"`, name, email,
  `t-label` member since), form right `max-w-md`.
- Fields: name, photo URL. Email is read-only and visually disabled.
- `primary` **Save changes**, `ghost` **Cancel**.
- `t-micro` note: *Your email is used to sign in and cannot be changed here.*

### 8.9 Not found

`EmptyState` centred in `min-h-[60svh]` — *This page isn't here* / *The event may
have ended, or the link is wrong.* / **Back to events**.

### 8.10 Styleguide

The styleguide is a page in the build, not a scrapbook: it renders every
component in both materials and is the reference the other pages are checked
against.

- Sticky top bar with the page title; left rail of section links on desktop.
- Nine sections: Colour · Typography · Space & shape · Buttons · Forms · Chips &
  metadata · Event card · Feedback · Composition.
- Colour and type sections are side-by-side `theme-light` / `theme-dark` islands
  so contrast can be read at a glance.
- Every component appears in its real states: default, hover, focus, disabled,
  loading, error, empty.
- Composition shows one real page fragment assembled from components — never a
  lorem-filled mock.

If a component is not on this page, it does not exist yet.

---

## 9. States and feedback

| State | Rule |
| --- | --- |
| **Loading** | Skeleton shaped like the real content, 1.6s shimmer. No full-page spinner after first paint. |
| **Empty** | What happened, then one clear next action. |
| **Error** | A sentence with a remedy, in place. Field errors replace the hint. Page errors sit above the form. |
| **Success** | Toast, bottom-right, outcome + next step. |
| **Pending** | Button `loading`, same width, label unchanged. |

```ts
toast.success("Event created", { description: "Live now. Redirecting to upcoming events…" });
toast.error("Could not join", { description: "This one filled up. Try another event nearby." });
```

Never "Success!" or "Error!". Never `alert`, `confirm` or `prompt`.

---

## 10. Copy

Plain, specific, local. Second person. No exclamation marks, no superlatives, no
filler. British spelling (`colour`, `organise`, `neighbourhood`).

| Don't | Do |
| --- | --- |
| Lorem ipsum dolor sit amet | Bring a jacket. We'll bring the route. |
| Discover amazing events near you! | Two hundred saplings. One Saturday. |
| Error: invalid input | Pick a date after today. |
| No data found. | No events joined yet — pick a cleanup and it lands here. |
| Join us for a wonderful experience | Gloves and sacks provided. Wear closed shoes. |
| User successfully registered | Account created. Let's find you something to join. |

Numbers are concrete: `34 going`, `1,284 hours`, `11 neighbourhoods`. If a number
is not real, it does not appear. No invented testimonials or partner logos.

Formatting: `Wednesday · 9:30 AM`, `Mirpur 10 Roundabout, Dhaka`, `Asia/Dhaka`,
`en-GB`. Currency BDT.

Button labels are verbs: **Join this event**, **Publish event**, **Save
changes**, **Browse events** — not **Submit** or **Click here**.

---

## 11. Accessibility

- Body text ≥ 4.5:1, large text ≥ 3:1. The palette passes; keep it that way by
  using tokens.
- Visible `:focus-visible` outline (2px, 2px offset, `ring`) on everything.
  Never `outline-none` without a replacement.
- Minimum 44×44 touch target for primary actions.
- Errors: `aria-invalid` on the control, message adjacent in the DOM.
- Icon-only buttons need `aria-label`; decorative icons `aria-hidden`.
- One `<main>` per page, `<nav>` for navigation, `<footer>` for the footer.
- Dialogs trap focus, close on `Esc`, restore focus.
- `prefers-reduced-motion` disables shimmer and smooth scroll (already in
  Appendix A).
- Keyboard order follows visual order.

---

## 12. Rules for agents

1. **Never hardcode colour, radius, shadow or font size.** Tokens or role
   classes only.
2. **Never invent a pattern when a component exists.** Import it.
3. **Every section heading uses `SectionHeading`.** No hand-written `<h2>`.
4. **Every form control uses `Field` + `Input`/`Textarea`/`Select`.**
5. **Cards use borders, not shadows.**
6. **Check both themes.** Broken dark mode means a literal colour.
7. **No lorem ipsum. No `window.alert`.** Toasts via `sonner`.
8. **One primary button per view; accent once per screen.**
9. **Dates through `formatDateParts`.** Never inline locale formatting.
10. **Images through `.photo-treat` inside a sized, `overflow-hidden` parent.**
11. **Every new component appears on the styleguide page in the same commit.**
12. **You do not commit.** Stop after each commit row in `PRD.md` §9.5, hand the
    human the exact message and commands, and wait for `continue`.
13. **Read `node_modules/next/dist/docs/` before Next-specific code.** This is
    Next 16; `cookies()` and `headers()` are async, and caching defaults differ.

| Don't | Do |
| --- | --- |
| `bg-[#2C6350]` | `bg-primary` |
| `text-[32px] font-bold` | `className="t-h2"` |
| `rounded-2xl shadow-lg` | `rounded-md border border-border` |
| `<div className="text-4xl">` as heading | `<SectionHeading title="…" />` |
| `<input className="border p-2" />` | `<Field><Input /></Field>` |
| `alert("Saved")` | `toast.success("Event created", …)` |
| `<img>` for local art | `next/image` with `fill` + `sizes` |
| `<img>` for user URLs via `next/image` | plain `<img>` + lazy |
| A second accent colour | One accent, one primary action |
| Rebuilding `EventCard` per page | Pass props to `EventCard` |
| `min-h-[400px]` to align cards | Let `mt-auto` do it |

---

## 13. Definition of done

A page is finished when:

- [ ] It is composed from existing components, not new one-off markup.
- [ ] No hardcoded hex, px font size, radius or shadow appears in it.
- [ ] It renders correctly in **both** themes.
- [ ] It works at **390 / 768 / 1280** with no horizontal scroll.
- [ ] Loading has skeletons, empty has an `EmptyState`, errors are inline.
- [ ] All headings use `SectionHeading` or a documented role class.
- [ ] One primary button; ochre used at most once.
- [ ] Copy is real, specific and local.
- [ ] Tab order is sensible and focus is visible.
- [ ] Dates, counts and places use mono; prose does not.
- [ ] `npm run lint && npm run typecheck && npm run build` pass.
- [ ] The styleguide page still matches.

---

## Appendix A — `globals.css`

Copy this file verbatim to `src/app/globals.css`. It is the runtime source of
truth; the tables above are a reading of it.

```css
@import "tailwindcss";

/* next-themes writes `class="dark"` on <html>; tell Tailwind to honour it. */
@custom-variant dark (&:where(.dark, .dark *));

/* ==========================================================================
   Uddom — Design tokens
   Light  = "paper"        (warm off-white, forest ink, ochre signal)
   Dark   = "evening field" (green-black, never neutral grey)
   ========================================================================== */

:root,
.theme-light {
  /* surfaces */
  --background: #faf7f0;
  --surface: #fffdf8;
  --surface-2: #f4efe4;
  --surface-inverse: #14231b;

  /* text */
  --foreground: #16241c;
  --muted: #5b6a60;
  --subtle: #8a968c;

  /* lines */
  --border: #e6dfd0;
  --border-strong: #d3c8b4;

  /* brand */
  --primary: #2c6350;
  --primary-hover: #245444;
  --primary-foreground: #fbf9f3;
  --accent: #b9752a;
  --accent-hover: #a2651f;
  --accent-foreground: #fffdf8;
  --accent-soft: #f6e9d6;
  --accent-ink: #7a4a12;

  /* status */
  --success: #2f6a45;
  --warning: #92610f;
  --destructive: #a23b24;

  /* focus */
  --ring: #2c6350;

  /* event taxonomy */
  --type-cleanup: #1f5e6b;
  --type-cleanup-soft: #dcebed;
  --type-plantation: #2f5d2a;
  --type-plantation-soft: #e4eede;
  --type-donation: #8a4a1c;
  --type-donation-soft: #f7e6d6;
  --type-education: #43407a;
  --type-education-soft: #e6e5f3;

  /* shape */
  --elevation-pop: 0 10px 30px -12px rgb(20 35 27 / 0.28),
    0 2px 6px -2px rgb(20 35 27 / 0.12);
}

.dark,
.theme-dark {
  --background: #0f1613;
  --surface: #17211c;
  --surface-2: #1e2a23;
  --surface-inverse: #ede7da;

  --foreground: #ede7da;
  --muted: #9ba79e;
  --subtle: #74827a;

  --border: #27342c;
  --border-strong: #36463c;

  --primary: #7fbfa0;
  --primary-hover: #93ccb0;
  --primary-foreground: #0b1210;
  --accent: #e2a45c;
  --accent-hover: #efb473;
  --accent-foreground: #1a1206;
  --accent-soft: #2a2118;
  --accent-ink: #f0c088;

  --success: #7fcfa0;
  --warning: #e2b45c;
  --destructive: #e0785f;

  --ring: #7fbfa0;

  --type-cleanup: #8fd3de;
  --type-cleanup-soft: #152a2e;
  --type-plantation: #a8d69a;
  --type-plantation-soft: #1a2a18;
  --type-donation: #e9b081;
  --type-donation-soft: #2b1d14;
  --type-education: #b3b0e8;
  --type-education-soft: #1f1e33;

  --elevation-pop: 0 10px 30px -12px rgb(0 0 0 / 0.6),
    0 2px 6px -2px rgb(0 0 0 / 0.4);
}

@theme inline {
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-surface-2: var(--surface-2);
  --color-surface-inverse: var(--surface-inverse);

  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-subtle: var(--subtle);

  --color-border: var(--border);
  --color-border-strong: var(--border-strong);

  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent-soft: var(--accent-soft);
  --color-accent-ink: var(--accent-ink);

  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-destructive: var(--destructive);

  --color-ink: var(--foreground);
  --color-ring: var(--ring);

  --color-type-cleanup: var(--type-cleanup);
  --color-type-cleanup-soft: var(--type-cleanup-soft);
  --color-type-plantation: var(--type-plantation);
  --color-type-plantation-soft: var(--type-plantation-soft);
  --color-type-donation: var(--type-donation);
  --color-type-donation-soft: var(--type-donation-soft);
  --color-type-education: var(--type-education);
  --color-type-education-soft: var(--type-education-soft);

  --font-sans: var(--font-instrument), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-fraunces), ui-serif, Georgia, serif;
  --font-mono: var(--font-jetbrains), ui-monospace, monospace;

  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  --shadow-pop: var(--elevation-pop);
}

/* ==========================================================================
   Base
   ========================================================================== */

@layer base {
  * {
    border-color: var(--border);
  }

  html {
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
    scroll-padding-top: 6rem;
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: var(--font-instrument), ui-sans-serif, system-ui, sans-serif;
    font-size: 16px;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  /* Paper grain. Barely visible on purpose: it stops flat fills from
     looking like unrendered CSS. */
  body::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 60;
    pointer-events: none;
    opacity: 0.028;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 140px 140px;
  }

  ::selection {
    background-color: rgb(185 117 42 / 0.22);
    color: var(--foreground);
  }

  :focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
  }

  h1,
  h2,
  h3,
  h4 {
    text-wrap: balance;
  }

  p {
    text-wrap: pretty;
  }

  img {
    user-select: none;
  }
}

/* ==========================================================================
   Typography roles — the only type styles pages are allowed to use
   ========================================================================== */

@layer components {
  .t-display-xl {
    font-family: var(--font-display);
    font-size: clamp(2.75rem, 1.15rem + 5.1vw, 4.75rem);
    line-height: 0.95;
    letter-spacing: -0.035em;
    font-weight: 600;
  }

  .t-display {
    font-family: var(--font-display);
    font-size: clamp(2.25rem, 1.35rem + 3.1vw, 3.5rem);
    line-height: 1;
    letter-spacing: -0.03em;
    font-weight: 600;
  }

  .t-h2 {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 1.3rem + 1.5vw, 2.5rem);
    line-height: 1.08;
    letter-spacing: -0.025em;
    font-weight: 600;
  }

  .t-h3 {
    font-family: var(--font-display);
    font-size: clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem);
    line-height: 1.2;
    letter-spacing: -0.02em;
    font-weight: 600;
  }

  .t-h4 {
    font-family: var(--font-sans);
    font-size: 1.125rem;
    line-height: 1.4;
    letter-spacing: -0.01em;
    font-weight: 600;
  }

  .t-lead {
    font-size: clamp(1.0625rem, 1rem + 0.35vw, 1.25rem);
    line-height: 1.65;
    color: var(--muted);
  }

  .t-body {
    font-size: 1rem;
    line-height: 1.7;
  }

  .t-small {
    font-size: 0.875rem;
    line-height: 1.6;
  }

  .t-micro {
    font-size: 0.78125rem;
    line-height: 1.5;
  }

  /* Metadata: dates, locations, counts, IDs. Never for prose. */
  .t-label {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    line-height: 1.2;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 500;
  }

  .t-mono {
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
  }

  /* Consistent editorial container */
  .shell {
    width: 100%;
    max-width: 78rem;
    margin-inline: auto;
    padding-inline: 1.25rem;
  }

  @media (min-width: 768px) {
    .shell {
      padding-inline: 2rem;
    }
  }

  /* One photo treatment across the whole product so mixed sources read
     as a single art-directed set. */
  .photo-treat {
    filter: saturate(0.82) contrast(1.04) brightness(1.02);
  }

  .photo-treat::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: #c07a22;
    mix-blend-mode: multiply;
    opacity: 0.1;
    pointer-events: none;
  }
}

/* ==========================================================================
   Skeleton shimmer
   ========================================================================== */

.skeleton {
  position: relative;
  overflow: hidden;
}

.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    rgb(255 255 255 / 0.45) 50%,
    transparent 100%
  );
  animation: shimmer 1.6s ease-in-out infinite;
}

.dark .skeleton::after {
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    rgb(255 255 255 / 0.055) 50%,
    transparent 100%
  );
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton::after {
    animation: none;
  }

  html {
    scroll-behavior: auto;
  }
}

/* Sonner sits above the grain overlay */
[data-sonner-toaster] {
  z-index: 100 !important;
}
```

---

## Appendix B — Imagery

Photography is part of the design, not decoration: it is how a page of text
becomes a place. One treatment (`.photo-treat`, §5) unifies every source.

### What to use

- Real, local, documentary: drives, streets, volunteers, hands, weather.
- Human-scale. People doing the thing, not posing with a logo.
- Daylight, slightly flat, no heavy editing. The treatment does the toning.
- Never western stock, never a smiling handshake, never a 3D illustration.

### How to place it

| Slot | Ratio | Crop intent |
| --- | --- | --- |
| Home banner | `16/9` | Wide scene, text sits over the lower third |
| Card thumbnail | `16/10` | Subject left or right of centre — never dead centre |
| Detail banner | `21/9` | Environmental, readable with a date stub bottom-left |
| Gallery tile (large) | square, `col-span-2 row-span-2` | The strongest single frame |
| Gallery tile (small) | square | Detail shots, objects, hands |
| Auth panel | full column | Quiet image, 40% opacity behind a quote |

Always inside a parent with `relative`, `overflow-hidden` and a fixed ratio.
Never let an image set its own height.

### The starter set

Six images, one per event, stored under `public/images/events/` at ~1280px.
Event copy and dates live in `PRD.md`; this table only fixes the assets.

| File | Source page | Author | Licence |
| --- | --- | --- | --- |
| `winter-clothes-mirpur.jpg` | `File:Winter Clothes Distribution Among Orphans of Yatimkhana of Bangladesh by Needy Foundation. 01.jpg` | Needy Foundation | CC BY-SA 4.0 |
| `buriganga-cleanup.jpg` | `File:Let's Do It! Bangladesh 2012.jpg` | Let's Do It! World | CC BY-SA 4.0 |
| `hatirjheel-plantation.jpg` | `File:Md. Aminul Haque at tree plantation program in Girls' Ideal Laboratory School and College, Dhaka, 2026-08-09.jpg` | Press Information Department, Bangladesh | Public domain |
| `mohammadpur-blankets.jpg` | `File:Blanket Distribution At Kamalapur Railway Station By Sharmin S. Murshid 2025-01-06 (PID-0004220).jpg` | Press Information Department, Bangladesh | Public domain |
| `dhanmondi-sweep.jpg` | `File:Saint Martin's Island Cleanup Campaign 2025-02-12 (PID-0003543).jpg` | Press Information Department, Bangladesh | Public domain |
| `reading-circle.jpg` | `File:Each morning at BRAC schools throughout Bangladesh children create a circle with their shoes before entering the classroom. (10693841406).jpg` | Department of Foreign Affairs and Trade (Australia) | CC BY 4.0 |

All are Wikimedia Commons. Download at ~1280px and add
`https://commons.wikimedia.org/wiki/<file page>` to `CREDITS.md` with the
licence. Replace them with your own photographs if you can — the set shrinks to
one line of attribution and the pages get better.

The gallery uses five of the six; the sixth appears only as a card thumbnail.

---

## Appendix C — Dependencies and config

### Install

Scaffold the app first — the exact command is in `PRD.md` P0.1. Then, from the
**client repo root**, add the interface dependencies:

```bash
# interface and theming — everything this document needs
npm i next-themes sonner lucide-react class-variance-authority tailwind-merge clsx

# forms (see §7 Field)
npm i react-hook-form zod @hookform/resolvers

npm i -D @types/node
```

Authentication, data and server libraries are deliberately absent: they are
product decisions, listed in `PRD.md` §5. Nothing in this document depends on
them.

### `package.json` scripts

The docs run these names; make them exist:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "typecheck": "tsc --noEmit"
  }
}
```

### `postcss.config.mjs`

```js
const config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;
```

### `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // No remotePatterns: local art uses next/image, user URLs use <img>.
};

export default nextConfig;
```

### Fonts and metadata — `src/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${site.name} — Community service, organised`, template: `%s · ${site.name}` },
  description: site.description,
};
```

`Providers` wraps `next-themes` + Sonner (see §7 `Toaster`).

### `src/lib/site.ts`

```ts
export const site = {
  name: "Uddom",
  wordmark: "uddom",
  tagline: "Neighbourhood service, organised.",
  description:
    "Plan a cleanup, plant a hundred saplings, or collect winter clothes — then find the people who will show up with you.",
  location: "Dhaka, Bangladesh",
} as const;

/** Labels only. Where each one points is a product decision — see PRD.md. */
export const nav = ["Upcoming Events", "Gallery", "About"] as const;
```

### Icons

`lucide-react` only, `strokeWidth={1.75}`. 16px inside buttons and text, 20–24px
standalone. The social mark in the footer is the current X logo as inline SVG —
lucide's `Twitter` is the retired bird and is not used. No emoji as iconography,
no second icon set.
