# PRD — Shomaj Shathi

**Product:** Social Development Events Platform
**Course:** B14 — Assignment 8 (Hermione)
**Stack:** Next.js 16 (client) · Express + MongoDB (server) · BetterAuth · JWT
**Deadline:** 3 November 2026, 23:59 (60 marks)
**Companion:** [`DESIGN.md`](./DESIGN.md) — interface system, components, page compositions

| Field | Value |
| --- | --- |
| Version | 2.3 — poster interface (Archivo + flat colour), shadcn primitives, human-made commits |
| Status | Ready to execute |
| Implementer | AI coding agent |
| Requirements source | `B14-A8_category-Hermione.docx` + assignment post |

---

## 0. Bootstrap

This pair of documents is self-contained. To start a brand-new build:

1. Create an empty folder, e.g. `D:\projects\uddom`. This is the **workspace
   root** for the whole build. The folder name is historical; the product is
   **Shomaj Shathi**.
2. Put `DESIGN.md` and `PRD.md` at that root — side by side, not inside a repo.
3. Create the two repositories as siblings:

```
D:\projects\uddom\
  client\        ← git repo #1  (Next.js)   → remote shomaj-shathi-client
  server\        ← git repo #2  (Express)   → remote shomaj-shathi-server
  DESIGN.md  PRD.md
```

4. Copy both docs into `client/` in P0.1, so they travel with the client repo.
   The copies at the workspace root stay put and remain the master pair.
5. Follow §9 from P0.1. Do not skip P0.

`DESIGN.md` Appendix C holds the interface dependencies and config files; the
scaffold command itself is in P0.1. Nothing else needs to exist before P0.1.

### How the implementing agent works

1. **One phase at a time.** Phases are `P0.1`, `P1.3`, `P2.4`… Never start a
   phase before the previous exit criteria are ticked.
2. **One commit boundary at a time. The human commits, never the agent.** When a
   task in §9.5 is finished, stop coding and post the handoff block defined in
   §9.5: the commit message, the exact commands, the files touched, and what to
   verify. Then **wait**. Nothing else is written until the human replies
   `continue`. Commit count is graded, so never squash two rows into one.
3. **Do not run `git commit` or `git push`.** `git add`, `git status` and
   `git diff` are fine; history and remotes stay the human's. Deploy steps wait
   until the human confirms the push landed.
4. **Design comes from `DESIGN.md`.** Every page type has a composition in §8
   there. Every component has an API in §7 there. Do not invent UI.
5. **Tick checkboxes in this file** as you go — and only after the human confirms
   the commit landed. It is the project's memory.
6. **Ask only when blocked externally** — OAuth credentials, database URI,
   deploy access. Otherwise use the defaults in §5.
7. **This is Next.js 16.** Read the relevant file in
   `node_modules/next/dist/docs/` before writing route handlers, `cookies()`,
   `headers()`, or data fetching. APIs differ from older versions. `cookies()`
   and `headers()` are async.

---

## 1. Problem and goal

Community service in Dhaka is organised in WhatsApp groups and Facebook posts.
Events get lost, nobody knows who is coming, and there is no record of what was
actually done.

**Goal:** one place to create a service event, find it, join it, and see what you
have taken part in — with a design that looks printed and civic rather than
template-generated.

**Non-goals:** payments, donations processing, chat, notifications, file upload,
moderation, admin roles.

---

## 2. Success criteria

Every row must be demonstrable on the **live site**, not just localhost.

| # | Requirement | Where | Verified by |
| --- | --- | --- | --- |
| G1 | ≥15 notable client commits | client repo | `git log --oneline` |
| G2 | ≥8 notable server commits | server repo | `git log --oneline` |
| G3 | README: site name, live URL, ≥5 feature bullets | client repo | manual |
| G4 | No lorem ipsum | both | `grep -ri "lorem"` |
| G5 | No default `alert` / `confirm` / `prompt` | both | `grep -rn "alert("` |
| G6 | Deployed: Vercel + Render + Atlas | live | open URL |
| G7 | No error on reload of any route | both | reload each route |
| G8 | Signed-in user not redirected on private-route reload | client | reload `/events/manage` |
| G9 | Navbar: logo, Upcoming Events, conditional Login/Logout | client | manual |
| G10 | Profile dropdown: Create / Manage / Joined | client | hover + click |
| G11 | Display name on hover over avatar | client | hover |
| G12 | Footer with real information | client | manual |
| G13 | Email + password login | both | manual |
| G14 | Google **or** GitHub social login | client | manual |
| G15 | Register: name, email, photoURL, password | client | manual |
| G16 | Password: uppercase + lowercase + ≥6, with error | client | type `abc` |
| G17 | No email verification / forgot password | — | absence |
| G18 | Home: hero, categories band, features, 6 events via `.limit(6)`, gallery, newsletter | both | query log |
| G19 | Create: title, description, type, thumbnail URL, location, date | client | manual |
| G20 | Past dates rejected | both | pick yesterday |
| G21 | Creator email stored with the event | Atlas | document |
| G22 | Success toast + redirect to Upcoming | client | manual |
| G23 | Upcoming shows only future events | server | query check |
| G24 | Card: image, title, location, type, date, View | client | manual |
| G25 | Detail public; Join requires login | client | incognito |
| G26 | Join stores event + user | Atlas | document |
| G27 | Joined page sorted by event date | both | manual |
| G28 | Manage: update + delete own events only | both | two accounts |
| G29 | Validation on create, update, all auth forms | both | manual |
| G30 | Theme toggle changes the whole system | client | click |
| G31 | JWT validation protects APIs | server | curl no token → 401 |
| G32 | Two optional tasks | — | skeletons + profile update |
| G33 | Responsive 390 / 768 / 1280 | client | manual |
| G34 | Consistent headings, buttons, equal-height cards | client | `/styleguide` |
| G35 | New X logo, not the Twitter bird | client | footer |
| G36 | One accent, flat colour, no shadows, square surfaces | client | `/styleguide` |

---

## 3. Users and stories

