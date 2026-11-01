# Shomaj Shathi

Shomaj Shathi is a civic events platform for organising and joining community
service work in Dhaka.

## Features

- Browse upcoming community events
- Search and filter events by type
- Open public event details without an account
- Create and manage service events
- Join events and keep a participation record
- Switch between light and dark themes

## Local development

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_API_URL` to the deployed Render API URL before a Vercel build.
The API must allow the exact Vercel origin through `CLIENT_ORIGIN`.

## Deployment checklist

- Vercel project uses `npm ci && npm run build`.
- `NEXT_PUBLIC_API_URL` is configured before the build.
- Reload `/`, `/events`, and `/events/<id>` after deployment.
- Keep environment files untracked; never commit credentials.
