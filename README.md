# DronePilot · Drone Monitoring Platform

Enterprise web application for real-time drone fleet monitoring built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma** and **PostgreSQL**.

The project's goal is to demonstrate — in a single production-ready app — all four modern web rendering patterns:

| Pattern | Route | How it works |
|---|---|---|
| **CSR** (Client-Side Rendering) | `/dashboard` | Data is fetched from the browser via React Query and refreshed every 5 s; positions are simulated client-side on an interactive map. |
| **SSR** (Server-Side Rendering) | `/drones/[id]` | Telemetry (status, battery, mission) is resolved on the server on every request (`force-dynamic`). |
| **SSG** (Static Site Generation) | `/` and `/about` | Pages are pre-rendered once at build time and served as static content. |
| **ISR** (Incremental Static Regeneration) | `/missions` | The page is pre-rendered and revalidated in the background every 60 seconds. |

> **UI language:** the interface is in **Spanish**; source code (identifiers, comments, commits) is in **English**.

---

## 1. Explanation of rendering patterns

### CSR — Client-Side Rendering (`/dashboard`)
- **How:** the page shell is served by Next.js and the data is fetched in the browser. `useDrones()` (React Query) polls `GET /api/drones` every 5 s; the "Simular vuelo en vivo" toggle applies a random-walk telemetry simulation every 2 s. The SVG map and telemetry panel re-render entirely in the client.
- **Why here:** the dashboard is interactive, frequently updated and highly personal. Rendering it on the client keeps the server load minimal and gives the user an instant, live feel.

### SSR — Server-Side Rendering (`/drones/[id]`)
- **How:** the page calls the service layer (`DroneService`, `MissionService`) directly from a Server Component on **every request** and exports `dynamic = "force-dynamic"`.
- **Why here:** a drone detail page must always show fresh telemetry (battery, status, last seen). A cached version would show stale — potentially dangerous — operational data.

### SSG — Static Site Generation (`/` and `/about`)
- **How:** both pages contain only static content. They are pre-rendered at build time (`○ Static` in the build output) and served from the edge/CDN without database or server compute.
- **Why here:** marketing/institutional content is identical for every visitor, so generating it once at build time is the fastest and cheapest option.

### ISR — Incremental Static Regeneration (`/missions`)
- **How:** the page exports `revalidate = 60`. At build time it is pre-rendered; afterwards, a background job regenerates it at most once per minute. If the database is temporarily unreachable during generation, the page falls back to an empty state and self-heals on the next revalidation (a warning banner is shown).
- **Why here:** mission history changes, but not every second. ISR gives static-page performance with near-real-time freshness — the best trade-off for lists that update occasionally.

---

## 2. Architecture diagram (text)

```
┌────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                        │
│   /  /about      /dashboard            /drones/[id]  /missions │
│   SSG            CSR                    SSR           ISR       │
│   (static)       React Query +          (Server       (revalidate
│                  live simulation         Component)    60 s)     │
└──────┬───────────────┬─────────────────────┬───────────────────┘
       │               │  fetch (CSR)        │  direct call (SSR/ISR)
       ▼               ▼                     ▼
┌────────────────────────────────────────────────────────────────┐
│                       UI LAYER  (components/, app/)            │
│   Reusable primitives: Card, Badge, Spinner, StatCard, Map...  │
└────────────────────────────────────────────────────────────────┘
       │                       │                        │
       ▼                       ▼                        ▼
┌────────────────────────────────────────────────────────────────┐
│                  SERVICE LAYER  (services/)                    │
│   DroneService  ·  MissionService  ·  DTO mapping  ·  Logging   │
└────────────────────────────────────────────────────────────────┘
       │                       │                        │
       ▼                       ▼                        ▼
┌────────────────────────────────────────────────────────────────┐
│                  DATA LAYER  (repositories/, lib/, types/)     │
│   DroneRepository  ·  MissionRepository  ·  PrismaClient        │
│   Typed errors (DataAccessError, NotFoundError)                 │
└────────────────────────────────────────────────────────────────┘
       │
       ▼
┌────────────────────────────────────────────────────────────────┐
│                    DATABASE  (PostgreSQL)                      │
│    Drone (id, name, status, battery, lat, lng, ...)            │
│    Mission (id, droneId, startTime, endTime, status)            │
└────────────────────────────────────────────────────────────────┘
```

