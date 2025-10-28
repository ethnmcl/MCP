# Vercel MCP Prototype (Auth + Activities)

Minimal Next.js (App Router) API implementing MCP-compatible Auth and Activities servers.
**No legacy Vercel config**. Runtimes are pinned per-route with `export const runtime = 'nodejs'`.
Ready to deploy to Vercel.

## Install & Run
```bash
npm i
npm run dev
```

## Deploy to Vercel
- Push this repo to GitHub
- Import to Vercel (Framework: Next.js, defaults everywhere)
- No environment variables required for this prototype

## Endpoints
- Auth:
  - POST `/api/auth/request-otp` { sessionid, phone, purpose:"signin"|"signup" }
  - POST `/api/auth/verify-otp`  { sessionid, phone, code }
  - POST `/api/auth/login`       { sessionid, email, password, rememberme? }
  - POST `/api/auth/status`      { sessionid }
  - POST `/api/auth/signout`     { sessionid }
- Activities:
  - POST `/api/activities/list`            { sessionid, status?:"upcoming"|"completed"|"all" }
  - POST `/api/activities/projects-overview` { sessionid, focus? }
  - POST `/api/activities/pulses-log`      { sessionid, summary, villagerID? | firstName? + lastName? }
  - POST `/api/activities/pulses-history`  { sessionid }
  - POST `/api/activities/reset-session`   { sessionid }

## Quick cURL Smoke Test (replace YOUR_DOMAIN)
```bash
curl -s https://YOUR_DOMAIN/api/auth/request-otp -H "content-type: application/json"   -d '{"sessionid":"s1","phone":"+15555550123","purpose":"signin"}'

# copy debugCode
curl -s https://YOUR_DOMAIN/api/auth/verify-otp -H "content-type: application/json"   -d '{"sessionid":"s1","phone":"+15555550123","code":"123456"}'

curl -s https://YOUR_DOMAIN/api/auth/status -H "content-type: application/json"   -d '{"sessionid":"s1"}'

curl -s https://YOUR_DOMAIN/api/activities/list -H "content-type: application/json"   -d '{"sessionid":"s1","status":"all"}'
```