**Visitor**
- Browse events and open a detail page without signing in.
- Be asked to log in only when joining.

**Member**
- Register with email or Google.
- Join an event; see it on the Joined page.
- Create an event; edit or delete it later.
- Update name and photo.

**Organiser**
- See only their own events on Manage; cannot touch anyone else's.

**Examiner**
- Reload any route, including private ones, without being logged out.
- Switch theme and see every page follow.
- Test without email verification or password reset.

---

## 4. Scope

**In:** Home · Upcoming · Event detail · Login · Register · Create · Manage ·
Edit · Joined · Profile · 404 · `/styleguide`. Auth (email + Google), event CRUD,
join/leave, JWT-protected API, ownership, theme, skeletons, empty states, deploy.

**Out:** email verification, password reset, payments, chat, notifications, file
upload, newsletter persistence, comments, ratings, admin roles.

---

## 5. Decisions

Defaults so the agent is never blocked. Change a row deliberately, not silently.

| ID | Decision | Default |
| --- | --- | --- |
| D1 | Repos | `client/` and `server/` siblings, two independent git repos |
| D2 | Auth runtime | BetterAuth inside Next, MongoDB adapter; server never sees passwords |
| D3 | JWT | BetterAuth `jwt()` plugin (EdDSA) + JWKS; Express verifies with `jose` |
| D4 | Social login | Google (fallback GitHub only if credentials unavailable) |
| D5 | Optional tasks | Skeletons + profile update |
| D6 | ODM | Mongoose |
| D7 | Validation | Zod on client and server; `react-hook-form` on forms |
| D8 | HTTP | native `fetch` wrapped in `lib/api.ts`; no Axios, no TanStack Query |
| D9 | UI | Tailwind 4 + **shadcn/ui** primitives (Radix) restyled to `DESIGN.md` tokens; no HeroUI/DaisyUI/MUI |
| D10 | Deploy | Vercel + Render + Atlas M0 |
| D11 | Package manager | npm |
| D12 | Time | store UTC, display `Asia/Dhaka`, format via `formatDateParts` |
| D13 | "Upcoming" | `date >= now` (UTC instant); an event earlier today is past |
| D14 | Writes before auth | local-only via `ALLOW_ANON_WRITES`; **never** true on Render; deleted in P2.5 |

### Extra dependencies (approve or object before P0.1)

`mongoose`, `zod`, `react-hook-form`, `@hookform/resolvers`, `jose`, `cors`,
`helmet`, `express-rate-limit`, `tsx`. All standard; all replaceable.

Already required by the brief: `next`, `react`, `tailwindcss`, `better-auth`,
`mongodb`. Already part of the design: `next-themes`, `sonner`, `lucide-react`,
`class-variance-authority`, `tailwind-merge`, `clsx`.

---

## 6. Architecture

### 6.1 Layout

```
client/
  src/app/
    (public)/page.tsx                 Home
    (public)/events/page.tsx          Upcoming
    (public)/events/[id]/page.tsx     Detail
    (auth)/login/page.tsx
    (auth)/register/page.tsx
    (protected)/layout.tsx            session guard
    (protected)/events/new/page.tsx
    (protected)/events/[id]/edit/page.tsx
    (protected)/events/manage/page.tsx
    (protected)/events/joined/page.tsx
    (protected)/profile/page.tsx
    api/auth/[...all]/route.ts        BetterAuth
    styleguide/page.tsx
    layout.tsx  globals.css  not-found.tsx
  src/components/{ui,layout,events,home,auth}
    layout/dashboard-shell.tsx        sand sidebar for signed-in pages
    layout/wordmark.tsx               shomaj + shathi, two-tone
  src/lib/{api,auth,auth-client,events,site,utils,validation}
  public/images/events/
  DESIGN.md  PRD.md  README.md  CREDITS.md

server/
  src/app.ts
  src/index.ts
  src/config/env.ts
  src/db/connect.ts
  src/models/{event,join}.model.ts
  src/routes/event.routes.ts
  src/controllers/event.controller.ts
  src/middleware/{auth,validate,error,rate-limit}.ts
  src/lib/{jwt,api-error,async-handler,to-dto}.ts
  src/validators/event.schema.ts
  src/scripts/seed.ts
  README.md  .env.example
```

The **client owns identity**. The **server owns events and joins**.

### 6.2 System diagram

```
Browser
  │ session cookie (BetterAuth, httpOnly)
  ├──────────► Next.js on Vercel
  │              ├─ UI (RSC + client components)
  │              ├─ /api/auth/*      BetterAuth + MongoDB adapter
  │              └─ /api/auth/jwks   public keys
  │
  │ Bearer <jwt>, 15 min
  └──────────► Express on Render ──► MongoDB Atlas
                 ├─ verify JWT via JWKS (jose)
                 ├─ /api/events  CRUD + ownership
                 └─ /api/events/:id/join
```

### 6.3 Environment

**`client/.env.local`** — never committed

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_SECRET=          # openssl rand -base64 32
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://...
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

**`server/.env`** — never committed

```bash
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://...
CLIENT_ORIGIN=http://localhost:3000
BETTER_AUTH_JWKS_URL=http://localhost:3000/api/auth/jwks
BETTER_AUTH_ISSUER=http://localhost:3000
BETTER_AUTH_AUDIENCE=http://localhost:3000
ALLOW_ANON_WRITES=false
```

Only the two URLs may use `NEXT_PUBLIC_`. `BETTER_AUTH_SECRET` never leaves the
client app; the server does not need it.

### 6.4 Data model

BetterAuth owns `user`, `session`, `account`, `verification`, `jwks`.

**`events`**

| Field | Type | Rules |
| --- | --- | --- |
| `title` | string | 6–90, trimmed, required |
| `description` | string | 20–2000, required |
| `type` | enum | `Cleanup` `Plantation` `Donation` `Education` |
| `image` | string | valid `http(s)` URL |
| `location` | string | 3–120 |
| `date` | Date | must be future on create and update |
| `capacity` | number | 1–1000, default 50 |
| `attendeeCount` | number | default 0, never negative |
| `organizerId` | string | BetterAuth user id, from JWT |
| `organizerEmail` | string | from JWT — satisfies G21 |
| `organizerName` | string | from JWT |
| `createdAt` / `updatedAt` | Date | timestamps |

