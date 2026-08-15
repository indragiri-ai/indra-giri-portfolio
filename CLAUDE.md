# INDRA GIRI PORTFOLIO: DEVELOPER GUIDE
Read `D:\My_profile\MASTER-INSTRUCTIONS.md` first for owner context and global rules (no em-dashes, no mouse effects, honest content). This file covers THIS project only.

## What this is
Indra Giri's personal profile website. Premium editorial design (deep navy + gold, Fraunces serif, dark default + light toggle) positioning him as AI Generalist, Senior Researcher, AI Trainer and Educator. Next.js 15 App Router, TypeScript, Tailwind, `output: "export"` (static, GitHub Pages workflow exists in .github/workflows).

## CRITICAL path note
The real folder is `D:\My_profile\CV_Indra\Profile_website_indra\Updated_profile\CRS 2023 data\Indra_updated_portfolio`. The SPACES in "CRS 2023 data" break npm and launchers. ALWAYS work via the junction `D:\My_profile\indra_portfolio` (same files, safe path).

## Commands
- Dev: `npm run dev` (port 3000; launch config "indra-portfolio" in D:\Sankhya AI\Website\.claude\launch.json)
- Build: `npm run build`. NEVER build while the dev server runs (corrupts .next, server starts 500ing; if it happens, stop and restart the dev server).

