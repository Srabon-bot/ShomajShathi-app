<div align="center">

<br />

# Shomaj Shathi

A civic events platform for organising and joining community service work in Dhaka — cleanups, plantations, donation drives, and education circles.

<br />

[![Live Site](https://img.shields.io/badge/Live%20Site-shomajshathi--app.vercel.app-22c55e?style=for-the-badge&logo=vercel&logoColor=white)](https://shomajshathi-app.vercel.app)
&nbsp;
[![API](https://img.shields.io/badge/API-shomajshathi--server.vercel.app-6366f1?style=for-the-badge&logo=express&logoColor=white)](https://shomajshathi-server.vercel.app)

<br />

![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React%2019-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%204-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB%20Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

<br />

</div>

---

## Overview

Community service in Dhaka is organised through WhatsApp groups and Facebook posts — events get lost, attendance is unknown, and there is no record of what was done. Shomaj Shathi gives organisers and participants one place to create an event, find it, join it, and track their history. The interface is designed to look printed and civic rather than template-generated.

---

## Screenshots

<div align="center">

### Home & Navigation

![Homepage Hero](./public/screenshots/home-hero.png)

### Events Directory & Search

![Events Directory](./public/screenshots/events-list.png)

### Event Detail & Participation

![Event Detail](./public/screenshots/event-detail.png)

<br />

| Authentication (Dark Mode) | Member Menu |
|:---:|:---:|
| <img src="./public/screenshots/auth-login.png" width="480" alt="Sign In" /> | <img src="./public/screenshots/profile-menu.png" width="320" alt="Profile Dropdown" /> |

</div>

---

## Features

- Browse upcoming community events in a poster-style grid
- Search events by keyword and filter by type
- View a full public event detail page without creating an account
- Register with name, email, photo, and password, or continue with Google or GitHub
- Authenticated avatar in the navbar with display-name tooltip on hover
- Create, edit, and delete your own service events
- Join and leave events; maintain a personal joined-events list
- View and update your profile display name and photo
- Protected member routes that survive a full browser reload
- Light and dark themes that persist across sessions
- Responsive layout from mobile to wide desktop
- Toast notifications for every create, update, join, and profile action

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 — App Router, Server Components, middleware |
| UI library | React 19 |
| Language | TypeScript throughout, client and server |
| Styling | Tailwind CSS v4 |
| Components | Hand-built design system on shadcn/ui and Radix UI primitives |
| Authentication | BetterAuth — email/password, Google, GitHub, JWT/JWKS |
| Database | MongoDB Atlas via the native Node.js driver |
| Forms | React Hook Form with Zod schema validation |
| Carousel | Embla Carousel with autoplay |
| Icons | Lucide React |
| Notifications | Sonner |
| Hosting | Vercel |

---

## Routes

**Public**

| Route | Page |
|---|---|
| `/` | Home — hero, upcoming events, gallery carousel, area index |
| `/events` | Searchable and filterable events list |
| `/events/[id]` | Event detail with join status |
| `/events/past` | Archive of completed events |
| `/login` | Email, Google, and GitHub sign-in |
| `/register` | Account creation |
| `/styleguide` | Full design system reference |

**Signed-in only**

| Route | Page |
|---|---|
| `/events/new` | Create a new event |
| `/events/manage` | Manage your own events |
| `/events/[id]/edit` | Edit an event you own |
| `/events/joined` | Events you have joined |
| `/profile` | View and update your profile |

---

## Project Structure

```
client/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── (auth)/                   # Login and register (shared layout)
│   │   ├── events/                   # Events pages and nested routes
│   │   │   ├── [id]/                 # Detail and edit pages
│   │   │   ├── joined/
│   │   │   ├── manage/
│   │   │   ├── new/
│   │   │   └── past/
│   │   ├── profile/
│   │   ├── styleguide/
│   │   ├── api/auth/[...all]/        # BetterAuth route handler
│   │   ├── layout.tsx
│   │   └── page.tsx                  # Home page
│   ├── components/
│   │   ├── auth/                     # Auth forms, social provider buttons
│   │   ├── events/                   # Cards, rows, forms, join button, dialogs
│   │   ├── home/                     # Hero sections, carousel, area index
│   │   ├── layout/                   # Navbar, footer, mobile menu, profile menu
│   │   ├── profile/                  # Profile form
│   │   └── ui/                       # Design system primitives
│   ├── lib/                          # API clients, auth helpers, validation schemas
│   └── proxy.ts                      # Middleware — redirects unauthenticated visitors
├── public/
├── .env.example
└── package.json
```

---

## Local Development

**Prerequisites:** Node.js 20+, a MongoDB Atlas cluster, and optionally Google and GitHub OAuth apps.

```powershell
# Install dependencies
npm ci

# Copy the environment template
Copy-Item .env.example .env.local

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Scripts**

| Command | Description |
|---|---|
| `npm run dev` | Development server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type-check without emitting |

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values.

```env
# API URL — points at your running Express server
NEXT_PUBLIC_API_URL=http://localhost:5000

# Client origin — must match BETTER_AUTH_URL exactly
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=<random 32+ character string>

# MongoDB — used by BetterAuth for session storage
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net
MONGODB_DB=shomaj_shathi

# Social login — leave blank to hide the provider buttons
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

OAuth callback URLs to register with each provider:

| Provider | Callback URL |
|---|---|
| Google | `<BETTER_AUTH_URL>/api/auth/callback/google` |
| GitHub | `<BETTER_AUTH_URL>/api/auth/callback/github` |

---

## Authentication Flow

Signed-in pages obtain a short-lived JWT from `authClient.token()` and send it to the Express API as `Authorization: Bearer <token>`. The API verifies the token against the client's public JWKS endpoint at `<BETTER_AUTH_URL>/api/auth/jwks`. The middleware in `src/proxy.ts` redirects unauthenticated visitors from protected routes to `/login?next=…` and restores them after sign-in.

---

## Deployment Checklist

- [ ] Vercel build command: `npm ci && npm run build`
- [ ] Set `NEXT_PUBLIC_API_URL` to the deployed server URL before the build runs
- [ ] Set `BETTER_AUTH_URL` to the exact deployed client origin (no trailing slash)
- [ ] Confirm `CLIENT_ORIGIN` on the server matches `BETTER_AUTH_URL`
- [ ] Configure all environment variables in Vercel before triggering the first build
- [ ] Update OAuth app callback URLs to the deployed origin
- [ ] Smoke-test reloading `/`, `/events`, `/events/<id>`, `/events/manage`, and `/profile`
- [ ] Never commit `.env.local` or any credentials

---

<div align="center">

[shomajshathi-app.vercel.app](https://shomajshathi-app.vercel.app)

</div>
