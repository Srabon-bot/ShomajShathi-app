# Shomaj Shathi — client

The Next.js 16 front end for **Shomaj Shathi**, a social-development events
platform. People publish cleanups, plantation drives, clothes runs and reading
circles; volunteers find one nearby and join in a click.

- **Live site:** _add the Vercel URL here after the first deploy_
- **API:** _add the Render URL here after the first deploy_
- **Design system:** [`DESIGN.md`](./DESIGN.md)
- **Product spec:** [`PRD.md`](./PRD.md)

This folder currently runs on fixtures (`src/lib/mock-data.ts`) so the whole
interface can be reviewed before the API lands. Every shape matches the type
the server will return, so wiring it up is an import swap.

## Features

- **Poster interface** — Archivo Black display type, 1px black rules, one
  orange accent, no shadows, light and dark themes over the same tokens.
- **Event browse and filter** — search by name or place, filter by the four
  work types, sort by soonest or most attended, paginated six at a time.
- **Event detail with join panel** — live capacity meter, join/leave with
  optimistic counts and a toast, add-to-calendar and copy-link actions.
- **Create and edit events** — one form for both modes, grouped into event /
  details / image / publish, with date limits, capacity bounds and a
  destructive-action dialog.
- **Your events and joined events** — dashboard shell with a sand sidebar,
  published/past tabs, attendee totals and per-row actions.
- **Auth pages** — email + password with show/hide, Google and GitHub entry
  points, live password rules, and readable field-level errors.
- **Profile** — name, photo URL and password rows; initials fall back
  automatically when a photo is missing or fails to load.
- **Accessible by construction** — shadcn/ui (Radix) primitives for dialogs,
  tabs, menus and avatars; visible focus rings, labelled fields, and
  contrast-checked colour pairs.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, Cache Components) |
| Language | TypeScript, strict |
| Styling | Tailwind CSS 4 with tokens from `DESIGN.md` |
| Primitives | shadcn/ui on Radix — restyled to the poster system |
| Forms | `react-hook-form` + `zod` |
| Feedback | `sonner` toasts |
| Icons | `lucide-react` |
| Fonts | Archivo Black + Archivo via `next/font` |

Only the primitives listed in `DESIGN.md` Appendix C are installed. Their
generated radius, shadow and neutral palette are replaced; behaviour
(focus trap, roving tabindex, dismissal) stays with Radix.

## Routes

| Path | What it is |
| --- | --- |
| `/` | Poster hero, yellow categories band, how it works, gallery, newsletter |
| `/events` | Searchable, filterable list with pagination |
| `/events/[id]` | Detail page with join panel |
| `/events/new` | Create form |
| `/events/[id]/edit` | Edit form, same component |
| `/events/manage` | Your events, with tabs and delete dialog |
| `/events/joined` | Events you have joined |
| `/profile` | Profile details |
| `/login`, `/register` | Auth pages |
| `/styleguide` | Every token, type role and component in both themes |

All routes are reload-safe; dynamic pages statically generate known ids and
stream the rest.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run build      # production build
npm start          # serve the build
```

`NEXT_PUBLIC_SITE_URL` sets the canonical base used by metadata, `sitemap.xml`
and `robots.txt`. It falls back to `http://localhost:3000` in development.

## Structure

```
src/
  app/                 routes, global tokens, metadata
    styleguide/        the proof page for every component
  components/
    layout/            navbar, footer, wordmark, dashboard shell, profile menu
    ui/                button, field, chip, dialog, tabs, avatar, states…
    events/            event card/row, join panel, capacity meter, form
    home/              category band, gallery, newsletter
    auth/              auth shell, social button
  lib/                 site config, types, fixtures, validation schemas
```

## Photography

Placeholder images live in `public/images/events/`. Sources and licences are
in [`CREDITS.md`](./CREDITS.md) — replace them with your own photographs before
submission and update that file.

## Docs

- [`DESIGN.md`](./DESIGN.md) — tokens, type roles, components, page
  compositions, copy rules, accessibility.
- [`PRD.md`](./PRD.md) — routes, data model, API, phases and the commit plan.