Indexes: `{ date: 1 }`, `{ organizerId: 1, date: -1 }`.

**`joins`**

| Field | Type | Rules |
| --- | --- | --- |
| `eventId` | ObjectId | ref `events` |
| `userId` | string | BetterAuth user id |
| `userEmail` | string | from JWT |
| `userName` | string | from JWT |
| `joinedAt` | Date | default now |

Indexes: **unique** `{ eventId: 1, userId: 1 }`, plus `{ userId: 1, joinedAt: -1 }`.

`attendeeCount` is denormalised for card speed. Increment only after a successful
insert, decrement on leave, floor at 0. `joins` remains the source of truth.
Deleting an event deletes its joins.

### 6.5 API contract

Envelope:

```json
{ "success": true, "data": …, "meta": { "page": 1, "limit": 12, "total": 24, "totalPages": 2 } }
{ "success": false, "message": "Pick a date after today.", "errors": { "date": "Pick a date after today." } }
```

| # | Method & path | Auth | Purpose |
| --- | --- | --- | --- |
| 1 | `GET /api/health` | public | Render health check |
| 2 | `GET /api/events` | optional | `scope=upcoming` (default), `limit` (default 12, max 24), `page`, `type`, `q`, `sort=date\|popular` |
| 3 | `GET /api/events/:id` | optional | Detail; adds `joined` with a valid token |
| 4 | `POST /api/events` | JWT | Create; organiser from token |
| 5 | `PATCH /api/events/:id` | JWT + owner | Update |
| 6 | `DELETE /api/events/:id` | JWT + owner | Delete event + joins |
| 7 | `POST /api/events/:id/join` | JWT | Join; 409 duplicate or full |
| 8 | `DELETE /api/events/:id/join` | JWT | Leave; 404 if not joined |
| 9 | `GET /api/events/joined` | JWT | Caller's joins, `date` ascending |
| 10 | `GET /api/events/mine` | JWT | Caller's events, `date` descending |

**`EventDTO`** — the only shape the client sees:

```json
{
  "id": "6730…",
  "title": "Buriganga Bank Cleanup",
  "description": "Gloves and sacks provided…",
  "type": "Cleanup",
  "image": "https://…",
  "location": "Buriganga ghat, Old Dhaka",
  "date": "2026-11-21T01:00:00.000Z",
  "capacity": 80,
  "attendeeCount": 61,
  "organizer": { "id": "usr_…", "name": "Nusrat Jahan", "email": "n@…", "image": null },
  "joined": false,
  "createdAt": "2026-10-30T09:12:00.000Z"
}
```

Never return raw Mongo documents. Map once with `toEventDTO()`.

| Status | When |
| --- | --- |
| 400 | Validation failed (`errors` keyed by field) |
| 401 | Missing / expired / tampered / wrong-issuer JWT |
| 403 | Valid token, not the organiser |
| 404 | Event absent |
| 409 | Already joined · full |
| 429 | Rate limited |
| 500 | Unexpected; generic message, details only in logs |

### 6.6 Auth and JWT flow

1. **Register** → `authClient.signUp.email({ name, email, password, image })`.
2. **Login** → `authClient.signIn.email({ email, password })`.
3. **Google** → `authClient.signIn.social({ provider: "google", callbackURL: "/events" })`.
4. **Session on reload** → server-side
   `auth.api.getSession({ headers: await headers() })`. This is what prevents
   the "logged-in user bounced to login" failure (G8).
5. **Token** → `authClient.token()` returns a 15-minute EdDSA JWT. Cache it in
   memory until 60s before expiry. Never `localStorage`.
6. **Refresh** → on 401, fetch a token once and retry once; a second 401 sends
   the user to `/login?next=…`.
7. **Verify** → `jose` `createRemoteJWKSet` + `jwtVerify(token, jwks, { issuer, audience })`.
8. **Ownership** → load the event, compare `organizerId` with `req.user.id`;
   mismatch is 403.

---

### 6.7 Seed content

Six events. Dates must be future relative to build day.

| Title | Type | Location | Capacity |
| --- | --- | --- | --- |
| Winter Clothes Drive — Mirpur 10 | Donation | Mirpur 10 Roundabout, Dhaka | 60 |
| Buriganga Bank Cleanup | Cleanup | Buriganga ghat, Old Dhaka | 80 |
| Plant 200 Saplings — Hatirjheel | Plantation | Hatirjheel east bank, Dhaka | 100 |
| Blankets for Mohammadpur Basti | Donation | Mohammadpur, Dhaka | 50 |
| Dhanmondi Lake Plastic Sweep | Cleanup | Dhanmondi Lake, Road 27 | 40 |
| Reading Circle for Street Children | Education | Uttara Sector 7, Dhaka | 25 |

Descriptions must be concrete — what to bring, when it starts, what happens on
the day. Photography sources and licences are in `DESIGN.md` Appendix B; record
them in `CREDITS.md`.

---

## 7. Functional requirements

### 7.1 Auth — `FR-A*`

| ID | Requirement | Acceptance |
| --- | --- | --- |
| FR-A1 | Register: name, email, photoURL, password, confirm | User row in Atlas; toast; redirect `/events` |
| FR-A2 | Password upper + lower + ≥6 | `abc` → inline error + toast; `Abc123` accepted |
| FR-A3 | Login | Wrong password → `InlineAlert`, no redirect |
| FR-A4 | Google login | OAuth completes; `account.providerId = google` |
| FR-A5 | Logout | Cookie cleared; navbar shows **Log in**; private route redirects |
| FR-A6 | Session survives reload | F5 on `/events/manage` stays |
| FR-A7 | Private routes redirect only when signed out | incognito → `/login?next=…` once |
| FR-A8 | No verification, no reset | links absent |
| FR-A9 | Profile view + update | name/photo persist; navbar updates |
| FR-A10 | No `alert()` | grep + manual |