## Architecture (all under src/)
- `lib/data.ts` : ALL site content (profile, roles, stats, about, aiPractice, projects, publications, skills, teaching, journey, navLinks). Edit content here, never in components. TODO inside: real LinkedIn URL still placeholder.
- `lib/blog.ts` : blog posts as typed data (slug, dates, category, sections). 4 draft articles awaiting owner review. New post = new object at top of `posts`.
- `app/`: `/` (one-page site), `/blog`, `/blog/[slug]` (generateStaticParams; Next 15 Promise params).
- `components/sections/`: Hero (vertical arched portrait, RoleFlipper, stats, trusted-by), About (photo + quote + pillars), AIPractice (id="ai": offerings, toolkit, highlights), Research (filterable grid), Skills, Teaching, Publications, Journey (vertical timeline: period rail + icon markers + cards), BlogPreview, Contact (Formspree if NEXT_PUBLIC_FORMSPREE_ID set, else mailto fallback).
- `components/ui/`: SectionHead (eyebrow "NN · TAG"), Reveal (fade-up), Counter, ThemeToggle. `components/effects/` contains UNUSED legacy files (CursorTrail, HeroCanvas, Preloader, SmoothScroll, MagneticButton): do not re-import them, the owner explicitly rejected mouse effects and preloaders.
- Design tokens in `app/globals.css` (dark: navy #0c101b + gold #c6a15b; light: ivory + bronze). Shared classes: `.fig-label`, `.section-title`, `.panel`, `.btn-primary`, `.btn-ghost`.
- Section numbering: 01 About, 02 AI, 03 Research, 04 Skills, 05 Teaching, 06 Media, 07 Publications, 08 Journey, 09 Writing, 10 Contact. Keep it consistent when adding sections.
- Standalone pages: `/ai` (hub) with `/ai/training`, `/ai/research-policy`, `/ai/research-workflow`; plus `/projects`, `/training`, `/blog`. Nav "AI" points at `/ai`, not the home anchor. Page content lives in `lib/ai.ts` and `lib/gallery.ts`; use `components/ui/PageHeader.tsx` for their headers.
- `/ai/research-policy` summarises the real report at `public/AI_report/`. Every figure on that page was read out of the PDF: do not edit them without re-checking the source.
- Photos: `gallery` items and `trainingDeliveries` render a labelled placeholder tile when `src`/`photo` is empty. Fill the paths as photos arrive; never invent a photo path.

## Images
**Originals live in `source-images/` at the project root, NOT in `public/`.** Anything under `public/` is published verbatim, so raw camera files there ship to the live site (they were 19MB of it). Workflow: originals into `source-images/`, then process with sharp (crop to the target ratio, resize, mozjpeg q82) into `public/images/`. Only processed, referenced files belong in `public/`.
`public/images/portrait.svg` (hero, 3:4 vertical) and `about.svg` (4:5) are labelled placeholders. When the owner provides photos, save them (jpg fine) and update `profile.portrait` / `profile.aboutPhoto` in data.ts, or just replace files keeping names. CV PDF at `public/cv/Indra_Giri_CV.pdf` (wired to download buttons).

## Content rules
No em-dashes. Honest credentials only (KUSOM 4-day Excel+AI program, government school teacher AI training, the client list in data.ts, arXiv paper). Blog voice: practical, warm, evidence-minded, Nepal-grounded, first person. Fix "Brick Plus" spelling if seen as "Brickk" anywhere.

**Sankhya naming**: Sankhya AI is the AI unit of Sankhya Solutions Pvt. Ltd. Use "Sankhya AI" in AI and training contexts (aiPractice, AI project cards, training labels), "Sankhya Solutions" in research and evaluation contexts (journey employer, paper affiliation). Never list either in `clients`, it is his own company.

**No self assigned skill scores.** `tools` in data.ts carries tier plus a factual `use` line, never a 0-100 number. Do not reintroduce percentage meters.

## Nepal fieldwork map
- `components/ui/NepalMap.tsx` renders Nepal's 77 districts as inline SVG (hover/tap/keyboard, tooltip with project + year). Full bleed at the bottom of the About section, outside `max-w-content`, because Nepal's bbox is 1.7:1; capped at 90vh so the whole country stays visible at once. The owner removed the visible district list, so the per-district `aria-label` is now the only machine readable copy of the data: keep it populated.
- Map colours are their own tokens in globals.css (`--map-land`, `--map-border`, `--map-edge`, `--map-work`, `--map-work-active`), set per theme. Do NOT go back to fading `--accent` with opacity: it went muddy on ivory and vanished on navy. `NEPAL_OUTLINE_PATH` draws the national edge on top of the district fills.
- Shapes come from `src/lib/nepal-map.ts`, AUTO GENERATED. Regenerate with `node scripts/build-nepal-map.mjs` (reads `data/nepal-districts.geojson`, projects Mercator, writes SVG paths). Never hand-edit the generated file.
- **BOUNDARY IS NON-NEGOTIABLE**: the source is Nepal's updated map (post May 2020), so Darchula includes Kalapani, Lipulekh and Limpiyadhura. Verified by area (Darchula ~2,672 sq km vs ~2,350 pre-2020) and by the visible salient in the far northwest. Most international boundary files (GADM, geoBoundaries, older community repos) still draw the pre-2020 line: do not swap one in. Source is the National GeoPortal (Survey Department), attributed under the map.
- Which districts light up comes from `src/lib/fieldwork.ts`. `resolveDistrict` normalises spellings (Tanahun to Tanahu, Kavre to Kabhrepalanchok, Chitwan to Chitawan and so on); add new variants to `ALIASES`. Unmatched names log a dev console warning and are skipped rather than guessed. Current entries are placeholders drawn only from locations already stated in data.ts, pending the owner's spreadsheet.

## Verification checklist before "done"
1. Dev server up, home + /blog + one article load with zero console errors.
2. Research filter buttons actually filter (click AI & tech, expect 2 cards).
3. Mobile 375px no horizontal scroll; menu button works. Light/dark both readable.
4. Stop dev, `npm run build` passes (static export, 9 pages currently).

## Pending from owner (July 2026)
Real photos, real LinkedIn URL, review of 4 draft blog posts. Planned additions: Training & Workshops page (4 signature programs from his tracker file) and a Credentials section as he completes certifications. Deploy target: Vercel or GitHub Pages (workflow present), custom domain later.
