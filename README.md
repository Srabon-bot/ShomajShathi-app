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
- Register with name, email, photo and password, or continue with Google or GitHub
- Log in, see your avatar in the navbar, and sign out from any page
- Create, edit and delete your own service events
- Join and leave events, and keep a joined-events list
- View and update your profile name and photo
- Protected member routes that survive a full reload
- Light and dark themes that persist across reloads
- Responsive layout from small phones to wide desktops
- Toast feedback for every create, update, join and profile action

## Stack

| Layer | Technology |
| --- | --- |
| Client | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| UI | Hand-built design system on shadcn/Radix primitives |
| Auth | BetterAuth with email/password, Google, GitHub and JWT/JWKS |
| Server | Express 5, TypeScript, native MongoDB driver, jose |
| Database | MongoDB Atlas |
| Hosting | Vercel (client and server) |

## Routes

Public:

- `/` — home, upcoming events, gallery and about sections
- `/events` — browsable, searchable list of upcoming events
- `/events/[id]` — public event detail
- `/login` — email, Google and GitHub sign in
- `/register` — create an account
- `/styleguide` — the interface system in one page

Signed in only:

- `/events/new` — create an event
- `/events/manage` — manage your own events
- `/events/[id]/edit` — edit an event you own
- `/events/joined` — events you have joined
- `/profile` — view and update your profile

## Local development

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_API_URL` to the deployed server Vercel URL before a Vercel
build. The API must allow the exact Vercel origin through `CLIENT_ORIGIN`.

Auth needs `MONGODB_URI`, `MONGODB_DB`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`
and `NEXT_PUBLIC_APP_URL` in `.env.local`. Add `GOOGLE_CLIENT_ID`,
`GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` to enable
the social buttons. OAuth callback URLs are
`<BETTER_AUTH_URL>/api/auth/callback/google` and
`<BETTER_AUTH_URL>/api/auth/callback/github`.

Signed-in pages fetch a short-lived JWT with `authClient.token()` and send it
to the API as `Authorization: Bearer <token>`. `src/proxy.ts` redirects
signed-out visitors from member routes to `/login?next=…`.

## Deployment checklist

- Vercel client project uses `npm ci && npm run build`.
- `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_APP_URL`, `BETTER_AUTH_URL`,
  `BETTER_AUTH_SECRET`, `MONGODB_URI` and `MONGODB_DB` are configured before
  the build.
- `BETTER_AUTH_URL` is the exact deployed origin, and the same origin is set
  as `CLIENT_ORIGIN` on the API.
- OAuth apps list the exact callback URLs for the deployed origin.
- Reload `/`, `/events`, `/events/<id>`, `/events/manage` and `/profile` after
  deployment.
- Keep environment files untracked; never commit credentials.