### 7.2 Events — `FR-E*`

| ID | Requirement | Acceptance |
| --- | --- | --- |
| FR-E1 | Home shows 6 upcoming | server uses `.limit(6)`; length ≤6 |
| FR-E2 | Upcoming excludes past | seed a past event in Atlas → absent |
| FR-E3 | Card fields + View | opens `/events/[id]` |
| FR-E4 | Detail public | incognito readable; join shows **Log in to join** |
| FR-E5 | Create requires login | signed-out POST → 401 |
| FR-E6 | Create validates future date | yesterday → inline error |
| FR-E7 | Stores creator id/email/name | Atlas document |
| FR-E8 | Toast + redirect | toast names the event |
| FR-E9 | Manage shows own only | second account sees empty state |
| FR-E10 | Update own; others 403 | curl with second token |
| FR-E11 | Delete own behind dialog | cancel keeps; confirm removes + joins |
| FR-E12 | Join stores event + user, count +1 | documents present |
| FR-E13 | Duplicate join 409 | second click no duplicate |
| FR-E14 | Full event cannot be joined | button disabled, **Event full** |
| FR-E15 | Joined sorted by date | ascending |
| FR-E16 | Leave decrements | count restored |
| FR-E17 | Detail shows organiser + joined state | **You're going** when joined |

### 7.3 Interface — `FR-U*`

| ID | Requirement | Acceptance |
| --- | --- | --- |
| FR-U1 | Navbar both auth states | logo, Upcoming, toggle, Log in or avatar |
| FR-U2 | Avatar hover name; click menu | four links + sign out |
| FR-U3 | Footer real content, X logo | no bird icon |
| FR-U4 | Theme toggle global | every route in both themes |
| FR-U5 | Responsive | no horizontal scroll at 390 |
| FR-U6 | Skeletons | card-shaped placeholders |
| FR-U7 | Empty states | copy explains next action |
| FR-U8 | Consistent headings/buttons/cards | matches `/styleguide` |
| FR-U9 | Home six sections in order | hero, categories band, features, events, gallery, newsletter |
| FR-U10 | Newsletter design-only | toast, nothing stored |

### 7.4 Security — `FR-S*`

| ID | Requirement | Acceptance |
| --- | --- | --- |
| FR-S1 | Writes verify JWT | no token → 401 |
| FR-S2 | Tampered token rejected | 401 |
| FR-S3 | Expired token rejected | 401 |
| FR-S4 | Ownership server-side | second account PATCH/DELETE → 403 |
| FR-S5 | Validation both sides | invalid body → 400 with field errors |
| FR-S6 | No secrets in client bundle | `grep -r "MONGODB_URI" .next` → nothing |
| FR-S7 | CORS allowlist | unknown origin gets no allow header |
| FR-S8 | Rate limits | 30 rapid auth writes → 429 |
| FR-S9 | No stack traces in production | generic 500 |
| FR-S10 | `ALLOW_ANON_WRITES` removed | grep → no hits |

---

## 8. Non-functional requirements

| Area | Requirement |
| --- | --- |
| Performance | Home LCP < 2.5s on 4G; fixed aspect ratios; no layout shift; images sized |
| Accessibility | AA contrast, visible focus, 44px targets, `aria-label` on icon buttons, keyboard menu + dialog |
| SEO | `%s · Shomaj Shathi` title template; per-page description; OG image on Home + detail |
| Design integrity | One accent, no shadows, square surfaces, no eyebrows, black-on-orange text only — audited on `/styleguide` in both themes |
| Reliability | Reload-safe on every route; no unhandled rejections; server fails loudly if DB is unreachable |
| Maintainability | one envelope, one `toEventDTO`, one API client, no duplicated fetch logic |
| Observability | server logs method, path, status, duration |

---

## 9. Delivery plan

Four days at 8–10 focused hours. **Submit 3 Nov by 20:00**, leaving four hours of
buffer.

| Day | Date | Phases | Ends with |
| --- | --- | --- | --- |
| 1 | 31 Oct | P0, P1.1–P1.5 | Live Home page reading events from Atlas |
| 2 | 1 Nov | P1.6–P1.7, P2.1–P2.3 | Signed-in member creating an event on the live site |
| 3 | 2 Nov | P2.4–P2.7, P3.1–P3.3 | Protected API proven with curl |
| 4 | 3 Nov | P3.4–P3.5, polish, QA | Submission links posted |

**If a day slips:** cut P2.7 (profile) and P3.4 (helmet/rate limit) before
cutting join, ownership, or deployment. Those three are graded; polish is not.

---

### P0 — Foundation (Day 1, morning)

#### P0.1 Repositories and scaffold

- [ ] `client/` and `server/` created as siblings; `git init` in each; remotes
      `shomaj-shathi-client` / `shomaj-shathi-server`.
- [ ] Copy `DESIGN.md`, `PRD.md` into `client/`. Stage only — the human commits
      it as C02 `docs: add design and product specifications`.
- [ ] Scaffold the client, from the workspace root:

      ```bash
      npx create-next-app@latest client --ts --tailwind --eslint --app --src-dir \
        --import-alias "@/*" --use-npm --turbopack --yes
      ```

      `create-next-app` installs Next 16, React 19 and Tailwind 4 and runs
      `git init`. Accept the Turbopack and App Router prompts.
- [ ] Install the interface dependencies from `DESIGN.md` Appendix C —
      including `npx shadcn@latest init` and the listed `shadcn add` primitives —
      plus `better-auth`.
- [ ] `server/`: `npm init -y`; install `express cors helmet mongoose zod jose
      dotenv express-rate-limit`; dev `typescript tsx @types/express @types/cors
      @types/node`.
- [ ] Server `tsconfig.json`: `"module": "NodeNext"`, `"target": "ES2022"`,
      `"outDir": "dist"`; scripts `dev`, `build`, `start`.
