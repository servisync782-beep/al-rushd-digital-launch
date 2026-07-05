# Fix images, remove fake stats & professionalize the site

## 1. Fix the broken forklift images (the real bug)
`src/data/equipment.ts` imports the two HELI photos as raw JPEGs:
```ts
import heliForkliftSide from "@/assets/heli-forklift-side.jpg";
import heliForkliftForks from "@/assets/heli-forklift-forks.jpg";
```
But those files only exist as CDN pointers (`heli-forklift-side.jpg.asset.json`, `heli-forklift-forks.jpg.asset.json`). That mismatch is what throws `Cannot find module '@/assets/heli-forklift-side.jpg'` and 500s the page when the forklift is opened.

**Fix:** import the `.asset.json` pointers and use their `.url`, so the gallery stays a clean `string[]`:
```ts
import heliForkliftSide from "@/assets/heli-forklift-side.jpg.asset.json";
import heliForkliftForks from "@/assets/heli-forklift-forks.jpg.asset.json";
// ...
gallery: [heliForkliftSide.url, heliForkliftForks.url],
```
This keeps the current forklift thumbnail (`equip-forklift.jpg`) unchanged as the card image, and makes the two real photos load in the product gallery + lightbox. The `gallery` type will be simplified back to `string[]`.

## 2. Remove the fabricated stats
Delete the invented numbers ("350+ Units in Fleet", "12+ Years of Service", "24/7 Support", "500+ Projects Delivered") from `src/routes/index.tsx`. They appear in **two** places:
- the hero stat strip
- the "client trust" band lower down

Both stat grids will be removed. The client-trust band will be rebuilt into an honest, credibility-focused strip (e.g. genuine value props: quality equipment, professional service, responsive support, Jubail-based) — text-driven, no fabricated metrics.

## 3. Avoid over-claiming the fleet size (professionally)
Since only the HELI forklift is real right now (everything else is "Coming Soon"), soften copy so nothing implies a large ready fleet:
- Adjust hero/about wording to emphasize *quality, hand-picked, well-maintained* equipment and *personal service* rather than fleet volume.
- Keep the HELI forklift badged as available; other items stay "⭐ Coming Soon" as already set.

No pricing or quantity claims that can't be backed up.

## 4. Professional polish + motion
Tasteful, performance-friendly enhancements (no heavy libraries):
- Subtle entrance/reveal animations on section headings, cards and the featured grid using the existing `animate-fade-in` / `hover-scale` utilities (staggered where it reads well).
- Smooth hover elevation on equipment cards and CTA buttons (consistent with existing accent shadow style).
- Refined spacing/hierarchy on the homepage sections left after the stat removal so nothing looks empty.

## Technical notes
- Files touched: `src/data/equipment.ts` (asset imports + `gallery` type), `src/routes/index.tsx` (remove both stat grids, rework trust band, add motion), `src/routes/fleet.$id.tsx` (gallery already maps fine once it's `string[]`), possibly `src/lib/i18n.tsx` (retire unused `hero.stat*` keys / add any new trust-band copy).
- Verify with a build/typecheck and by opening the forklift detail page to confirm both photos render in the gallery and lightbox.

Want me to also apply the same subtle motion treatment to the Fleet and Services pages, or keep the polish focused on the homepage for now?
