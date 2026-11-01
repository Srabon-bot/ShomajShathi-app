# Shomaj Shathi — Interface Specification

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
- [Appendix D — Reading of the reference](#appendix-d--reading-of-the-reference)

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
4. **Do not hardcode.** Every colour, radius and font size comes from a token or
   a role class.
5. **Keep the styleguide page in the build.** It is where the system proves
   itself, in both themes, and it is how a reviewer checks that two pages use the
   same heading and the same button. It is not a scratch page to delete.

If a page needs something this document does not define, add the component here
and to the styleguide page **first**, then build the page.

---

## 2. Direction

**A street poster, not a brand deck.** The interface is built like a Swiss
exhibition poster printed cheaply: white paper, black rules doing all the
structural work, one heavy caps typeface at absurd scale, and a single flat
orange that refuses to be a gradient.

It should feel **loud, civic, printed, confident**.
It should not feel like an NGO brochure, a SaaS dashboard, a crypto landing page,
or a purchased template.

Four commitments produce that impression:

1. **Rules, not boxes.** One-pixel black lines divide the navbar into cells,
   separate list rows, and underline form fields. Nothing floats in a soft card.
   Structure is drawn, not implied by shadow.
2. **Flat colour, no gradients, no glow, no shadow.** One orange. One yellow
   band. One sand panel. Each does exactly one job and is used exactly where §3
   says.
3. **Type carries the hierarchy.** One family (Archivo), one display weight
   (Archivo Black), uppercase and very tight. There is no second voice, no serif,
   no monospace mannerism.
4. **Square by default.** Photographs, cards, inputs and panels have zero radius.
   Only controls are round: pills for secondary actions, one 8px rectangle for
   the primary action. That contrast is the whole shape system.

Photography is documentary and local. It is **not** graded, filtered, tinted or
overlaid — the crop and the rules around it are the art direction.

**Brand:** *Shomaj Shathi* (সমাজ সাথী — community companion). The wordmark is two
words in two colours, `shomaj` in ink and `shathi` in orange, always lowercase,
always one line. It lives in one place, `src/lib/site.ts`, so the navbar, footer
and metadata follow a change.

---

## 3. Colour

Never write a hex value in a component. Use the Tailwind alias, which resolves to
the token in both themes.

### Core

| Token | Light | Dark | Alias | Use |
| --- | --- | --- | --- | --- |
| `background` | `#FFFFFF` | `#0B0B0B` | `bg-background` | Page ground, all public pages |
| `surface` | `#FFFFFF` | `#121212` | `bg-surface` | Panels and cards that sit on a coloured band |
| `sand` | `#EADFC9` | `#241F16` | `bg-sand` | Dashboard sidebar only |
| `sun` | `#F5EE45` | `#E9DF3C` | `bg-sun` | The home categories band, and nothing else |
| `sun-foreground` | `#0B0B0B` | `#0B0B0B` | `text-sun-foreground` | Text and chips inside the yellow band; never `foreground`, which inverts to cream in dark mode |
| `foreground` | `#0B0B0B` | `#F2F0E9` | `text-foreground` | Headings, body, primary button fill |
| `muted` | `#5C5C5C` | `#A8A8A8` | `text-muted` | Secondary text, lead paragraphs |
| `subtle` | `#767676` | `#8C8C8C` | `text-subtle` | Placeholders, captions, legal |

### Lines

| Token | Light | Dark | Alias | Use |
| --- | --- | --- | --- | --- |
| `rule` | `#0B0B0B` | `#333333` | `border-rule` | Structural: navbar cells, section borders, card borders, table rows |
| `rule-soft` | `#BDBDBD` | `#3D3D3D` | `border-rule-soft` | Form underlines, dense dividers, skeletons |
| `rule-sand` | `#CDBD9C` | `#3A3222` | `border-rule-sand` | Dividers inside the sand sidebar |

### Accent

| Token | Light | Dark | Alias | Use |
| --- | --- | --- | --- | --- |
| `brand` | `#EE6C1C` | `#FF7A2F` | `bg-brand` / `text-brand` | Fill: count chips, active nav cell, hover on primary |
| `brand-hover` | `#D95F14` | `#FF8F4D` | `hover:bg-brand-hover` | Hover on orange fills only |
| `brand-ink` | `#B8540E` | `#FF8A45` | `text-brand-ink` | Orange **text** on the page ground |
| `brand-foreground` | `#0B0B0B` | `#0B0B0B` | `text-brand-foreground` | Text on an orange fill |

### Status

| Token | Light | Dark | Alias | Meaning |
| --- | --- | --- | --- | --- |
| `danger` | `#B3261E` | `#FF8A7A` | `text-danger` / `border-danger` | Errors, delete, full |
| `danger-soft` | `#FBE9E7` | `#2A1512` | `bg-danger-soft` | Error panel fill |

### Measured contrast

Every pair below is measured, not estimated. Body text is AA at minimum.

| Pair | Light | Dark |
| --- | --- | --- |
| ink on ground | 19.68:1 | 17.26:1 |
| muted on ground | 6.69:1 | 8.28:1 |
| subtle on ground | 4.54:1 | 5.85:1 |
| brand-ink on ground | 4.87:1 | 8.41:1 |
| ink on brand fill | 6.37:1 | 7.57:1 |
| ink on sand | 14.90:1 | 14.36:1 |
| muted on sand | 5.06:1 | 6.89:1 |
| ink on sun | 16.12:1 | 14.14:1 |

### Colour rules

1. **Orange never carries white text.** `#EE6C1C` with white is 3.09:1 and fails.
   Text on an orange fill is `brand-foreground` (black) at 6.37:1. This is the
   single most important colour rule in the document.
2. **Orange text is never plain `brand`.** On white use `brand-ink`; a fill uses
   `brand`.
3. **The yellow band appears once**, across the categories block on the home
   page. It is never a button colour, never a highlight, never a second band.
4. **Sand is for the dashboard sidebar only.** Not for callouts, not for cards.
5. **No gradients.** No mesh, no glow, no coloured shadows, no image overlays.
6. **Type colours are ink, muted or subtle. Nothing else.** A heading is never
   orange.
7. **Check both themes before calling it done.** If dark mode breaks, a literal
   colour slipped in.

---

## 4. Typography

**One family. Two cuts.**

| Role | Family | Used for |
| --- | --- | --- |
| Display | **Archivo Black** 400 | `h1`, `h2`, the wordmark, big figures |
| UI and body | **Archivo** 400 / 500 / 700 | everything else: prose, labels, buttons, fields |

There is no serif and **no monospace**. Dates and counts are Archivo with
tabular numerals (`t-figure`). A mono grid is a different product's voice; here
the numbers are simply set in the same family as the words.

Loaded with `next/font/google` in `src/app/layout.tsx`. **The variables must be on
`<html>`** — if they sit on `<body>`, every `var(--font-display)` resolved at
`:root` silently falls back to system UI and the whole direction collapses.

```tsx
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const archivoBlack = Archivo_Black({
  subsets: ["latin"], weight: "400", variable: "--font-archivo-black", display: "swap",
});

<html lang="en" suppressHydrationWarning
  className={`${archivo.variable} ${archivoBlack.variable}`}>
```

### Roles

These classes are the only type styles allowed. They live in `@layer components`
in `globals.css` (Appendix A).

| Class | Family | Size | Line height | Tracking | Case |
| --- | --- | --- | --- | --- | --- |
| `t-mega` | Archivo Black | 48 → 144px | 0.84 | −0.045em | UPPER |
| `t-display` | Archivo Black | 40 → 72px | 0.88 | −0.04em | UPPER |
| `t-h2` | Archivo Black | 30 → 44px | 0.92 | −0.035em | UPPER |
| `t-h3` | Archivo 700 | 20 → 24px | 1.12 | −0.02em | UPPER |
| `t-h4` | Archivo 700 | 17px | 1.30 | −0.01em | UPPER |
| `t-lead` | Archivo 400 | 17 → 20px | 1.50 | −0.01em | sentence |
| `t-body` | Archivo 400 | 16px | 1.65 | 0 | sentence |
| `t-small` | Archivo 400 | 14px | 1.55 | 0 | sentence |
| `t-micro` | Archivo 400 | 12px | 1.45 | 0 | sentence |
| `t-label` | Archivo 700 | 11px | 1.20 | 0.08em | UPPER |
| `t-figure` | Archivo 700 | inherited | — | −0.02em | — |

### Type rules

1. **One `t-mega` per site:** the home hero. One `t-display` per page.
2. **Headings are uppercase by role class, never by `uppercase` in a page.**
   Body copy is never uppercase.
3. **`t-label` is for real labels**: form fields, table headers, nav, chip text.
   It is not decoration above a heading. There are **no eyebrows** — a section
   heading is a big caps line on its own.
4. **One line of caps is enough.** A heading and a label directly above it is a
   bug.
5. Body copy maxes at ~64 characters (`max-w-xl` at `t-body`).
6. No weights below 400, no italics, no letter-spaced body text, no serif.
7. **Figures use `t-figure`**, so columns of numbers line up. Dates are written
   `SAT 21 NOV`, `9:00 AM` — the label role, not a mono font.

---

## 5. Space, shape, depth

- **Base unit 4px.** Use 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96. Nothing else.
- **Section rhythm:** `py-16 md:py-24` (64 / 96px) on public pages. The dashboard
  uses `py-10 md:py-14` because the sidebar already supplies structure.
- **Container:** `.shell` — `max-width: 80rem`, `padding-inline: 1.25rem`,
  `2rem` from `md`, `2.5rem` from `xl`.
- **Full-bleed bands** run edge to edge and put their content inside `.shell`.
- **Card grid:** `grid gap-6 sm:grid-cols-2 xl:grid-cols-3`.

### Shape

Only three shapes exist.

| Shape | Value | Use |
| --- | --- | --- |
| Square | `0` | everything structural: cards, panels, inputs, images, dialogs, sidebar, table rows |
| Action | `8px` | the primary rectangle button, and nothing else |
| Pill | `9999px` | secondary buttons, chips, filter controls, avatars, icon buttons, progress track |

A soft 16px card is what makes a civic product look like a consumer app. There is
no `rounded-lg` on a surface. If you are reaching for a fourth radius, the
component is wrong.

### Depth

**No shadows. Anywhere.** Separation comes from a 1px rule, a colour block, or
whitespace. Menus and dialogs sit on `bg-surface` with a `border border-rule`;
they are legible because the rest of the page has no elevation either. A
`box-shadow` in a component is a bug.

### Motion

- 120ms for colour and border changes. 200ms for the theme swap.
- No hover zoom, no lift, no parallax, no skeleton fade beyond the shimmer.
- Hover feedback is **underline or colour**, never movement.
- Respect `prefers-reduced-motion` — Appendix A disables shimmer and smooth
  scroll.

### Photography

No filter. No grain. No overlay. No tint. The crop does the work.

| Slot | Ratio |
| --- | --- |
| Hero | none — the home hero has no photo |
| Card thumbnail | `4/3` |
| Detail image | `3/2`, right column on desktop |
| Gallery tile | `1/1` |
| Auth | none |

Always inside a parent with `relative`, `overflow-hidden` and a fixed ratio.
Never let an image set its own height. Decorative images use `alt=""`; a gallery
or hero image needs real alt text.

**Image element choice:**

- **Local, trusted images** (bundled photography) → `next/image` with `fill` +
  `sizes`.
- **User-supplied thumbnail URLs** (anything typed into Create Event) → plain
  `<img loading="lazy" decoding="async" referrerPolicy="no-referrer">`. A user can
  paste any host; `next/image` would throw at runtime for hosts not listed in
  `next.config.ts`. Do not add a wildcard `remotePatterns` just to make it work.

---

## 6. Layout

### Page skeleton

```
<header>   sticky top-0 z-40 h-18 border-b border-rule bg-background
<main>
  <section class="py-16 md:py-24"> … </section>
</main>
<footer>   border-t border-rule
```

The header is **not** frosted, never translucent, and never changes height on
scroll. It is a solid white strip divided into cells.

### Navbar anatomy

```
┌───────────────┬──────────┬──────────┬──────────┬──────────────┐
│  shomaj shathi│  EVENTS  │   ABOUT  │  GALLERY │  REGISTER ▸  │  ← last cell: bg-brand
└───────────────┴──────────┴──────────┴──────────┴──────────────┘
  1px vertical rules between cells; 1px rule under the whole strip
```

- Every cell has `px-6`, the strip is `h-18` (72px), and cells are separated by
  `border-l border-rule`.
- The wordmark cell is wider and hugs the left gutter.
- Signed in, the last cell is the profile trigger, not the orange register cell.
- On mobile the cells collapse to wordmark + theme toggle + menu button, and the
  menu opens as a **full-width sheet below the header**, each row separated by a
  rule.

### Dashboard skeleton

Used by every signed-in page: manage, joined, profile, create, edit.

```
┌──────────────┬───────────────────────────────────────────────┐
│  UL VIN      │  PAGE TITLE                        [ ACTION ] │
│  OMAROV      │───────────────────────────────────────────────│
│  ● EVENTS    │                                               │
│  ○ PROFILE   │   content, on white, inside .shell            │
│  ○ SETTINGS  │                                               │
│              │                                               │
│  ─────────   │                                               │
│  LOG OUT  ←  │                                               │
└──────────────┴───────────────────────────────────────────────┘
   sand, 1px right rule        white
```

- Grid: `lg:grid-cols-[17.5rem_1fr]`, sidebar `bg-sand`, `border-r border-rule`,
  `sticky top-18`, full height, `p-6`.
- Sidebar content, top to bottom: display name in `t-h3` caps (two lines max),
  16px gap, pill nav (active = solid ink, inactive = 1px rule outline), spacer,
  `border-t border-rule-sand`, **Log out** row with a right-aligned icon.
- Below `lg` the sidebar becomes a horizontal pill row above the content; logout
  moves into the profile menu.
- The content column keeps the page header + action button on one baseline,
  separated from the body by a full-width rule.

### Responsive behaviour

| Width | Expectation |
| --- | --- |
| 390px | Single column. Nav collapses. The dashboard sidebar becomes a pill row. Every card is full width. Nothing scrolls horizontally. |
| 768px | Two-column card grid. Detail image stacks above the meta. Dashboard content full width under the pill row. |
| 1280px | Three-column card grid, `t-mega` hero at full size, dashboard sidebar visible, detail page two columns. |

Test all three before finishing. `text-wrap: balance` on headings and `pretty`
on paragraphs are set globally — don't fight them.

### Global chrome

No grain overlay, no fixed decoration, no scroll progress bar. The nav, the rules
and the one yellow band are the entire visual texture. Toasts are raised above
everything (`z-index: 100`).

---

## 7. Components

Build in the order below. Put files exactly where the heading says — paths are
relative to `src/components/` — accept `className` on every component, and add
each one to the styleguide page when it lands.

**General rules**

- **shadcn/ui is the base.** Primitives (button, input, textarea, select,
  checkbox, dialog, tabs, label) are generated with the shadcn CLI and then
  restyled to this document. shadcn supplies behaviour and accessibility —
  Radix focus management, `aria-*` wiring, keyboard handling — **not** the look.
  Its default radius, shadow, neutral palette and spacing are all replaced by
  the rules below. Never ship a shadcn component as it comes out of the CLI.
- Use `cn()` (`clsx` + `tailwind-merge`) for every class merge — the same helper
  shadcn generates.
- Variants via `cva` when a component has more than two.
- Never accept a `color` prop. Colour is decided by variant.
- Every interactive component needs hover, focus-visible, disabled and (where
  relevant) loading states.
- Focus is a 2px `ring` outline offset 2px, always visible, never removed.

### What shadcn provides, and what we override

shadcn is a **source distribution**, not a dependency: `npx shadcn@latest add button`
writes `src/components/ui/button.tsx` into the repo, and from then on it is our
file. We take the behaviour and throw away the appearance.

| shadcn primitive | Our component | Keep | Replace |
| --- | --- | --- | --- |
| `button` | `Button` | `cva` structure, `asChild`, `disabled` handling | every variant, every size, radius, shadow |
| `input` / `textarea` | `Input` / `Textarea` | `forwardRef`, `aria-invalid` passthrough | the box: border, radius, background, padding |
| `label` | `Field` label | `htmlFor` wiring, disabled styling | size, colour, `REQUIRED` marker |
| `select` | `Select` | Radix listbox, keyboard nav, `aria-*` | trigger styling, item rows, radius |
| `checkbox` | `Checkbox` | Radix state, `aria-checked` | shape (square), fill, icon |
| `dialog` | `Dialog` | Radix focus trap, `Esc`, scroll lock, portal | panel radius, shadow, backdrop blur, close button |
| `tabs` | `Tabs` | Radix roving tabindex, `aria-selected` | pill shape, active fill |
| `dropdown-menu` | `ProfileMenu` | Radix positioning, arrow keys, `aria-haspopup` | panel radius, shadow, row styling |
| `avatar` | `Avatar` | image-loading fallback | circle border, fallback colour |
| `skeleton` | `Skeleton` | — (visual only) | shimmer, radius |
| `sonner` | `Toaster` | toast queue, `toast()` API | every class, radius, shadow |
| — | `Chip`, `TypeDot`, `CountChip`, `CapacityMeter`, `EventCard`, `EventRow`, `EmptyState`, `Wordmark`, `DashboardShell` | — | built by hand, not shadcn |

Rules that follow from this:

1. **`components.json`** uses `"style": "new-york"`, `"baseColor": "neutral"`,
   `"cssVariables": true`, `"rsc": true`, and the `@/*` alias from `tsconfig.json`.
   Install only the primitives in the table — not the whole registry.
2. **Delete shadcn's generated token block** from `globals.css`. It writes oklch
   values, a `--radius` ramp and its own `--font-sans` that contradict
   Appendix A. Our tokens are the only colour, radius and font definitions in
   the file.
3. **Every `rounded-md`, `shadow-sm`, `border` and `bg-background` in a generated
   component is a starting point to be replaced**, never a final value. If a
   shadcn class reaches the finished component unchanged, re-read this section.
4. **Do not install a second component library.** No HeroUI, DaisyUI, MUI or
   Mantine. shadcn + Radix only.

### `src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### `Button` — `ui/button.tsx`

Generated with shadcn (`npx shadcn@latest add button`), then rewritten. Keep the
`cva` + `asChild` + `React.forwardRef` structure; replace **every** variant and
size, and delete the CLI's `rounded-md`, `shadow-xs`, `bg-primary` and
`h-9 px-4` grid. The finished file contains no `shadow-*` and no
`bg-primary`/`text-primary-foreground` class.

Two shapes only: solid rectangle (primary) and outlined pill (everything else).

```tsx
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold uppercase tracking-[0.04em]",
    "transition-colors duration-150 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:
          "rounded-md bg-foreground text-background hover:bg-brand hover:text-brand-foreground",
        secondary:
          "rounded-full border border-rule bg-transparent text-foreground hover:bg-foreground hover:text-background",
        ghost: "rounded-full text-foreground hover:bg-foreground/8",
        link: "h-auto! rounded-none px-0! text-foreground underline underline-offset-4 hover:text-brand-ink",
        destructive:
          "rounded-md bg-danger text-white hover:brightness-110",
      },
      size: {
        sm: "h-9 px-4 text-[11px]",
        md: "h-11 px-6 text-[12px]",
        lg: "h-13 px-7 text-[13px]",
        icon: "size-10 rounded-full border border-rule px-0",
      },
      block: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", size: "md", block: false },
  },
);
```

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `primary` `secondary` `ghost` `link` `destructive` | `primary` |
| `size` | `sm` 36px · `md` 44px · `lg` 52px · `icon` 40×40 | `md` |
| `block` | boolean | `false` |
| `loading` | spinner + disabled + `aria-busy` | `false` |

Usage: `primary` for the page's main action · `secondary` for card-level and
cancel actions · `ghost` for tertiary · `link` inline only · `destructive` for
delete, always behind a confirmation dialog. Icon-only buttons require
`aria-label`.

There is **no `accent` variant**. Orange is a hover state and a fill for chips,
never a second button colour.

### `Field`, `Input`, `Textarea`, `Select`, `Checkbox` — `ui/field.tsx`

`Input` and `Textarea` are generated with shadcn, then stripped of their box:
remove `border`, `rounded-md`, `bg-transparent`/`bg-input`, `shadow-xs`,
`h-9` and the ring replacement. `Select` and `Checkbox` are the shadcn Radix
primitives with the trigger and indicator restyled to the rules below. Radix
supplies the listbox, keyboard handling and `aria-*`; we supply every visible
pixel. `Field` is our own wrapper, so it is written with `FieldLabel` from the
shadcn `label` primitive (`htmlFor` wiring kept, styling replaced).

**Fields are underlines, not boxes.** This is the most distinctive part of the
form language and the easiest to get wrong.

```
NAME:            ┌──────────────────────────────────────────────┐
                 │ value or placeholder                         │
                 └──────────────────────────────────────────────┘
                  1px rule-soft underline, 2px brand on focus
```

- Row: `flex flex-col gap-1 border-b border-rule-soft pb-2` with
  `focus-within:border-brand`.
- Label: `t-label text-muted`, above the control. When a form is a definition
  list (settings, profile), the label sits left in a `8rem` column and the
  control right.
- Control: `w-full bg-transparent py-2 text-base text-foreground`, no border of
  its own, `placeholder:text-subtle`, `focus-visible:outline-none`.
- Invalid: `border-danger` on the row, message below in `t-micro text-danger`.
- `Textarea`: same underline, `min-h-28 resize-y`.
- `Select`: same underline, custom chevron at the right, `appearance-none`.
- `Checkbox`: 18px square, `border border-rule`, checked = `bg-foreground` with a
  `background`-coloured check. No radius, no pill.

`Field` renders the label, the control, then `error` **or** `hint` (error replaces
hint). Required fields are marked with a `t-label` `REQUIRED` after the label, not
an asterisk — a coloured asterisk is a template tell.

```tsx
<Field label="Event title" htmlFor="title" required
  hint="What a volunteer would search for."
  error={errors.title?.message}>
  <Input id="title" invalid={!!errors.title} {...register("title")} />
</Field>
```

One field per row on mobile; two-column rows (`grid gap-6 sm:grid-cols-2`) only
for paired facts such as date + time or capacity + type.

### `Chip`, `TypeDot`, `CountChip` — `ui/chip.tsx`

| Component | Shape | Classes |
| --- | --- | --- |
| `Chip` | pill, outline | `rounded-full border border-rule px-3 py-1 t-label text-foreground` |
| `Chip` selected | pill, solid | `rounded-full bg-foreground text-background px-3 py-1 t-label` |
| `CountChip` | pill, orange | `rounded-full bg-brand px-2.5 py-1 t-label text-brand-foreground` |
| `TypeDot` | dot + word | `size-1.5 bg-foreground` + `t-label text-muted` |

`TypeDot` replaces the old coloured taxonomy badges: the event type is a **word**
next to a small square, in one colour. Never colour-code Cleanup / Plantation /
Donation / Education — four hues is exactly the noise this system removes.

`CountChip` carries exactly one number: places left, places taken, or `FULL`.
Orange is the only fill colour a chip may use.

### `SectionHeading`, `Stat` — `ui/section-heading.tsx`

`SectionHeading` — no eyebrow, ever.

```
┌──────────────────────────────────────────────┬──────────────┐
│ UPCOMING EVENTS                              │  ALL EVENTS  │
│ One sentence of lead copy under the heading. │              │
└──────────────────────────────────────────────┴──────────────┘
   t-h2 caps                                    secondary pill
```

- Wrapper: `flex flex-col gap-6 md:flex-row md:items-end md:justify-between`.
- Title: `t-h2 text-balance`.
- Description: `t-lead mt-3 max-w-xl`.
- Action: right-aligned on desktop, `secondary` pill.
- A rule (`border-t border-rule`) sits above the heading when the section follows
  another section; the heading itself never has a label above it.

`Stat` — value `t-figure text-4xl md:text-5xl`, label `t-label text-muted mt-2`.
Sits in a strip divided by `border-l border-rule` between items. No icons.

### `Skeleton`, `EmptyState` — `ui/states.tsx`

`Skeleton` — `skeleton bg-foreground/8`, `aria-hidden`, square by default. Shape
it like the real content:

```tsx
<Skeleton className="aspect-[4/3] w-full" />   // card media
<Skeleton className="h-5 w-2/3" />              // title line
```

`EmptyState` — `border border-dashed border-rule px-6 py-16 text-center`, no
radius, no icon circle, no background tint. `t-h3` title, `t-small text-muted`
description (`max-w-sm mx-auto`), optional `secondary` action. Copy explains the
next step; it never apologises.

### `EventCard`, `EventRow` — `events/event-card.tsx`

The atomic unit of the product. Equal height **by construction**: fixed media
ratio, clamped title, footer pinned with `mt-auto`. Never wrap it in a
fixed-height container.

```
┌──────────────────────────────┐
│                              │  4/3 image, square corners, no radius
│                              │
├──────────────────────────────┤
│ ▪ PLANTATION        62/80    │  TypeDot left · CountChip right
│                              │
│ PLANT 200 SAPLINGS —         │  t-h4 caps, 2-line clamp, min-h
│ HATIRJHEEL                   │
│                              │
│ ──────────────────────────── │  1px rule-soft
│ HATIRJHEEL EAST BANK         │  t-micro muted, MapPin
│ SAT 21 NOV · 9:00 AM         │  t-micro muted, CalendarDays
├──────────────────────────────┤
│                    DETAILS ▸ │  secondary pill, right aligned
└──────────────────────────────┘
  1px border-rule, white, zero radius
```

- `article`: `group flex h-full flex-col border border-rule bg-surface`.
- Media: `relative aspect-[4/3] overflow-hidden`, `next/image fill` or `<img>`
  for user URLs. **No hover zoom.**
- Hover: the title link gains `underline underline-offset-4`; the border does not
  change colour and the card does not move.
- Body: `flex flex-1 flex-col gap-3 p-4`.
- Meta: `mt-auto border-t border-rule-soft pt-3`, two `t-micro text-muted` rows
  with 14px icons.
- Footer: `border-t border-rule-soft p-4 pt-3`, action right-aligned.

`EventRow` (dashboard lists) — `flex flex-col gap-4 border-b border-rule py-4
sm:flex-row sm:items-center`, 96×72 thumb, `TypeDot` + attendee count, truncated
`t-h4`, one `t-micro` line `WED 18 NOV · MIRPUR 10`, actions `secondary` `sm`.
Rows share the outer container's rules; each row does **not** get its own box.

### `ThemeToggle` — `theme-toggle.tsx`

Navbar only. Hydration-safe: both icons render and **CSS** decides visibility —
no `mounted` state, which React 19's lint rules reject.

```tsx
<Sun className="absolute size-4 transition-transform duration-200 dark:rotate-90 dark:scale-0 dark:opacity-0" />
<Moon className="absolute size-4 -rotate-90 scale-0 opacity-0 transition-transform duration-200 dark:rotate-0 dark:scale-100 dark:opacity-100" />
```

Wrapped in the `icon` button variant (circle, 1px rule). Label:
`aria-label="Toggle colour theme"`. `onClick` flips `resolvedTheme === "dark"`.

### `Avatar` — `ui/avatar.tsx`

Uses the shadcn `avatar` primitive (Radix `Avatar`) for load-failure fallback
timing; the CLI's rounded tile and grey fallback are replaced.

Sizes `sm` 28 · `md` 36 · `lg` 64. `Avatar` is a circle, `border border-rule`,
`object-cover`, `alt=""`. Fallback: initials from the first two words,
uppercase, `t-label`, on `bg-sand` with ink text (light) — never a stock face,
never a coloured gradient. `AvatarFallback` must keep the same size as the
image so the trigger does not jump while a photo loads.

### `Wordmark` — `layout/wordmark.tsx`

```tsx
<Link href="/" className="text-[20px] font-bold lowercase tracking-[-0.03em]">
  shomaj<span className="text-brand">shathi</span>
</Link>
```

One line, lowercase, no dot, no icon. Used identically in the navbar and the
footer; the footer version is `t-mega` scale and spans the width.

### `Navbar` — `layout/navbar.tsx`

```
<header className="sticky top-0 z-40 border-b border-rule bg-background">
  <div className="flex h-18 items-stretch">
```

- **Cells**, not floating links: each nav item is a `flex items-center px-6
  border-l border-rule h-full t-label`.
- Signed out, the last cell is **REGISTER** — `bg-brand text-brand-foreground`,
  full height, no radius. It is the only orange on the page.
- Signed in, the last cell holds `ProfileMenu`.
- `ThemeToggle` sits in its own cell before the auth cell.
- **Active link:** `bg-foreground text-background` on the whole cell. Inactive:
  `text-muted hover:text-foreground`.
- **Mobile (<768px):** wordmark + toggle + `Menu` icon cell. The menu opens as a
  `border-b border-rule bg-background` sheet below the header; rows are
  `border-t border-rule px-5 py-4 t-label`, and the auth row is the orange cell
  at full width.
- **Scrolled:** nothing changes. No shadow, no blur, no shrink.

### `ProfileMenu` — `layout/profile-menu.tsx`

Built on the shadcn `dropdown-menu` primitive (Radix `DropdownMenu`). The display
name appears on **hover**; the menu opens on **click**. Two affordances, one
trigger.

- Trigger: `DropdownMenuTrigger asChild` wrapping a `button` with
  `Avatar size="md"`, `aria-label="Account menu"`. Radix supplies
  `aria-haspopup="menu"` and `aria-expanded`; do not hand-write them.
- Hover label: `t-label` on a `bg-foreground text-background` rectangle
  (no radius), `absolute right-0 top-full mt-2 px-2 py-1`, shown on hover and
  `:focus-visible`. Hidden below `md`; the menu shows the name instead.
- Panel: `DropdownMenuContent` with `w-60 border border-rule bg-surface` —
  **delete shadcn's `rounded-md`, `shadow-md` and default animation scale. No
  shadow, no radius.**
- Rows `DropdownMenuItem`: `flex items-center gap-2.5 px-4 py-3 t-label
  hover:bg-foreground hover:text-background`, icons 16px. Remove the primitive's
  `rounded-sm`, `focus:bg-accent` and any `data-[highlighted]` background that
  is not `bg-foreground`.
- Order: Create event · Manage events · Joined events · Profile · `DropdownMenuSeparator`
  (`border-t border-rule`, no fill) · Sign out (`text-danger`).
- Closes on outside click, `Esc`, or selection; focus returns to the trigger —
  all Radix behaviour, leave it alone.

### `Footer` — `layout/footer.tsx`

```
┌──────────────────────────────────────────────────────────────┐
│ EXPLORE        COMMUNITY       CONTACT                       │  t-label headings
│ Upcoming       Create event    hello@shomajshathi.org        │  t-small rows
│ Gallery        Joined events   Dhaka, Bangladesh             │
│ About          Your events     X ↗                           │
├──────────────────────────────────────────────────────────────┤
│  shomajshathi                                                │  t-mega, two-tone
├──────────────────────────────────────────────────────────────┤
│ PRIVACY & POLICY   TERMS   CONTACT US      SHOMAJ SHATHI © 2026│ t-label, muted
└──────────────────────────────────────────────────────────────┘
```

- Four columns on desktop, stacked with rules on mobile.
- Column headings are `t-label text-muted`; links are `t-small hover:underline`.
- The wordmark line is `t-mega`, `shomaj` ink + `shathi` brand, clipped to the
  container width on small screens (`text-[clamp(2.5rem,12vw,9rem)]`).
- Bottom bar: `flex flex-col gap-3 border-t border-rule py-5 sm:flex-row
  sm:justify-between`, `t-label text-muted`.
- Use the current **X** mark, not the legacy Twitter bird; every icon link needs
  `aria-label`.

### `Dialog` — `ui/dialog.tsx`

Built on the shadcn `dialog` primitive (Radix `Dialog`). We keep Radix's focus
trap, `Esc` handling, scroll lock and portal; we replace the panel styling
completely — shadcn ships `rounded-lg`, `shadow-lg` and a centred grid, none of
which survive.

- `DialogContent`: `w-[calc(100%-2rem)] max-w-lg border border-rule bg-surface
  p-8` — delete every `rounded-*` and `shadow-*` class the CLI generated.
  **No radius, no shadow.**
- `DialogOverlay`: `bg-foreground/60 backdrop-blur-none`. No blur.
- Title uses `DialogTitle` (`t-h3` — Radix requires one for `aria-labelledby`);
  description `DialogDescription` (`t-small text-muted mt-3`); actions
  `mt-8 flex justify-end gap-2`.
- Close: a 40px circle with a 1px rule, top-right, `aria-label="Close"` —
  override shadcn's default `X` button position and remove its hover fill.
- Destructive confirm right (`destructive`), cancel left (`secondary`). `Esc`
  cancels; focus returns to the trigger (Radix does this; do not re-implement).
- `Dialog` is controlled where the app needs it (`open` / `onOpenChange`) so the
  delete flow can close on success. Never mount `<DialogContent>` outside a
  `Dialog`. Do not add a second dialog library on top.

### `Tabs` — `ui/tabs.tsx`

Uses the shadcn `tabs` primitive (Radix `Tabs`) for roving tabindex and
`aria-selected`; the trigger is restyled into a pill. shadcn's underline
`TabsList` and rounded `TabsTrigger` are both replaced.

Pills, matching the sidebar nav — not underlines.

- `TabsList`: `flex flex-wrap gap-2 bg-transparent p-0`. No bottom border.
- Tab: `rounded-full border border-rule px-4 py-2 t-label text-muted
  hover:text-foreground`; `data-[state=active]:bg-foreground
  data-[state=active]:text-background`.
- Optional count: `ml-2 text-[10px] tabular-nums opacity-70`.
- Never a card, never a tab strip with a bottom border.

### `Pagination` — `ui/pagination.tsx`

`secondary` sm pills **PREVIOUS** / **NEXT** + `t-label text-muted` `PAGE 2 / 5`
between them. Disabled at the ends. Never infinite scroll on a public list.

### `CapacityMeter` — `events/capacity-meter.tsx`

```tsx
<CapacityMeter joined={42} capacity={60} />
```

Track `h-2 w-full bg-foreground/10`, fill `bg-foreground` — **square ends, no
pill**. At ≥90% the fill becomes `bg-brand`; when full, `bg-danger`. Label row:
`t-label text-muted` left `42 OF 60 PLACES`, right `18 LEFT` in `text-brand-ink`
(only when ≤10). Full: right label **FULL** in `text-danger`.
The number is always visible — colour never carries meaning alone.

### `SocialButton` — `auth/social-button.tsx`

`secondary` pill, full width, 48px, provider mark 18px, label **CONTINUE WITH
GOOGLE**. Sits **above** the email form, followed by a divider
(`flex items-center gap-4`, two `h-px flex-1 bg-rule-soft`, `t-label text-subtle`
**OR**). Loading disables the button and swaps the mark for a spinner.

### `InlineAlert` — `ui/inline-alert.tsx`

`border border-rule bg-surface px-4 py-3 t-small` with a **4px left bar**:
`border-l-4 border-l-danger` for errors, `border-l-brand` for success, no bar for
info. No radius, no tinted fill except `bg-danger-soft` on the error variant.
Form-level only; field-level errors stay in `Field`.

### `NewsletterForm` — `home/newsletter-form.tsx`

Underline input + `primary` button, `flex flex-col gap-3 sm:flex-row`. **Design
only** — no backend. On submit:
`toast.success("You're on the list", { description: "One email a month, no more." })`
and clear. Never claim a subscription that is not stored.

### `GalleryGrid` — `home/gallery-grid.tsx`

`grid grid-cols-2 gap-2 md:grid-cols-4`, every tile square, no radius. Nothing
special-cases the first image — an asymmetric mosaic is a magazine mannerism, and
this grid is a contact sheet. Caption below each tile: `t-label text-muted`.
Static only, no lightbox in v1.

### `DashboardShell` — `layout/dashboard-shell.tsx`

Wraps the sidebar + content described in §6. Props: `user` (name, email, image),
`nav` (items with href, label, icon, active), `children`. Renders `<aside>` inside
`<div className="shell">` and the page body in the right column.

- Sidebar: `hidden lg:flex lg:flex-col lg:w-[17.5rem] bg-sand border-r border-rule
  p-6 sticky top-18 h-[calc(100svh-4.5rem)]`.
- Name: `t-h3 uppercase` split across two lines, then `t-label text-muted` email.
- Nav pills: `rounded-full border border-rule px-4 py-3 t-label`, active
  `bg-foreground text-background border-foreground`.
- Log out pinned with `mt-auto border-t border-rule-sand pt-4`.
- Mobile: the same pills render horizontally under the navbar (`lg:hidden`).

### `Toaster` — `providers.tsx`

`next-themes` with `attribute="class"`, `defaultTheme="light"`,
`enableSystem`, `disableTransitionOnChange`. Sonner bottom-right, close button,
toasts styled: `!rounded-none !border !border-rule !bg-surface !text-foreground
!font-sans`; title `!text-[13px] !font-bold !uppercase !tracking-[0.04em]`;
description `!text-[13px] !text-muted`; success icon `!text-brand`; error icon
`!text-danger`. No shadow.

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

`formatDateParts` returns `{ day, month, weekday, short, full, time }` using
`en-GB` and `Asia/Dhaka`. **Never** call `toLocaleDateString()` inline — server
and client produce different strings and React hydration fails.

### Component build order

| # | Component | Phase | Needed by |
| --- | --- | --- | --- |
| 1 | `Button` | P0 | everything |
| 2 | `Field` + controls | P0 | forms |
| 3 | `Chip`, `TypeDot`, `CountChip` | P0 | cards, filters |
| 4 | `SectionHeading`, `Stat` | P0 | every section |
| 5 | `Skeleton`, `EmptyState` | P0 | loading, empty |
| 6 | `ThemeToggle`, `Providers` | P0 | all pages |
| 7 | `EventCard`, `EventRow` | P0 | lists |
| 8 | `Avatar`, `Wordmark`, `Navbar`, `Footer` | P1 | chrome |
| 9 | `Dialog`, `Tabs`, `Pagination`, `InlineAlert` | P1 | manage, forms |
| 10 | `GalleryGrid`, `NewsletterForm`, `CapacityMeter` | P1 | home, detail |
| 11 | `SocialButton`, `ProfileMenu` | P2 | auth |
| 12 | `DashboardShell` | P2 | signed-in pages |
| 13 | `Styleguide` page | P0/P1 | proof |

`P0`/`P1`/`P2` are the build phases in `PRD.md` §9. The mapping is a convenience —
the binding rule is the order in this table.

---

## 8. Page compositions

A page is assembled from the components in §7 — never from fresh markup. Each
entry below fixes the order, the spacing and the states. Nothing here names a
URL: where a page lives is the product's business, not the design's.

Every public page shares the skeleton in §6: sticky header, `<main>`, footer,
sections on `py-16 md:py-24`.

### 8.1 Home

1. **Hero** — no photograph. `bg-background`, `.shell`, `pt-16 pb-10 md:pt-24
   md:pb-14`.
   - `h1.t-mega` on two or three lines: **SHOW UP.** then a second line that
     names the work.
   - `border-t border-rule` under the heading, `mt-8`, with the tagline
     `t-h3` on one line and a short `t-lead` (`max-w-lg`) beside it on desktop.
   - Actions: `primary` **BROWSE EVENTS** + `secondary` **CREATE AN EVENT**.
   - Hero copy is a statement, not a slogan. No eyebrow, no badge, no arrow.
2. **Categories band** — full-bleed `bg-sun`, `py-10 md:py-16`.
   - `t-h2` **CATEGORIES** at the top left, `text-sun-foreground`.
   - Filter row: `Chip` per type plus **ALL**, wrapping on mobile. Unselected
     chips are `border-sun-foreground` + `text-sun-foreground`; the selected
     chip inverts to `bg-sun-foreground text-sun`. Never use `foreground` or
     `background` here — those invert with the theme and the black-on-yellow
     relationship has to survive dark mode.
   - Exactly six `EventCard`s in `grid gap-6 sm:grid-cols-2 xl:grid-cols-3`.
   - The band is the only yellow on the page. Cards are white with a black rule,
     so they read as pasted onto the poster.
3. **How it works** — three columns divided by `border-l border-rule`
   (`pl-6`), each opening with `t-label` **01 / 02 / 03**, then `t-h4`, then
   `t-small text-muted`. Icons are optional and, if used, are 20px ink strokes —
   no tinted icon squares.
4. **Gallery** — `SectionHeading` + `GalleryGrid`, five photos, captions in
   `t-label`.
5. **Newsletter** — full-width `border-y border-rule` band, `py-12`. Heading
   `t-h3` left, form right on desktop. No tinted panel, no radius.
6. **Footer**.

### 8.2 Event list

- Page header: `t-display` title, one `t-lead` sentence, `border-b border-rule`
  immediately under it.
- Filter bar `py-4 border-b border-rule`: search `Input` (underline, `max-w-xs`),
  `Select` type, `Select` sort. Same row on desktop, stacked and full width on
  mobile.
- Result count `t-label text-muted`: `24 EVENTS`.
- Grid of `EventCard`s, `grid gap-6 sm:grid-cols-2 xl:grid-cols-3`.
- Loading = six skeletons shaped like cards. No results = `EmptyState` with a
  **CLEAR FILTERS** secondary pill.
- `Pagination` under the grid, `mt-10`.

### 8.3 Event detail

Two columns from `lg`: content `min-w-0 flex-1`, panel `w-80 shrink-0` sticky at
`top-24`.

**Content**

1. Back link — `t-label` with `ArrowLeft`, hover underline.
2. `h1.t-display` and, directly under it, a `border-b border-rule`.
3. A two-column block: **left** the facts as a definition list, **right** the
   image.
   - Facts: `LOCATION:` / `DATE:` / `TIME:` / `PLACES:` in `t-label text-muted`,
     values in `t-body` on the next line, each pair separated by 24px.
   - Image: `aspect-[3/2]`, no radius, no caption.
4. Description — `t-body max-w-xl`.
5. **What to bring** — `t-h4` heading, then a two-column list of 3–5 items with a
   14px check mark in `text-foreground`. No panel, no tint.
6. **Organiser** — avatar, name in `t-h4`, `t-micro` line, separated by a rule.

**Join panel** — `border border-rule bg-surface p-5 space-y-4`, sticky, square.
Five visual states, one per situation:

| State | Panel |
| --- | --- |
| Available | `CapacityMeter`, spots left (`t-h3` when ≤10, otherwise `t-small text-muted`), `primary block size="lg"` **JOIN THIS EVENT** |
| Joined | `secondary block` **YOU'RE GOING** + `Check`, `ghost` **LEAVE EVENT** below |
| Full | `primary` disabled, label **EVENT FULL**, `CountChip` **FULL** |
| Past | join control hidden, `Chip` **PAST EVENT**, attendance summary in its place |
| Signed out | `primary` **LOG IN TO JOIN** — same position, same weight |

Below any state: `secondary` **ADD TO CALENDAR**, `ghost` **SHARE**. Icon 16px,
`justify-start`, gap 2.

### 8.4 Sign in / Sign up

No split photo panel. The auth pages are the plainest pages in the product:
white, one huge caps title, underline fields, one black button.

- `.shell`, `max-w-2xl`, `py-16 md:py-24`, left aligned.
- `h1.t-display` — **LOG IN** / **REGISTER**.
- `border-b border-rule` under the title.
- `SocialButton` + **OR** divider.
- Fields, one per row, underline style:
  - Register: full name, email, photo URL, password, confirm password.
  - Log in: email, password.
  - Password row has a `SHOW` pill on the right that toggles visibility.
- `Checkbox` — *I accept the community guidelines* (register) / *Keep me signed
  in* (login).
- `primary block size="lg"` — **LOG IN** / **CREATE ACCOUNT**, with `loading`.
- `link` — *New here? Create an account.* / *Already have one? Log in.*
- Form-level error: `InlineAlert` above the fields.
- Password message: *Use at least 6 characters with one uppercase and one
  lowercase letter.*
- An error never reveals whether an email exists.

A three-point asterisk mark (24px, ink, 1px strokes) sits bottom-right of the
form column, `aria-hidden`. It is the only decoration on the page.

Both pages must look like the same document: same width, same field rhythm, same
button size. Only the labels and field count change.

### 8.5 Event editor (create / edit)

Single column `max-w-3xl` inside the dashboard shell, groups separated by
`border-t border-rule pt-8` with a `t-label text-muted` group title.

1. **THE EVENT** — title, type, date, time, location, capacity.
2. **THE DETAILS** — description, what to bring.
3. **THE IMAGE** — URL field + live `4/3` preview. Invalid URL → field error +
   `bg-foreground/8` placeholder, never a broken image icon.
4. **PUBLISH** — `Checkbox` confirming the event is free and open to anyone.

Action bar `sticky bottom-0 bg-background border-t border-rule py-4`: `primary`
**PUBLISH EVENT**, `secondary` **CANCEL**.

Edit mode changes three things only: the heading (**EDIT EVENT**), the primary
label (**SAVE CHANGES**), and a `destructive` **DELETE** at the far right, behind
the confirm dialog.

Error copy is a sentence with a remedy (see §10). The rules behind it — future
date, capacity 1–1000, title 6–90, description 20–2000 — belong to `PRD.md`;
the *placement* and *wording style* are this document's.

### 8.6 Owner's event list

Uses `DashboardShell`.

- Page header row: `t-display` **YOUR EVENTS**, `primary` **CREATE EVENT** on the
  same baseline, `border-b border-rule` under both.
- Summary strip: three `Stat`s in a `grid grid-cols-3 divide-x divide-rule
  border-b border-rule` — published, past, total attendees.
- `Tabs`: All · Published · Past.
- `EventRow` list inside `border-t border-rule`; each row divided by
  `border-b border-rule`. No per-row boxes.
- Row actions: **VIEW** and **EDIT** (`secondary` `sm`), plus a `ghost` icon
  button with `aria-label` for delete.
- Delete dialog names the event and how many people joined. Never a browser
  confirm.
- Empty: *No events yet* / *Create your first cleanup or plantation drive and it
  will show up here.* / **CREATE EVENT**.

### 8.7 Personal record

Uses `DashboardShell`.

- `t-display` **JOINED EVENTS** + `border-b border-rule`.
- Four `Stat`s in a ruled strip: events joined, hours volunteered, types covered,
  member since. Hours are counted from attendance, never estimated.
- `EventRow` list, each with `Chip` **ATTENDED** or **UPCOMING**, ordered by
  event date ascending.
- Empty: *No events joined yet* / *Pick a cleanup and it lands here with your
  volunteer hours.* / **BROWSE EVENTS**.

### 8.8 Account settings

Uses `DashboardShell`.

- `t-display` **PROFILE** + `border-b border-rule`.
- Definition-list fields, label left in `t-label text-muted` (`w-40`), control
  right: full name, email (read-only, `text-muted`, no underline change on
  focus), password (`SHOW` pill), photo URL.
- `primary` **SAVE CHANGES**.
- `t-micro text-muted` note: *Your email is used to sign in and cannot be changed
  here.*

### 8.9 Not found

`EmptyState` centred in `min-h-[60svh]` — *This page isn't here* / *The event may
have ended, or the link is wrong.* / **BACK TO EVENTS**.

### 8.10 Styleguide

The styleguide is a page in the build, not a scrapbook: it renders every
component in both themes and is the reference the other pages are checked
against.

- Sticky top bar with the page title; left rail of section links on desktop.
- Ten sections: Colour · Typography · Rules & shape · Buttons · Forms ·
  Chips & metadata · Event card · Dashboard shell · Feedback · Composition.
- Colour and type sections are side-by-side `theme-light` / `theme-dark` islands
  so contrast can be read at a glance, with the measured ratio printed next to
  each pair.
- Every component appears in its real states: default, hover, focus, disabled,
  loading, error, empty.
- Composition shows one real page fragment assembled from components — never a
  lorem-filled mock.

If a component is not on this page, it does not exist yet.

---

## 9. States and feedback

| State | Rule |
| --- | --- |
| **Loading** | Skeleton shaped like the real content, square, 1.6s shimmer. No full-page spinner after first paint. |
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

Formatting: `SAT 21 NOV · 9:00 AM`, `Mirpur 10 Roundabout, Dhaka`, `Asia/Dhaka`,
`en-GB`. Currency BDT.

Button labels are short verbs in caps: **JOIN THIS EVENT**, **PUBLISH EVENT**,
**SAVE CHANGES**, **BROWSE EVENTS** — not **SUBMIT** or **CLICK HERE**.

Headings are noun phrases, not sentences with a full stop. The one exception is
the home hero, which is a statement and may use a period.

---

## 11. Accessibility

- Body text ≥ 4.5:1, large text ≥ 3:1. The palette passes; keep it that way by
  using tokens — particularly the black-on-orange rule.
- Visible `:focus-visible` outline (2px, 2px offset, `ring`) on everything.
  Never `outline-none` without a replacement.
- Minimum 44×44 touch target for primary actions. The 40px icon buttons sit
  inside 44px hit areas.
- Underline fields keep their label **above** the control, not inside it — a
  placeholder is never the only label.
- Errors: `aria-invalid` on the control, message adjacent in the DOM.
- Icon-only buttons need `aria-label`; decorative icons `aria-hidden`.
- One `<main>` per page, `<nav>` for navigation, `<footer>` for the footer.
- Dialogs trap focus, close on `Esc`, restore focus.
- Uppercase display type is decorative — the DOM text stays sentence case where
  the source is sentence case. `text-transform` does the shouting.
- `prefers-reduced-motion` disables shimmer and smooth scroll (already in
  Appendix A).
- Keyboard order follows visual order.

---

## 12. Rules for agents

1. **Never hardcode colour, radius or font size.** Tokens or role classes only.
2. **Never invent a pattern when a component exists.** Import it.
3. **Every section heading uses `SectionHeading`.** No hand-written `<h2>`, and
   **no eyebrow above any heading**.
4. **Every form control uses `Field` + `Input`/`Textarea`/`Select`**, with the
   underline treatment — not a bordered box.
5. **No shadows.** Anywhere. Separation is a 1px rule or a colour block.
6. **Square by default.** Only the primary button is 8px; only controls are pills.
7. **One orange fill per view** (chip, active nav cell, or hover — not several at
   once). Never white text on orange.
8. **Check both themes.** Broken dark mode means a literal colour.
9. **No lorem ipsum. No `window.alert`.** Toasts via `sonner`.
10. **Dates through `formatDateParts`.** Never inline locale formatting.
11. **Images sit in a sized, `overflow-hidden`, square parent.** No filter, no
    overlay.
12. **Every new component appears on the styleguide page in the same commit.**
13. **You do not commit.** Stop after each commit row in `PRD.md` §9.5, hand the
    human the exact message and commands, and wait for `continue`.
14. **Read `node_modules/next/dist/docs/` before Next-specific code.** This is
    Next 16; `cookies()` and `headers()` are async, and caching defaults differ.
15. **UI primitives come from shadcn, never from a second library.** Generate
    with `npx shadcn@latest add <name>`, then replace every visual class per §7.
    A shadcn class left untouched is an unfinished component. Do not `add --all`,
    do not keep the token block it writes into `globals.css`, and do not install
    HeroUI, DaisyUI, MUI or Mantine.

| Don't | Do |
| --- | --- |
| `bg-[#EE6C1C]` | `bg-brand` |
| `text-[32px] font-bold` | `className="t-h2"` |
| `rounded-2xl shadow-lg border` | `border border-rule` |
| shadcn's default `<Button>` | `Button` restyled per §7 |
| a second component library | shadcn + Radix only |
| `shadow-md` from a shadcn file | delete it; use `border-rule` |
| shadcn's `--radius` / oklch tokens in `globals.css` | Appendix A only |
| `<div className="text-4xl">` as heading | `<SectionHeading title="…" />` |
| `<p class="t-label">Upcoming</p><h2>` | `<SectionHeading title="Upcoming events" />` |
| `<input className="border p-2" />` | `<Field><Input /></Field>` |
| `bg-brand text-white` | `bg-brand text-brand-foreground` |
| `alert("Saved")` | `toast.success("Event created", …)` |
| `<img>` for local art | `next/image` with `fill` + `sizes` |
| `<img>` for user URLs via `next/image` | plain `<img>` + lazy |
| A second accent colour | One accent, black text |
| Four coloured type badges | One `TypeDot` |
| `min-h-[400px]` to align cards | Let `mt-auto` do it |

---

## 13. Definition of done

A page is finished when:

- [ ] It is composed from existing components, not new one-off markup.
- [ ] No hardcoded hex, px font size or radius appears in it.
- [ ] It renders correctly in **both** themes.
- [ ] It works at **390 / 768 / 1280** with no horizontal scroll.
- [ ] Loading has skeletons, empty has an `EmptyState`, errors are inline.
- [ ] All headings use `SectionHeading` or a documented role class, with no
      eyebrow above any of them.
- [ ] One primary button; one orange fill.
- [ ] No shadow anywhere on the page.
- [ ] Copy is real, specific and local.
- [ ] Tab order is sensible and focus is visible.
- [ ] Figures use `t-figure`; prose does not.
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
   Shomaj Shathi — tokens

   Light = printed poster: white stock, black rules, one orange.
   Dark  = same poster printed in reverse: black stock, light rules.

   Three chromatic roles, no more:
     brand  · the only accent. Fills carry BLACK text (never white).
     sun    · the single yellow band on the home page.
     sand   · the dashboard sidebar, and nothing else.
   ========================================================================== */

:root,
.theme-light {
  --background: #ffffff;
  --surface: #ffffff;
  --sand: #eadfc9;
  --sun: #f5ee45;
  --sun-foreground: #0b0b0b;

  --foreground: #0b0b0b;
  --muted: #5c5c5c;
  --subtle: #767676;

  --rule: #0b0b0b;
  --rule-soft: #bdbdbd;
  --rule-sand: #cdbd9c;

  --brand: #ee6c1c;
  --brand-hover: #d95f14;
  --brand-ink: #b8540e;
  --brand-foreground: #0b0b0b;

  --danger: #b3261e;
  --danger-soft: #fbe9e7;

  --ring: #0b0b0b;
}

.dark,
.theme-dark {
  --background: #0b0b0b;
  --surface: #121212;
  --sand: #241f16;
  --sun: #e9df3c;
  --sun-foreground: #0b0b0b;

  --foreground: #f2f0e9;
  --muted: #a8a8a8;
  --subtle: #8c8c8c;

  --rule: #333333;
  --rule-soft: #3d3d3d;
  --rule-sand: #3a3222;

  --brand: #ff7a2f;
  --brand-hover: #ff8f4d;
  --brand-ink: #ff8a45;
  --brand-foreground: #0b0b0b;

  --danger: #ff8a7a;
  --danger-soft: #2a1512;

  --ring: #f2f0e9;
}

@theme inline {
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-sand: var(--sand);
  --color-sun: var(--sun);
  --color-sun-foreground: var(--sun-foreground);

  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-subtle: var(--subtle);

  --color-rule: var(--rule);
  --color-rule-soft: var(--rule-soft);
  --color-rule-sand: var(--rule-sand);

  --color-brand: var(--brand);
  --color-brand-hover: var(--brand-hover);
  --color-brand-ink: var(--brand-ink);
  --color-brand-foreground: var(--brand-foreground);

  --color-danger: var(--danger);
  --color-danger-soft: var(--danger-soft);

  --color-ring: var(--ring);

  /* One family. Archivo Black display, Archivo for everything else.
     No mono: figures are Archivo with tabular numerals. */
  --font-sans: var(--font-archivo), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-archivo-black), var(--font-archivo), ui-sans-serif,
    system-ui, sans-serif;
  --font-mono: var(--font-archivo), ui-sans-serif, system-ui, sans-serif;

  /* Square, action, pill. Nothing else. */
  --radius-xs: 0px;
  --radius-sm: 0px;
  --radius-md: 8px;
  --radius-lg: 8px;
  --radius-xl: 0px;
  --radius-full: 9999px;
}

