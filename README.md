# Orphan Wear

The original Orphan brand. One of one streetwear, made in house since 2023.

Source for the Orphan Wear website: a scroll-driven 3D storefront with a cursor-reactive hero tee (React Three Fiber / WebGL), floating 3D product models, and the brand's catalog sections.

## Stack

- React 19 + TanStack Start (SSR, single Cloudflare Worker)
- Tailwind CSS v4, custom design tokens
- React Three Fiber + drei (3D hero and product models)
- GLB models generated from product photography

## Run locally

```bash
cd app
bun install
bun run dev
```

## Deploy

The site builds and deploys through the platform build (no separate config needed):

```bash
cd app
bun run typecheck   # tsc --noEmit
```

Live: https://orphan-wear.higgsfield.app