- [ ] `.gitignore` covers `.env*`, `node_modules`, `.next`, `dist`.

**Exit:** both repos push; `npm run dev` starts both; no secrets tracked.

#### P0.2 Token layer and fonts

- [ ] Run `npx shadcn@latest init` (style `new-york`, base colour `neutral`,
      CSS variables, RSC) and add only the primitives listed in `DESIGN.md`
      Appendix C.
- [ ] Paste `DESIGN.md` Appendix A into `src/app/globals.css`, **replacing** the
      token block shadcn appends (its oklch values and `--radius` ramp must not
      survive).
- [ ] Wire `next/font` on `<html>` (Appendix C).
- [ ] `src/lib/utils.ts` with `cn()` (shadcn generates the same helper — keep
      one file, not two).
- [ ] `src/lib/site.ts` with brand + nav.
- [ ] Root layout wraps children in `Providers` (`next-themes` + Sonner).

**Exit:** a blank page renders white with Archivo Black headings, a black rule
under the header, and the toggle switches to the black ground without a flash.

#### P0.3 Design system components

Build in `DESIGN.md` §7 order, up to and including `EventCard`. Every primitive
first arrives via `npx shadcn@latest add`, then loses its shadcn styling
(radius, shadow, neutral palette) per §7 — none ships as generated:

- [ ] `Button` (5 variants, 4 sizes, loading — no orange variant)
- [ ] `Field` + `Input` / `Textarea` / `Select` / `Checkbox` (underline style)
- [ ] `Chip`, `TypeDot`, `CountChip`
- [ ] `SectionHeading` + `Stat` (no eyebrow prop)
- [ ] `Skeleton` + `EmptyState`
- [ ] `ThemeToggle`
- [ ] `EventCard` + `EventRow`

**Exit:** every component compiles and renders on a scratch page; no `shadow-*`
or `rounded-lg` survives from a generated file; `tsc --noEmit` clean. P0.4 then
gives them a permanent home at `/styleguide`.

#### P0.4 `/styleguide`

- [ ] Ten sections: Colour, Typography, Rules & shape, Buttons, Forms, Chips &
      metadata, Event card, Dashboard shell, Feedback, Composition.
- [ ] Side-by-side `.theme-light` / `.theme-dark` islands for colour and type,
      each pair labelled with its measured contrast ratio.
- [ ] Sticky top bar, contents rail on desktop.

**Exit:** the page is usable as a visual spec, in both themes, at 390 and 1280.

#### P0.5 Server foundation

- [ ] `config/env.ts` validates every variable.
- [ ] `db/connect.ts` with `serverSelectionTimeoutMS: 8000`.
- [ ] `app.ts`: helmet, CORS allowlist, `express.json({ limit: "100kb" })`,
      request logger, 404, error handler.
- [ ] `GET /api/health`.
- [ ] Models + indexes per §6.4.
- [ ] `scripts/seed.ts` idempotent, six events from §6.7.

**Exit:** health returns ok; seed writes six documents.

---

### Part 1 — UI, CRUD, early deploy (Day 1 afternoon → Day 2 morning)

#### P1.1 Public read API

- [ ] `GET /api/events` with `scope`, `limit`, `page`, `type`, `q`, `sort`.
- [ ] Upcoming filter `date >= now`; `.limit(6)` used for Home.
- [ ] `GET /api/events/:id`; `toEventDTO`; optional auth for `joined`.
- [ ] Optional-auth middleware never fails a public request.

**Exit:** six events returned; past excluded; DTO shape exact.

#### P1.2 Client shell

- [ ] `.env.local` with `NEXT_PUBLIC_API_URL`.
- [ ] `lib/api.ts` — `apiFetch<T>()`, envelope unwrap, typed `ApiError`,
      10s timeout via `AbortSignal.timeout`.
- [ ] `lib/events.ts` — `EventItem`, `eventTypes`, `formatDateParts`.
- [ ] `Avatar` (initials fallback; needed by the navbar in P2.3).
- [ ] `Wordmark`, `Navbar` (divided cells, orange register cell), `Footer`
      (giant two-tone wordmark), page-header pattern.
- [ ] 404 page.
- [ ] New components added to `/styleguide`.

**Exit:** every page has chrome; toggle works; console clean.

#### P1.3 Home

- [ ] Hero per `DESIGN.md` §8.1 — `t-mega` caps, rule, tagline, two buttons.
      No photograph.
- [ ] Yellow categories band: filter chips + the six event cards on `bg-sun`.
- [ ] Features: three columns divided by rules, numbered 01 / 02 / 03.
- [ ] Upcoming: server component with `limit=6`; `loading.tsx` skeletons.
- [ ] Gallery: `GalleryGrid`, five square photos.
- [ ] Newsletter: design-only, on a ruled band.
- [ ] `metadata` + OG image.

**Exit:** matches `/styleguide` in both themes at 390 / 768 / 1280.

#### P1.4 Upcoming and detail

- [ ] `/events` — grid, type filter, search, pagination, loading, empty.
- [ ] `/events/[id]` — title, facts list, image right, description,
      what-to-bring, organiser.
- [ ] Join button disabled, reads **Log in to join** (auth arrives in Part 2).
- [ ] `generateMetadata`; `notFound()` for bad ids.

**Exit:** reload works on both; past events absent.

#### P1.5 Early deploy

- [ ] Atlas M0, db user, IP `0.0.0.0/0` (note it in the README).
- [ ] Render web service: build `npm ci && npm run build`, start `npm start`,
      health check `/api/health`.
- [ ] Vercel project; `NEXT_PUBLIC_API_URL` set before build.
- [ ] `CLIENT_ORIGIN` = exact Vercel origin, no trailing slash.
- [ ] `ALLOW_ANON_WRITES=false`.
- [ ] Seed production once.
- [ ] Reload `/`, `/events`, `/events/[id]` live — no 404/500/loop.

**Exit:** a stranger can browse events at the live URL. **Most important
checkpoint of Day 1.**

#### P1.6 CRUD API (temporary identity)

