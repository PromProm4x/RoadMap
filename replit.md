# DevRoadmap

An interactive web-development learning platform that guides learners from first principles to job-ready projects.

## Run & Operate

- `pnpm run dev` — run both API server (port 5000) and Web app (port 3000) concurrently
- `pnpm run dev:server` — run the API server (port 5000)
- `pnpm run dev:web` — run the Vite frontend (port 3000)
- `pnpm run db:init` — initialize database schema and verify connection
- `pnpm run db:verify` — run end-to-end database read/write/delete verification
- `pnpm run db:docker` — start PostgreSQL 16 container via Docker Compose (optional)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- Database options in `.env`:
  - `DATABASE_URL=local` (default) — zero-setup embedded persistent PostgreSQL in `.data/devroadmap.db`
  - `DATABASE_URL=postgresql://user:pass@localhost:5432/devroadmap` — external PostgreSQL (Docker, Laragon, Supabase, Neon)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
