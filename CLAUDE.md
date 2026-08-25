@AGENTS.md

## Package Manager

Always use **bun** for this project. Never use npm or npx.

```bash
bun install           # install dependencies
bun add <pkg>         # add a package
bun run dev           # start dev server
bun run build         # build for production
bun run lint          # lint
bunx <cmd>            # execute package binaries (replaces npx)
```

## Project Overview

Personal portfolio site — Next.js 16 (App Router), shadcn/ui, Tailwind v4, framer-motion.
- `app/` — routes and pages (Server Components by default)
- `components/` — UI components (`'use client'` only when needed)
- `lib/github.ts` — GitHub API fetching (uses `'use cache'` directive)
- Space background: canvas hyperspace animation in `components/space-background.tsx`
- Forced dark mode: `dark` class always on `<html>`

## Key Conventions

- `cacheComponents: true` is enabled in `next.config.ts` — use `'use cache'` + `cacheLife()` for caching
- Do NOT use `new Date()` in Server Components (Next.js 16 restriction with cacheComponents)
- Do NOT use `next: { revalidate }` in fetch — use `'use cache'` directive instead
- `'use client'` is required for: canvas, useEffect, framer-motion, usePathname, useState