Clean architecture rules applied:
- **UI Layer** → `app/`, `components/` (no direct DB access).
- **Service Layer** → `services/` (business rules, DTO mapping, validation).
- **Data Layer** → `repositories/` + `lib/prisma.ts` + `types/` (all SQL/ORM access).
- Dependencies point **inward**: UI → Services → Repositories.

---

## 3. Tech stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS (dark/light mode via class strategy)
- **Data fetching:** TanStack React Query (CSR) + Server Components (SSR/ISR/SSG)
- **ORM:** Prisma 6 with PostgreSQL
- **Validation:** Zod (API query params)
- **Logging:** structured JSON logger (`lib/logger.ts`)
- **Deploy:** Railway or Render (Docker + blueprints included)

## 4. Project structure

```
app/
  page.tsx            # Landing (SSG)
  layout.tsx          # Root layout (Spanish metadata, theme, fonts)
  about/page.tsx      # SSG
  dashboard/page.tsx  # CSR
  drones/[id]/page.tsx# SSR
  missions/page.tsx   # ISR (revalidate: 60)
  api/drones/...      # REST endpoints
components/           # UI layer (layout/, ui/, dashboard/, drones/, missions/)
hooks/                # useDrones, useLiveSimulation (CSR)
lib/                  # prisma client, logger, errors, constants, utils, api helpers
repositories/         # Data access layer
services/             # Business logic layer
types/                # Domain contracts (Drone, Mission, API)
prisma/               # Schema, seed, migrations
```

## 5. API reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/drones` | Full fleet as lightweight summaries |
| GET | `/api/drones/:id` | Single drone (404 if not found) |
| PATCH | `/api/drones/:id` | Update telemetry (live simulation sync) |
| GET | `/api/missions` | Paginated missions; filters `?page&pageSize&status&droneId` |

All responses use a consistent envelope: `{ data }` or `{ error: { code, message } }`.

## 6. Local development

Requirements: Node 20+, PostgreSQL (or Docker).

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env          # edit DATABASE_URL

# 3. Start a database (Docker) or use your own PostgreSQL
docker run -d --name drone-monitoring-db \
  -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=drone_monitoring -p 5432:5432 postgres:16-alpine

# 4. Create the schema, apply migrations and seed mock data
npx prisma migrate deploy
npm run db:seed

# 5. Run the app
npm run dev                   # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`, `npm run prisma:deploy`.

## 7. Deployment to the cloud

### Option A — Render (recommended)
1. Push this repository to GitHub.
2. In Render: **New → Blueprint** → connect the repo.
3. `render.yaml` automatically creates the **web service** + **PostgreSQL** database and wires `DATABASE_URL`.
4. Render builds (`npm run build`), applies migrations (`prisma migrate deploy`) and starts the app.
5. Set `NEXT_PUBLIC_APP_URL` in the Render environment to your service URL.

### Option B — Railway
1. Push this repository to GitHub.
2. In Railway: **New Project → Deploy from GitHub** → select the repo (the included `railway.json` sets build/start commands).
3. Add a **PostgreSQL** plugin; Railway injects `DATABASE_URL`.
4. Set `NEXT_PUBLIC_APP_URL` and deploy.

> Both platforms run `npx prisma migrate deploy` before starting so the schema is always up to date.

## 8. Quality & best practices

- Loading states (`Spinner`), error boundaries (`error.tsx`) and error states (`ErrorState`).
- Graceful degradation when the database is unavailable.
- Structured JSON logging with configurable `LOG_LEVEL`.
- SOLID-inspired layered architecture with dependency injection via singletons.
- Semantic HTML, ARIA labels and responsive layout.
- Type safety with strict TypeScript; validated query params with Zod.