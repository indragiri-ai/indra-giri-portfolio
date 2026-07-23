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
- Section numbering: 01 About, 02 AI, 03 Research, 04 Skills, 05 Teaching, 06 Publications, 07 Journey, 08 Writing, 09 Contact. Keep it consistent when adding sections.

## Images
`public/images/portrait.svg` (hero, 3:4 vertical) and `about.svg` (4:5) are labelled placeholders. When the owner provides photos, save them (jpg fine) and update `profile.portrait` / `profile.aboutPhoto` in data.ts, or just replace files keeping names. CV PDF at `public/cv/Indra_Giri_CV.pdf` (wired to download buttons).

## Content rules
No em-dashes. Honest credentials only (KUSOM 4-day Excel+AI program, government school teacher AI training, the client list in data.ts, arXiv paper). Blog voice: practical, warm, evidence-minded, Nepal-grounded, first person. Fix "Brick Plus" spelling if seen as "Brickk" anywhere.

## Verification checklist before "done"
1. Dev server up, home + /blog + one article load with zero console errors.
2. Research filter buttons actually filter (click AI & tech, expect 2 cards).
3. Mobile 375px no horizontal scroll; menu button works. Light/dark both readable.
4. Stop dev, `npm run build` passes (static export, 9 pages currently).

## Pending from owner (July 2026)
Real photos, real LinkedIn URL, review of 4 draft blog posts. Planned additions: Training & Workshops page (4 signature programs from his tracker file) and a Credentials section as he completes certifications. Deploy target: Vercel or GitHub Pages (workflow present), custom domain later.
