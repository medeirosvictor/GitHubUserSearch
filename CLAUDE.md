# CLAUDE.md

This file provides guidance to AI coding agents (Claude Code, pi, etc.) when working with code in this repository.

## Project Overview

GitHub User Search is a React single-page app that searches GitHub users via the GitHub REST API and displays results in a paginated card grid. Built with React 19, TypeScript, Tailwind CSS 4, and Vite.

## Architecture

SPA with React Router. Two routes: search home and user profile detail.

- **App.tsx** — Layout shell. Renders GridScan background + `<Routes>`.
- **Home.tsx** — Search page. Holds `users`, `statusMessage`, `totalCount` state. Renders Header, SearchForm, SearchResults.
- **UserProfile.tsx** — Profile page at `/user/:username`. Fetches full user details from GitHub API, renders ProfileCard.
- **Header.tsx** — Logo display.
- **SearchForm.tsx** — Name + location inputs. Calls GitHub Search Users API and passes results up via props.
- **SearchResults.tsx** — Displays user cards in a ChromaGrid with client-side pagination. Animated CountUp for total results.
- **ChromaGrid.tsx** — Grid layout with chromatic glow effect on hover (reactbits-inspired).
- **UserCard.tsx** — Single user card. Links to `/user/:login` profile route.
- **ProfileCard.tsx** — Detailed profile card with avatar, bio, stats, meta tags, and GitHub link (reactbits-inspired).
- **Pagination.tsx** — Page number buttons.
- **CountUp.tsx** — Animated number counter (framer-motion spring).
- **GridScan.tsx** — Canvas-based grid background with scanning line.

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Search form + results grid |
| `/user/:username` | UserProfile | Fetches GitHub user details, shows ProfileCard |

## Data Flow

```
SearchForm (fetches from GitHub Search API)
  ↓ setUsers / setStatusMessage / setTotalCount (lifted state in Home)
Home
  ↓ users / statusMessage / totalCount (props)
SearchResults → ChromaGrid → UserCard[] + Pagination

UserCard (click) → navigate to /user/:login
UserProfile → fetches /users/:username → ProfileCard
```

## API

Uses the public GitHub Search Users endpoint:
```
GET https://api.github.com/search/users?q={name}[+in:fullname+repos:>4+location:{location}]
```

No authentication — subject to GitHub's rate limits (10 requests/minute for unauthenticated).

## Key Files

```
index.html              # Entry point
src/
  main.tsx              # React root mount + BrowserRouter
  App.tsx               # Layout shell, routes, GridScan background
  index.css             # Global styles, Tailwind theme config, Google Fonts
  types.ts              # Shared types (User, GitHubUserDetail)
  pages/
    Home.tsx            # Search page (form + results)
    UserProfile.tsx     # User detail page (fetches + ProfileCard)
  components/
    Header.tsx          # Logo
    SearchForm.tsx      # Search inputs + API call
    SearchResults.tsx   # Results grid (ChromaGrid) + pagination wrapper
    ChromaGrid.tsx      # Grid with chromatic glow hover effect
    UserCard.tsx        # Individual user card (links to profile)
    ProfileCard.tsx     # Detailed user profile card
    Pagination.tsx      # Page controls
    CountUp.tsx         # Animated number counter
    GridScan.tsx        # Canvas grid background with scan line
  assets/
    logo.png            # App logo
    react.svg           # React icon
```

## Commands

```bash
pnpm install            # Install dependencies
pnpm run dev            # Start Vite dev server
pnpm run build          # TypeScript check + production build
pnpm run lint           # ESLint
pnpm run preview        # Preview production build
```

## Tech Stack

- React 19 + TypeScript (strict)
- React Router DOM 7 for client-side routing
- Framer Motion for animations (CountUp, ProfileCard)
- Vite 7 with SWC plugin
- Tailwind CSS 4 with `@tailwindcss/vite`
- DaisyUI (installed but not actively used)
- Heroicons (installed but not actively used)
- Path alias: `@/` → `src/`
- Package manager: **pnpm**

## Code Style

- Functional components with `FC` type annotation
- Tailwind utility classes (inline + object maps for complex components)
- Custom Tailwind theme tokens defined in `index.css` under `@theme`
- Google Fonts: DM Sans (primary), Montserrat (available but unused)
- Color palette: gray (neutral), primary (purple), secondary (navy)
- ~~`User` interface duplicated across components~~ — Fixed: shared types in `src/types.ts`

## Known Issues

- `User` interface is defined separately in `App.tsx`, `SearchForm.tsx`, `SearchResults.tsx`, and `UserCard.tsx` instead of a shared type
- DaisyUI and Heroicons are in dependencies but not used
- No error boundary
- No loading spinner/skeleton
- No tests
- GitHub API rate limiting not handled in the UI
