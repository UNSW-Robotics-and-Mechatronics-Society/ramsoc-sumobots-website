# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- `npm run dev` — Local dev server with Turbopack
- `npm run build` — Production build (also generates sitemap via postbuild)
- `npm run lint` — ESLint
- `npm run preview` — Local preview using Cloudflare Workers
- `npm run cf-typegen` — Generate Cloudflare environment typings
- **Use npm only, not yarn** (package-lock.json required for Cloudflare deployment)

## Architecture

**Next.js 15 App Router** deployed to **Cloudflare Workers** via OpenNext.js.

### Year-based routing

Content is organized by competition year: `/2025`, `/2024`, etc. The root `/` redirects to the current year (configured in `next.config.ts`). Each year directory is self-contained with its own components, data, and pages. Legacy years are preserved as archives.

### Directory conventions (under `src/app/[YEAR]/`)

- `_components/` — Reusable UI components (prefixed `_` to exclude from routing)
- `_data/` — Static TypeScript data files (timetable, socials, logos, resources)
- `_types/` — TypeScript type definitions
- `hooks/` — React hooks (e.g., `useIsMobile`)
- Shared utilities live in `src/app/_utils/` (cn, googlesheet, recaptcha, teamProfiles)

### Key patterns

- Path alias: `@/*` → `./src/*`
- `cn()` utility (`src/app/_utils/cn.ts`) combines clsx + tailwind-merge for conditional class names
- Client components use `"use client"` directive; server actions use `"use server"`
- Animations via Framer Motion (`motion/react`)
- **TailwindCSS v4** with `@tailwindcss/postcss` plugin — custom theme, utilities, and component classes defined in `src/app/styles.css`
- Contentful CMS for remote images (`images.ctfassets.net`)
- Google Sheets API integration for form submissions (server action)

## Git Conventions

PR titles must follow conventional commits, enforced by CI:
```
^(feat|fix|docs|style|refactor|perf|test|chore)(\([^)]+\))?: .+$
```

## Updating for a new year

1. Change redirect in `next.config.ts`
2. Update URLs/form links in `src/app/constants.ts`
3. Create new `src/app/[YEAR]/` directory (copy and modify from previous year)