- [ ] `POST /api/events` with zod, future-date rule, organiser from token **or**
      `x-dev-email` when `ALLOW_ANON_WRITES=true`.
- [ ] `PATCH` / `DELETE` with the same guard and ownership.
- [ ] `DELETE` cascades joins.
- [ ] `GET /api/events/mine`.
- [ ] Local `.env` sets the flag true; Render stays false.

**Exit:** full CRUD with curl locally; production writes still 401.

#### P1.7 Create / edit / manage UI

- [ ] `/events/new` — form per `DESIGN.md` §8.5, zod + RHF, image preview.
- [ ] Submit → toast → `router.push("/events")` → `router.refresh()`.
- [ ] `/events/manage` — `Tabs`, `EventRow` list, edit link, delete dialog.
- [ ] `/events/[id]/edit` — prefilled, PATCH on save.
- [ ] Empty state.
- [ ] Do not link these routes in the navbar until P2.3.

**Exit:** create → appears on Upcoming; edit updates; delete removes event + joins.

---

### Part 2 — Authentication and booking (Day 2 → Day 3 morning)

#### P2.1 BetterAuth

- [ ] `lib/auth.ts` — `betterAuth({ database: mongodbAdapter(db), emailAndPassword:
      { enabled: true, minPasswordLength: 6 }, socialProviders: { google }, plugins: [jwt()] })`.
- [ ] `app/api/auth/[...all]/route.ts` — `toNextJsHandler(auth)`.
- [ ] `lib/auth-client.ts` — `createAuthClient({ plugins: [jwtClient()] })`.
- [ ] Collections appear in Atlas after first sign-up.
- [ ] Google OAuth client: redirect URIs for localhost **and** Vercel.

**Exit:** auth endpoints respond; test user exists.

#### P2.2 Register and login

- [ ] `(auth)` route group; single-column form per `DESIGN.md` §8.4, no split
      photo panel.
- [ ] `lib/validation.ts` shared zod schema.
- [ ] `SocialButton` + **or** divider.
- [ ] Toast on success; `InlineAlert` on failure.
- [ ] Password message: *Use at least 6 characters with one uppercase and one
      lowercase letter.*
- [ ] `?next=` honoured; default `/events`.

**Exit:** register auto-signs in; deep login lands on the intended page.

#### P2.3 Session navbar

- [ ] Server reads session; passes `user` to `Navbar`.
- [ ] `ProfileMenu` replaces **Log in** when signed in.
- [ ] Hover shows display name; menu items per `DESIGN.md`.
- [ ] Sign out → toast → `/`; private routes redirect.
- [ ] Mobile menu carries the same links.

**Exit:** G9, G10, G11 on the live site.

#### P2.4 Protected routes

- [ ] `(protected)/layout.tsx` calls `getSession`; `redirect("/login?next=…")`.
- [ ] Move create/edit/manage/joined/profile into the group.
- [ ] Wrap the signed-in pages in `DashboardShell` (sand sidebar, pill nav,
      logout pinned); no client-side redirect flicker.
- [ ] `loading.tsx` skeletons per route.

**Exit:** G8 passes; incognito redirects once.

#### P2.5 Remove the temporary identity

- [ ] Delete `ALLOW_ANON_WRITES`, `x-dev-email`, every branch reading them.
- [ ] Client attaches the JWT on writes.
- [ ] Organiser fields derived only from the token.
- [ ] Run the FR-S10 grep.

**Exit:** no anonymous write path exists.

#### P2.6 Join, leave, joined

- [ ] `POST /:id/join` — auth, duplicate check, capacity check, `$inc`.
- [ ] `DELETE /:id/join` — auth, delete, decrement with floor 0.
- [ ] Detail states per `DESIGN.md` §8.3; optimistic UI; toast.
- [ ] Re-fetch `joined` after mutation.
- [ ] `/events/joined` — ascending, four `Stat`s, empty state.

**Exit:** G25–G27 with two accounts.

#### P2.7 Profile (optional #2)

- [ ] `/profile` — avatar, name, read-only email, photo URL, save.
- [ ] `authClient.updateUser({ name, image })`; toast; navbar updates.
- [ ] Validation: name 2–60, image URL or empty.

**Exit:** rename visible without reload.

---

### Part 3 — JWT and security (Day 3)

#### P3.1 Token plumbing

- [ ] `lib/api.ts` fetches a token via `authClient.token()`; memory cache until
      60s before expiry.
- [ ] On 401: refresh once, retry once, then `/login?next=…`.
- [ ] No JWT in `localStorage`, `sessionStorage`, or readable cookies.

**Exit:** DevTools shows the header on writes; storage is empty.

#### P3.2 Server verification

- [ ] `lib/jwt.ts` — remote JWKS, issuer + audience, 60s clock tolerance.
- [ ] Cache JWKS; refetch on unknown `kid`.
- [ ] `requireAuth`, `optionalAuth`, typed `req.user`.
- [ ] `/joined` and `/mine` become auth-only.

**Exit:** valid 200 · absent 401 · garbage 401.

#### P3.3 Ownership and validation

- [ ] Shared `loadEvent` helper.
- [ ] 403 non-owner, 404 missing — never leak existence.
- [ ] Zod: create, update (partial), query, params (`ObjectId`).
- [ ] Reject past dates on update.
- [ ] `.strict()`, trim, length limits.

**Exit:** FR-S table passes end to end.

#### P3.4 Transport and abuse

- [ ] `helmet()` with a JSON-API CSP.
- [ ] CORS exact origins; no wildcard.
- [ ] Rate limit: 100/15min global, 10/min on writes.
- [ ] 100kb body limit; reject non-JSON writes.
- [ ] Production error handler hides stacks.

**Exit:** FR-S6–S9 on the deployed server.

#### P3.5 QA, docs, submission

- [ ] `scripts/auth-matrix.sh` covering no token, bad, expired, wrong owner,
      duplicate join, full event, invalid body.
