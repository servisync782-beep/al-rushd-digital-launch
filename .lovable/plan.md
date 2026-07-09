# Polish the homepage: logo lockup + carousel performance

Preserves the existing design, palette, sections, and branding. Only details, usability, and performance change.

## 1. Header logo lockup (emblem mark + name)

The current logo image (`logo.png` / `al-rushd-logo.jpg.asset.json`) already has "AL RUSHD INTERNATIONAL" baked in, and the header *also* prints the name as text — so it shows twice. Per your choice, switch to a clean **emblem + text** lockup:

- Crop the **hexagon AR crane emblem** out of the existing logo artwork (same image, same colors — no redesign/recolor). Save it as a new committed asset (e.g. `ar-emblem.png`) and upload via the asset pipeline so the reference is a real committed pointer (no broken paths).
- In `src/components/Header.tsx`, use the cropped emblem next to the text:
  - **Emblem**: fixed height (`h-10 md:h-11`), `w-auto`, crisp (`object-contain`).
  - **Name**: "Al Rushd International" in the existing display font, **bold**, `text-base md:text-lg`, tight tracking, vertically centered with the emblem via `flex items-center gap-2.5`. Tagline line kept beneath on `sm+` as today.
  - Sized to sit naturally in the 20-height header — not oversized.
- On mobile the name text already collapses sensibly; verify alignment at 402px.

## 2. Hero carousel performance

`src/components/HeroCarousel.tsx` re-renders all slides on every autoplay tick (each slide's headline/subtitle animate off the shared `selected` state) and uses `backdrop-blur` — both cause jank, especially on mobile.

Optimizations (behavior/look preserved):
- Drive slide-content transitions with **CSS only** keyed off Embla's active class rather than re-rendering every slide on each `select` — reduces React re-renders to just the dot indicators.
- Add `will-change: transform` to the Embla track and keep transforms GPU-composited; drop the heavy `backdrop-blur` on overlays (replace with a solid/gradient tint at the same visual weight).
- Tune Embla options for smoothness (`dragFree: false`, `duration` set for a snappy glide, `align: "start"`, `containScroll: "trimSnaps"`).
- **Image loading**: keep slide 1 `loading="eager"` + add a `<link rel="preload" as="image" fetchpriority="high">` for slide 1 in the route `head()`; lazy-load the rest. Add `decoding="async"` and correct `sizes`. Compress the three slide JPEGs (currently 250–303 KB at 1920px) to lighter versions for faster first paint.
- Ensure swipe works cleanly on touch and mouse; autoplay pauses on interaction and resumes.

## 3. Carousel content

- The three slides are already **unique** high-quality images (construction crane skyline, CAT equipment yard, forklift + telehandler). Keep them unique — no reuse.
- **First slide = company intro / main hero**:
  - Headline: welcoming intro to Al Rushd International.
  - Subtext: short professional line — reliable heavy equipment rental for construction and industrial projects.
  - CTAs: "Request a Quote" + "Explore Our Equipment" (existing buttons, relabeled to match).
  - Slides 2 and 3 keep their service-focused captions.
  - All copy stays bilingual (EN/AR) to match the existing i18n setup.

## 4. Final quality check

Before finishing, verify: emblem restored and crisp; "Al Rushd International" aligned beside it; carousel smooth on desktop + mobile with working swipe; each slide unique; slide 1 introduces the company; no broken asset references; no new console errors; responsive at desktop / tablet / mobile.

## Technical notes
- Files touched: `src/components/Header.tsx`, `src/components/HeroCarousel.tsx`, `src/routes/index.tsx` (preload link), `src/lib/i18n.tsx` (slide-1 copy/labels if needed), plus a new committed emblem asset. The old full-name logo asset stays available (still used by the hero emblem overlay if kept) — nothing deleted that other pages reference.
- No palette, layout, or section changes; no logo redesign/recolor/replacement — only a crop of the existing artwork.
- Verify with a build/typecheck and a Playwright screenshot at desktop + 402px mobile.
