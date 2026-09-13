# Orphan Wear

The original Orphan brand. One of one streetwear, made in house since 2023.

A 3D storefront: the hero tee is a real WebGL model that tilts toward the
cursor (with a white cursor-tracking light), dissolves on scroll, and the
drop section floats 3D product models. Everything pitched on a black
blueprint grid with JetBrains Mono type and safety-yellow accents.

## Run locally

```bash
bun install   # or npm install
bun run dev   # or npm run dev  -> http://localhost:3000
```

## Structure

- `app/page.tsx` — the page (nav, hero, drop, letter, customs, footer)
- `app/components/three/` — the 3D engine (garment, canvases, reflection rig)
- `app/components/site/` — the sections, CTAs, nav, text-scramble effect
- `app/globals.css` — every visual token (palette, grid, type, components)
- `app/public/assets/` — GLB models, product shots, brand mark, icons

## Hint for v0 / antigravity

Paste this when importing the code:

> Orphan Wear, a streetwear storefront. Keep the design exactly as shipped:
> jet-black background with a faint blueprint grid, JetBrains Mono uppercase
> text, off-white #F1EFE8, safety-yellow #E9C400 accents, blackletter
> "Orphan" wordmark. Do not change colors, fonts, spacing, copy, or the 3D
> behavior. The designer's working preferences: all-uppercase mono labels,
> outline buttons that flood yellow on hover, product names uppercase.