- [ ] Run it against production; paste results into the server README.
- [ ] Client README: name, live URL, five feature bullets, stack, screenshots.
- [ ] Server README: endpoints, env vars, deploy notes.
- [ ] Full §10.2 manual pass on the live site.
- [ ] Submit before 20:00 on 3 Nov.

### 9.5 Commit plan and handoff protocol

**The human commits. The agent never runs `git commit`.**

Every row below is a **stop point**. When the work for a row is done, the agent
stops, posts the block below, and waits. Coding resumes only when the human
replies `continue`.

```
### Ready to commit — C04 · feat(ui): button and form controls

Files
- src/lib/utils.ts            (new)
- src/components/ui/button.tsx (new)
- src/components/ui/field.tsx  (new)

Run
git add -A
git commit -m "feat(ui): button and form controls"

Checks
- npm run lint
- npm run typecheck
- /styleguide renders Button + fields in both themes

Next: C05 - chips, section heading and states
Reply **continue** when this commit is in.
```

Rules for the handoff block:

1. **One row per stop.** Never post two commit messages in one turn unless the
   human asked for a batch.
2. **Files are listed as new / modified / deleted.** No "various changes".
3. **Include the checks that actually ran**, not a generic promise.
4. **Name the next row** so the human knows what `continue` buys.
5. **If one row touches both repos** (e.g. P2.5), post two blocks — one per repo,
   server first — and say the client block is blocked until the server commit
   lands.
6. **If the human replies `continue 3`**, complete three rows, then post three
   blocks in order. Commits are still separate; nothing is squashed.
7. **If a message in the table no longer fits the work**, keep the
   `type(scope): imperative summary` shape, ≤ 72 characters, and say why it
   changed.
8. **Push is the human's too.** Deploy-dependent rows — P1.5, and any live check
   in P3.4/P3.5 — start only after the human says the push is up.

Minimum 15 client / 8 server. This plan yields ~29 / 16 with real boundaries —
comfortably above the line even if a few rows merge.

**Client**

| # | Message | Phase |
| --- | --- | --- |
| C01 | `chore: scaffold next app with typescript and tailwind` | P0.1 |
| C02 | `docs: add design and product specifications` | P0.1 |
| C03 | `feat(design): tokens, type roles and fonts` | P0.2 |
| C04 | `feat(ui): button and form controls` | P0.3 |
| C05 | `feat(ui): chips, section heading and states` | P0.3 |
| C06 | `feat(ui): theme toggle and toast provider` | P0.3 |
| C07 | `feat(events): event card and compact row` | P0.3 |
| C08 | `feat(styleguide): document the design system` | P0.4 |
| C09 | `feat(layout): navbar, footer and page header` | P1.2 |
| C10 | `feat(api): typed fetch client and event types` | P1.2 |
| C11 | `feat(home): poster hero and stat strip` | P1.3 |
| C12 | `feat(home): features, gallery and newsletter` | P1.3 |
| C13 | `feat(home): categories band with live events` | P1.3 |
| C14 | `feat(events): upcoming grid with filters` | P1.4 |
| C15 | `feat(events): detail page and join panel` | P1.4 |
| C16 | `feat(events): create form with validation` | P1.7 |
| C17 | `feat(events): manage list and edit form` | P1.7 |
| C18 | `feat(events): delete confirmation dialog` | P1.7 |
| C19 | `feat(auth): better-auth with mongodb adapter` | P2.1 |
| C20 | `feat(auth): register page with password rules` | P2.2 |
| C21 | `feat(auth): login page and google sign-in` | P2.2 |
| C22 | `feat(auth): session navbar and profile menu` | P2.3 |
| C23 | `feat(auth): protected route group` | P2.4 |
| C24 | `feat(events): join and leave an event` | P2.6 |
| C25 | `feat(events): joined page with impact summary` | P2.6 |
| C26 | `feat(profile): view and update profile` | P2.7 |
| C27 | `feat(ui): skeletons and empty states audit` | P2.7 |
| C28 | `feat(api): attach jwt and refresh on 401` | P3.1 |
| C29 | `docs: readme with live url and feature list` | P3.5 |

**Server**

| # | Message | Phase |
| --- | --- | --- |
| S01 | `chore: express and typescript scaffold` | P0.5 |
| S02 | `feat: env validation and mongo connection` | P0.5 |
| S03 | `feat(models): event and join schemas with indexes` | P0.5 |
| S04 | `feat: health route and error handling` | P0.5 |
| S05 | `feat(events): public list and detail endpoints` | P1.1 |
| S06 | `feat(events): create endpoint with validation` | P1.6 |
| S07 | `feat(events): update and delete with ownership` | P1.6 |
| S08 | `feat(events): joined and mine endpoints` | P1.6 |
| S09 | `chore: idempotent seed script` | P0.5 |
| S10 | `feat(auth): verify better-auth jwts via jwks` | P3.2 |
| S11 | `feat(security): protect write routes` | P3.2 |
| S12 | `feat(security): ownership checks on events` | P3.3 |
| S13 | `feat(validation): zod schemas and error envelope` | P3.3 |
| S14 | `feat(security): cors, helmet and rate limits` | P3.4 |
| S15 | `test: auth and ownership matrix` | P3.5 |
| S16 | `docs: server readme and env example` | P3.5 |

Stop and hand over at each row — do not run to the end of the day and commit in a
batch. A commit that contains three features reads as one, and the count is
graded. Each stop is also the moment the human can redirect the work cheaply.

---

## 10. QA and test plan

### 10.1 Scriptable