/* ==========================================================================
   Base
   ========================================================================== */

@layer base {
  * {
    border-color: var(--rule);
  }

  html {
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
    scroll-padding-top: 5.5rem;
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: var(--font-archivo), ui-sans-serif, system-ui, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  ::selection {
    background-color: var(--foreground);
    color: var(--background);
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

  input::placeholder,
  textarea::placeholder {
    color: var(--subtle);
    opacity: 1;
  }
}

/* ==========================================================================
   Type roles — the only type styles pages are allowed to use
   ========================================================================== */

@layer components {
  .t-mega {
    font-family: var(--font-display);
    font-size: clamp(3rem, 10.5vw, 9rem);
    line-height: 0.84;
    letter-spacing: -0.045em;
    font-weight: 400;
    text-transform: uppercase;
  }

  .t-display {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    line-height: 0.88;
    letter-spacing: -0.04em;
    font-weight: 400;
    text-transform: uppercase;
  }

  .t-h2 {
    font-family: var(--font-display);
    font-size: clamp(1.875rem, 3.2vw, 2.75rem);
    line-height: 0.92;
    letter-spacing: -0.035em;
    font-weight: 400;
    text-transform: uppercase;
  }

  .t-h3 {
    font-family: var(--font-sans);
    font-size: clamp(1.25rem, 1.6vw, 1.5rem);
    line-height: 1.12;
    letter-spacing: -0.02em;
    font-weight: 700;
    text-transform: uppercase;
  }

  .t-h4 {
    font-family: var(--font-sans);
    font-size: 1.0625rem;
    line-height: 1.3;
    letter-spacing: -0.01em;
    font-weight: 700;
    text-transform: uppercase;
  }

  .t-lead {
    font-size: clamp(1.0625rem, 0.95rem + 0.35vw, 1.25rem);
    line-height: 1.5;
    letter-spacing: -0.01em;
    color: var(--muted);
  }

  .t-body {
    font-size: 1rem;
    line-height: 1.65;
  }

  .t-small {
    font-size: 0.875rem;
    line-height: 1.55;
  }

  .t-micro {
    font-size: 0.75rem;
    line-height: 1.45;
  }

  /* Real labels only: fields, table heads, nav, chips. Never decoration
     above a heading. */
  .t-label {
    font-family: var(--font-sans);
    font-size: 0.6875rem;
    line-height: 1.2;
    letter-spacing: 0.08em;
    font-weight: 700;
    text-transform: uppercase;
  }

  /* Numbers that must line up. */
  .t-figure {
    font-family: var(--font-sans);
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum" 1;
    letter-spacing: -0.02em;
    font-weight: 700;
  }

  /* Editorial container. */
  .shell {
    width: 100%;
    max-width: 80rem;
    margin-inline: auto;
    padding-inline: 1.25rem;
  }

  @media (min-width: 768px) {
    .shell {
      padding-inline: 2rem;
    }
  }

  @media (min-width: 1280px) {
    .shell {
      padding-inline: 2.5rem;
    }
  }

  /* ==========================================================================
     Skeleton
     ========================================================================== */

  .skeleton {
    position: relative;
    overflow: hidden;
    background-color: color-mix(in srgb, var(--foreground) 8%, transparent);
  }

  .skeleton::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      color-mix(in srgb, var(--foreground) 7%, transparent) 50%,
      transparent 100%
    );
    animation: shimmer 1.6s ease-in-out infinite;
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
}

/* Sonner sits above everything */
[data-sonner-toaster] {
  z-index: 100 !important;
}
```

---

## Appendix B — Imagery

Photography is the only soft element in an otherwise hard-edged page, which is
why it needs **no** treatment: no filter, no grain, no tint, no overlay. One
consistent crop is the art direction.

### What to use

- Real, local, documentary: drives, streets, volunteers, hands, weather.
- Human-scale. People doing the thing, not posing with a logo.
- Daylight, slightly flat. Square corners are the frame.
- Never western stock, never a smiling handshake, never a 3D illustration.

### How to place it

| Slot | Ratio | Crop intent |
| --- | --- | --- |
| Card thumbnail | `4/3` | Subject left or right of centre — never dead centre |
| Detail image | `3/2` | Environmental, sits in the right column of the facts block |
| Gallery tile | `1/1` | Contact-sheet grid, four across on desktop |
| Auth | — | No image on auth pages |

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
**client repo root**, in this order:

```bash
# 1. shadcn CLI + its peer utilities. Init writes components.json and its own
#    token block — delete the tokens, keep the config.
npx shadcn@latest init
npm i class-variance-authority tailwind-merge clsx

# 2. Only the primitives this document uses. Do NOT `add --all`.
npx shadcn@latest add button input textarea select checkbox label dialog tabs dropdown-menu avatar skeleton sonner

# 3. interface and theming
npm i next-themes sonner lucide-react

# 4. forms (see §7 Field)
npm i react-hook-form zod @hookform/resolvers

npm i -D @types/node
```

`shadcn init` pulls in `radix-ui` primitives and `class-variance-authority`
itself; the explicit `npm i` above is a safety net for a re-cloned repo. After
`init`, open `globals.css` and **delete the `:root` / `.dark` block it appends**
— Appendix A is the only token source. Then delete `--radius` ramp, `tw-animate-css`
usage and the `@theme inline` colour mappings shadcn emits, keeping only the
`@import "tailwindcss"` and `@custom-variant dark` lines if they match ours.

Authentication, data and server libraries are deliberately absent: they are
product decisions, listed in `PRD.md` §5. Nothing in this document depends on
them.

### What `components.json` should contain

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

`tailwind.config` is empty on purpose — Tailwind v4 reads tokens from
`globals.css`, which is exactly where Appendix A puts them.

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
import { Archivo, Archivo_Black } from "next/font/google";
import { Providers } from "@/components/providers";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${site.name} — Community work, organised`, template: `%s · ${site.name}` },
  description: site.description,
};
```

`Providers` wraps `next-themes` + Sonner (see §7 `Toaster`).

### `src/lib/site.ts`

```ts
export const site = {
  name: "Shomaj Shathi",
  wordmark: { first: "shomaj", second: "shathi" },
  tagline: "Neighbourhood service, organised.",
  description:
    "Plan a cleanup, plant two hundred saplings, or collect winter clothes — then find the people who will show up with you.",
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

---

## Appendix D — Reading of the reference

The proportions in this document were derived from a 1500px-wide event website
kit, measured rather than eyeballed. The numbers that matter:

| Measure | Value |
| --- | --- |
| Nav strip height | 72px, divided into 5–6 cells, 1px rules |
| Nav cell padding | 24px inline, labels 11px caps, 0.08em |
| Dashboard sidebar | 265–280px, sand, 1px right rule |
| Primary button | 8px radius, 48–52px tall, 13px caps |
| Pill control | 36–40px tall, 1px rule, 11px caps |
| Card | square, 1px rule, image ~55% of the card height |
| Footer wordmark | ~200px, two-tone, one line |
| Yellow band | full-bleed, ~1000px tall on the home page |

Scale is the point. If a heading feels too big, it is probably still too small.
