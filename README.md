<div align="center">

# Shomaj Shathi

A civic events platform for organising and joining community service work in Dhaka — cleanups, plantations, donation drives, and education circles.

[![Live Site](https://img.shields.io/badge/Live%20Site-shomajshathi--app.vercel.app-22c55e?style=for-the-badge&logo=vercel&logoColor=white)](https://shomajshathi-app.vercel.app)
&nbsp;
[![Live API](https://img.shields.io/badge/Live%20API-shomajshathi--server.vercel.app-6366f1?style=for-the-badge&logo=express&logoColor=white)](https://shomajshathi-server.vercel.app)
&nbsp;
[![API Repository](https://img.shields.io/badge/API%20Repo-ShomajShathi--server-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Srabon-bot/ShomajShathi-server)

</div>

---

## Overview

Community service in Dhaka is organised through WhatsApp groups and Facebook posts — events get lost, attendance is unknown, and there is no record of what was done. Shomaj Shathi gives organisers and participants one place to create an event, find it, join it, and track their history.

**Live site:** [https://shomajshathi-app.vercel.app](https://shomajshathi-app.vercel.app)

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
| Framework | ![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=flat-square&logo=nextdotjs&logoColor=white) App Router, Server Components, middleware |
| UI library | ![React](https://img.shields.io/badge/React%2019-61DAFB?style=flat-square&logo=react&logoColor=black) |
| Language | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| Styling | ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%204-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) |
| Components | ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=flat-square&logo=shadcnui&logoColor=white) ![Radix UI](https://img.shields.io/badge/Radix%20UI-5B5BD6?style=flat-square&logo=radixui&logoColor=white) |
| Authentication | ![BetterAuth](https://img.shields.io/badge/BetterAuth-6366F1?style=flat-square&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiAxYTUgNSAwIDAgMC01IDV2M0g2YTIgMiAwIDAgMC0yIDJ2MTBhMiAyIDAgMCAwIDIgMmgxMmEyIDIgMCAwIDAgMi0yVjExYTIgMiAwIDAgMC0yLTJoLTFWNmE1IDUgMCAwIDAtNS01em0tMyA1YTMgMyAwIDAgMSA2IDB2M0g5VjZ6Ii8+PC9zdmc+) ![JWT](https://img.shields.io/badge/JWT-D63AFF?style=flat-square&logo=jsonwebtokens&logoColor=white) Email/password, Google, GitHub |
| Database | ![MongoDB](https://img.shields.io/badge/MongoDB%20Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white) |
| Forms | ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white) ![Zod](https://img.shields.io/badge/Zod-3068B7?style=flat-square&logo=zod&logoColor=white) |
| Carousel | ![Embla Carousel](https://img.shields.io/badge/Embla%20Carousel-8A4FFF?style=flat-square&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxyZWN0IHg9IjIiIHk9IjYiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxMiIgcng9IjIiLz48cmVjdCB4PSIxOCIgeT0iOCIgd2lkdGg9IjQiIGhlaWdodD0iOCIgcng9IjEiIG9wYWNpdHk9Ii42Ii8+PC9zdmc+) |
| Icons | ![Lucide](https://img.shields.io/badge/Lucide%20React-F56565?style=flat-square&logo=lucide&logoColor=white) |
| Notifications | ![Sonner](https://img.shields.io/badge/Sonner-F59E0B?style=flat-square&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik00IDVoMTZhMiAyIDAgMCAxIDIgMnY2YTIgMiAwIDAgMS0yIDJoLTZsLTQgNHYtNEg0YTIgMiAwIDAgMS0yLTJWN2EyIDIgMCAwIDEgMi0yeiIvPjwvc3ZnPg==) |
| Hosting | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) |

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

**Signed-in only**

| Route | Page |
|---|---|
| `/events/new` | Create a new event |
| `/events/manage` | Manage your own events |
| `/events/[id]/edit` | Edit an event you own |
| `/events/joined` | Events you have joined |
| `/profile` | View and update your profile |

---

## Authentication

Signed-in pages get a short-lived JWT from BetterAuth and send it to the Express API as `Authorization: Bearer <token>`. The API verifies it against the client's JWKS endpoint, and `src/proxy.ts` redirects unauthenticated visitors from protected routes to `/login`.

---

## Local Development

**Prerequisites:** Node.js 20+, a MongoDB Atlas cluster, and optionally Google and GitHub OAuth apps.

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Fill in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=<random 32+ character string>

MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net
MONGODB_DB=shomaj_shathi

# Leave blank to hide the social login buttons
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```
