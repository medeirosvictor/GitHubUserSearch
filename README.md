# GitHub User Search

Search GitHub users by name and location, browse results in an interactive grid, and view detailed profile cards.

## Tech Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite 7** with SWC
- **React Router DOM 7** — client-side routing (`/` search, `/user/:username` profile)
- **TanStack Query** — data fetching, caching, and back-navigation persistence
- **Tailwind CSS 4** — utility-first styling with custom theme tokens
- **Framer Motion** — animations (CountUp, ProfileCard transitions)
- **Three.js + postprocessing** — WebGL GridScan background effect (reactbits)
- **pnpm** — package manager

## Getting Started

```bash
pnpm install
pnpm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start dev server |
| `pnpm run build` | TypeScript check + production build |
| `pnpm run preview` | Preview production build |
| `pnpm run lint` | ESLint |

## Deploy to GitHub Pages

1. Push your code to GitHub

2. Install the deploy dependency:
   ```bash
   pnpm add -D gh-pages
   ```

3. The `deploy` script is already configured. Run:
   ```bash
   pnpm run deploy
   ```

4. In your GitHub repo, go to **Settings → Pages** and set:
   - **Source:** Deploy from a branch
   - **Branch:** `gh-pages` / `/ (root)`

5. Your site will be live at `https://<username>.github.io/GitHubUserSearch/`

## Features

- Search GitHub users by name and optional location filter
- Paginated results in a ChromaGrid with hover glow effects
- Animated user count (CountUp)
- Click a user card → profile page with avatar, bio, stats, links
- Back navigation preserves search results (TanStack Query cache + URL params)
- WebGL grid scan background with mouse-reactive parallax toggle
- Rate limit detection and warnings

## Project History

Migrated from Angular 1 → React 19 (2025), then progressively enhanced with routing, TanStack Query, Three.js background, and reactbits-inspired UI components.
