# Shomaj Shathi

Shomaj Shathi is a civic events platform for organising and joining community
service work in Dhaka — cleanups, plantations, donation drives and education
circles, all in one place.

**Live site:** https://shomajshathi-app.vercel.app
**API:** https://shomajshathi-server.vercel.app

## Features

- Browse upcoming community events in a poster-style grid
- Search events by keyword and filter by type
- Open a public event detail page without an account
- Create, edit and delete your own service events
- Light and dark themes that persist across reloads
- Responsive layout from small phones to wide desktops
- Toast feedback for every create, update and delete action

## Stack

| Layer | Technology |
| --- | --- |
| Client | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| UI | Hand-built design system on shadcn/Radix primitives |
| Server | Express 5, TypeScript, native MongoDB driver |
| Database | MongoDB Atlas |
| Hosting | Vercel (client and server) |

## Routes

- `/` — home, upcoming events, gallery and about sections
- `/events` — browsable, searchable list of upcoming events
- `/events/[id]` — public event detail
- `/events/new` — create an event
- `/events/manage` — manage your own events
- `/events/[id]/edit` — edit an event you own
- `/styleguide` — the interface system in one page

## Local development

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_API_URL` to the deployed server Vercel URL before a Vercel
build. The API must allow the exact Vercel origin through `CLIENT_ORIGIN`.
For local CRUD verification, set the server's `ALLOW_ANON_WRITES=true` and
optionally set `NEXT_PUBLIC_DEV_EMAIL` to the same test email.

## Deployment checklist

- Vercel project uses `npm ci && npm run build`.
- `NEXT_PUBLIC_API_URL` is configured before the build.
- Reload `/`, `/events`, and `/events/<id>` after deployment.
- Keep environment files untracked; never commit credentials.
