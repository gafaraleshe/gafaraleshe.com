# gafaraleshe.com

Personal portfolio and CV site for **Gafar Aleshe** — Full-Stack Developer &
Creative Director. Built as a fast, single-page React app and deployed as a
static site on Vercel.

## Tech stack

- **React 19** + **TypeScript**
- **Vite 7** for dev/build
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **wouter** for routing
- **framer-motion** for animation
- **shadcn/ui** primitives (`button`, `card`, `sonner`, `tooltip`)
- **Vercel Analytics**

## Project structure

```
client/
  index.html          # App entry HTML
  public/assets/       # Static assets (resume, images)
  src/
    components/        # App components + ui/ (shadcn primitives)
    contexts/          # Theme context
    hooks/             # Reusable hooks
    lib/               # Utilities
    pages/             # Home, Links, NotFound
    main.tsx           # React entry
    index.css          # Tailwind + theme tokens
vite.config.ts        # Vite config (root: client, output: dist/public)
vercel.json           # Vercel build + SPA rewrites
```

## Getting started

Requires Node.js 22+ and [pnpm](https://pnpm.io/).

```bash
pnpm install      # install dependencies
pnpm dev          # start dev server at http://localhost:3000
pnpm build        # production build to dist/public
pnpm preview      # preview the production build
pnpm check        # type-check with tsc
pnpm format       # format with Prettier
```

## Deployment

Deployed to Vercel as a static SPA. Configuration lives in `vercel.json`:
build runs `pnpm build`, output is served from `dist/public`, and all routes
are rewritten to `index.html` for client-side routing.

## License

MIT
