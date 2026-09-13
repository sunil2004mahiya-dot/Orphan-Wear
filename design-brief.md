# Orphan Wear — design brief

## Design read
A young DIY streetwear brand (founded 2023, everything bleached, embroidered and signed in-house) speaking to people who "started in last": the register is underground, tactile, defiant, a little sacred.

## Concept spine
"The one-of-one archive." The site is a tactical spec sheet for garments that do not repeat: a dark grid ground, monospaced catalog labels, and a single hero tee that floats, turns, and finally dissolves as you scroll, because every Orphan piece is made once and then it is gone.

## Delivery tier
spectacle (the user asked for a 3D garment in the header that reacts to scroll and dissolves, matching a WebGL-style reference site): cinema base + scroll-scrub film as the 3D beat + text-scramble second beat.

## Locked palette (user's explicit brand colors, from the Orphan Wear Instagram)
- Ground: #0B0B0B (jet black garments and dark reference site)
- Grid line: #1F1F1F
- Ink: #F1EFE8 (off-white catalog paper)
- Muted: #8B8B86
- Accent (the ONE accent): #E9C400 safety yellow, taken from the brand's Iron Cross embroidery and Golden Ranger print
- Material tone (imagery only, never UI): #A34B25 bleach copper from the hand-bleached tees
Defense: the brand's own garments are black with yellow embroidery and copper bleach; the reference site is black with white mono type. The yellow accent is a brand color and is the only accent used in UI; copper stays inside photography.

## Locked type
- Display + UI: JetBrains Mono (uppercase, tight tracking on display, wide tracking on labels), mirroring the monospaced catalog pages the brand already posts and the reference site's terminal register.
- Wordmark only: Pirata One (blackletter), mirroring the gothic script on the brand's trucker hats. Justification: the brand's own headwear uses blackletter; it appears only in the nav wordmark and the footer sign-off.

## Animation mode: non-animated — user request after the first live version: "the tshirt should be 3d responsive to the cursor ... as soon as it goes to the second section t-shirt should dissolve ... the rest of the t-shirts should be 3d models ... exactly like the reference". The scroll-scrub film is replaced by a real WebGL hero (React Three Fiber): a generated GLB of the hero tee that tilts toward the cursor with a white cursor-tracking light (the "magnet"), a 200dvh two-beat header where scroll drives scale then a noise-threshold dissolve shader, the brand mark behind it, and floating GLB product viewers with hover tilt in the drop section. Tier-1 technique: interactive WebGL scroll + cursor hero (wow-catalog family: 3D scroll hero), not a passive loop.

### Previous journey block (superseded, kept for record)

### Journey shape: single-shot
One continuous ~15 s film of a single black Orphan tee, generated in one call, then cut into three consecutive segments at exact frame boundaries so each chapter reads over its own moment of the same take. No seams are invented: segment N+1 starts on the frame after segment N ends.

### Journey (chapters over the one film)
Hero garment (user's pick): the white Box Logo Tee from the Started in Last collection (blue halftone crowd print). White cotton on the black ground gives the strongest contrast of any piece in the feed.
1. **Started in last** (0 to 5 s): the white tee floats centered on black, slow drift and gentle yaw, the blue print catching a single key light. Headline: "Started in last." Body: limited collection, made with purpose. CTA: Shop the drop. Tags: Heavyweight cotton, Box logo, Made in house.
2. **Made once** (5 to 10 s): camera pushes in and orbits a quarter turn, the tee grows to fill the frame while sliding left, embroidery and bleach texture in macro. Copy on the right: the five-line spec list (01 to 05). No CTA.
3. **Then it is gone** (10 to 15 s): the tee dissolves from its edges into fine ash and thread particles that drift upward and fade, leaving the empty black ground. Headline: "Then it is gone." Body: every piece is one of one; when it sells, it is over. CTA: Message for a custom.

### World grammar
Byte-identical preamble for every film and image prompt: "Studio product film on a seamless jet black ground (#0B0B0B), single soft key light from upper left with a faint cool rim light, matte black heavyweight cotton, no on-screen text, no logos, no watermark." Perspective: eye level, 50 mm, subject centered with generous negative space left and right. Background: pure dark, low detail, a very faint fine grid is allowed only in HTML, never in the film.

### Mobile framing
Subject stays inside the center-safe third for all 15 s; on mobile the object position is 50% 42% so the tee sits above the bottom copy block. Mobile encode capped at 720 px height.

### Delivery budget
Desktop segments total <= 32 MiB, mobile segments <= 16 MiB.

### How the journey enacts the spine
The archive shows one garment the way a catalog does (float, turn, macro) and then enforces its own rule: one of one, so it dissolves and the page continues without it.

## Section plan (layout family per section, no consecutive repeats)
1. Journey chapter 1: full-bleed film + left copy block (family: cinematic overlay)
2. Journey chapter 2: full-bleed film + right spec list (family: overlay, right aligned, numbered list)
3. Journey chapter 3: full-bleed film + centered short manifesto line (family: overlay, centered)
4. The drop: horizontal 4-card product rail with hover reveal (family: horizontal card rail)
5. A letter from Orphan: split 40/60, bleach texture plate left, long-form letter right (family: split text + plate)
6. One of one customs: full-width band with running counter marquee and a single CTA (family: full-width band)
7. Footer: 3-column mono index (family: footer index)
Eyebrow budget: ceil(7/3) = 3. Used: chapter 1 kicker, chapter 3 kicker, section 6 kicker.

## Asset plan
- Storyboard: one 16:9 six-panel grid of the single continuous move (refs only).
- Film: one 15 s 16:9 1080p take, cut into 3 desktop + 3 mobile segments with exact first-frame posters (`public/assets/world/`).
- Product universe: 4 product images on the black ground, derived from the brand's real Instagram pieces (Box Logo Tee, Golden Ranger Long Sleeve, Iron Cross bleached tee, Alien embroidery tee) (`public/assets/products/`).
- Section plate: one bleach-splatter texture on black for the letter section (`public/assets/plates/`).
- Branding: launch cover + OG + favicon via the branding pipeline (submitted once, alongside the film).
- Head kit: favicon set, apple-touch-icon, 192/512 + maskable, site.webmanifest, theme-color, OG + twitter block.
- Wordmark: typographic (Pirata One) since the user supplied no logo file.

## CTA inventory (each its own component)
- **Shop the drop** (primary): outlined mono block with an arrow that slides right and a yellow flood from the left on hover. Appears in chapter 1 and the drop section. Links to the Instagram shop bio link (orphanwear.us).
- **Message for a custom**: bracketed mono label `[ MESSAGE FOR A CUSTOM ]`, brackets spread apart on hover, text scrambles once. Appears in chapter 3 and section 6. Links to Instagram DM.
- **Product card reveal**: on hover the card's tag row slides down and a full-width `SHOP` bar rises in; card frame turns yellow. Section 4 only.
- **Follow @wear_orphan**: underline that draws from the left. Footer only.
Corner language: all-sharp (0 radius) page-wide.

## Anti-convergence ledger
First build in this chat; no previous palette family to avoid. Palette family used here: black + off-white + single yellow accent (brand-mandated).