```bash
# health
curl -s $API/api/health | jq

# home limit
curl -s "$API/api/events?limit=6" | jq '.data | length'          # ≤ 6

# upcoming only
curl -s "$API/api/events" | jq '[.data[] | select(.date < now)] | length'   # 0

# no token
curl -i -X POST $API/api/events -H "Content-Type: application/json" -d '{}' # 401

# bad token
curl -i -X POST $API/api/events -H "Authorization: Bearer nope" -d '{}'      # 401

# wrong owner
curl -i -X PATCH $API/api/events/$ID -H "Authorization: Bearer $OTHER" \
  -H "Content-Type: application/json" -d '{"title":"Hijacked"}'               # 403

# past date
curl -i -X POST $API/api/events -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test event","description":"A valid description for testing.","type":"Cleanup","image":"https://example.com/a.jpg","location":"Dhaka","date":"2020-01-01T00:00:00Z","capacity":10}'  # 400

# duplicate join
curl -i -X POST $API/api/events/$ID/join -H "Authorization: Bearer $TOKEN"   # 2nd 409

# cors
curl -i -H "Origin: https://evil.example" $API/api/events | grep -i access-control  # no allow header
```

### 10.2 Manual, on the live site, both themes

- [ ] Register → toast → Home signed in.
- [ ] Log out → navbar shows **Log in**.
- [ ] Reload `/events/manage` signed in → stays.
- [ ] Incognito → `/login?next=…` once, no loop.
- [ ] Create → toast → Upcoming → card present.
- [ ] Edit → card updates.
- [ ] Delete → dialog → cancel keeps → confirm removes.
- [ ] Second account joins → Joined page shows it.
- [ ] Full event → disabled button.
- [ ] Past event in Atlas → hidden.
- [ ] Theme toggle on all routes.
- [ ] 390 / 768 / 1280 on Home, Upcoming, Detail, Manage, Login.
- [ ] Console clean everywhere.
- [ ] No `alert` fired in any flow.
- [ ] Reload `/events/[id]`, `/login`, `/profile` — no error.

### 10.3 Accessibility spot-check

- [ ] Tab through Home, Login, Create: focus always visible.
- [ ] Profile menu: Enter opens, `Esc` closes, focus returns.
- [ ] Dialog traps focus and restores it.
- [ ] Images have alt (decorative `alt=""`).
- [ ] Lighthouse a11y ≥ 95 on Home and Login.

---

## 11. Deployment runbook

**Order: Atlas → server → client → OAuth → verify.**

1. **Atlas** — M0, database `shomajshathi`, user with `readWrite`, network
   `0.0.0.0/0`. Copy the SRV string, append `/shomajshathi`.
2. **Render** — New Web Service → server repo → build `npm ci && npm run build`
   → start `npm start` → health `/api/health`. Add every env from §6.3 with
   production values. Deploy, seed once.
3. **Vercel** — import client repo, framework Next.js, add env vars **before**
   deploying. `NEXT_PUBLIC_API_URL` = Render URL.
4. **Google OAuth** — authorised origins `http://localhost:3000` + Vercel domain;
   redirect URIs `/api/auth/callback/google` on both.
5. **CORS** — `CLIENT_ORIGIN` exactly the Vercel origin.
6. **Verify** — §10.2 live. Render cold start can take 50s; don't debug before
   two minutes.

Changing the domain breaks JWT issuer/audience. If you add a custom domain,
update `BETTER_AUTH_URL`, `BETTER_AUTH_ISSUER`, `BETTER_AUTH_AUDIENCE` and
redeploy both services.

---

## 12. Submission checklist

- [ ] Client repo public; README has name, live URL, ≥5 feature bullets.
- [ ] Server repo public; README documents endpoints and env.
- [ ] `git log` shows ≥15 / ≥8 meaningful commits, each written by hand at a
      handoff stop — no squashed batch, no agent-authored commit.
- [ ] `.env` untracked; `git log -p | grep -i "mongodb+srv"` → nothing.
- [ ] Live site opens incognito with no console errors.
- [ ] Login, create, join, edit, delete all work live.
- [ ] Theme toggle works live.
- [ ] Both repo links + live link submitted before **3 Nov 23:59**.
- [ ] Screenshot the confirmation.

---

## 13. Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| BetterAuth + Next 16 mismatch | Low | High | 1.7.x declares `next ^16`; test in P2.1 before building forms |
| OAuth redirect mismatch | High | Medium | Set both URIs on day one |
| JWT issuer/audience mismatch | High | High | Derive from `BETTER_AUTH_URL`; log `iss`/`aud` on 401 in dev |
| Render cold start mistaken for a bug | High | Low | Warm before demo; show skeletons |
| Atlas blocks Render | Medium | High | `0.0.0.0/0` from the start |
| Duplicate joins / counter drift | Medium | Medium | Unique index; `$inc` after insert; test double-click |
| Optional features eat the buffer | Medium | Low | They are last; skeletons already built |
| `.env` committed | Low | Fatal | `.gitignore` + history grep before submitting |
| Next 16 API differences | Medium | Medium | Read `node_modules/next/dist/docs/` first |

---

## 14. Open items

| Item | Needed by | Owner |
| --- | --- | --- |
| Google OAuth client ID/secret | P2.1 | You |
| Atlas connection string | P0.5 | You |
| Vercel + Render projects | P1.5 | You |
| Approve extra packages (§5) | P0.1 | You (silence = approved) |
| Final wordmark | — | **Resolved:** `shomaj` + `shathi`, two-tone |
| Heading font | P0.2 | **Resolved:** Archivo Black + Archivo |

---

## Change log

| Date | Change |
| --- | --- |
| 1 Nov 2026 | v2.3 — **shadcn/ui adopted** as the primitive base (Radix behaviour, restyled to the poster system); install list, `components.json`, P0.2/P0.3 updated; second component libraries forbidden. |
| 1 Nov 2026 | v2.2 — brand renamed **Shomaj Shathi**; interface replaced with the poster system: white/black rules, Archivo Black caps, one orange (black text only), yellow categories band, sand dashboard sidebar, underline fields, no shadows. `DESIGN.md` rewritten end to end. |
| 31 Oct 2026 | `DESIGN.md` narrowed to the interface: routes, data, API and seed content live only here. Its §8 is now page compositions, not screens. |
| 31 Oct 2026 | v2.1 — commits are human-made: stop after every commit row, hand over the message, wait for `continue`. |
| 31 Oct 2026 | v2.0 — self-contained build-from-scratch PRD; P0 foundation; 29/16 commit plan. |
