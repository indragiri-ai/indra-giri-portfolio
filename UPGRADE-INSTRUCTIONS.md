# PORTFOLIO UPGRADE: DETAILED BUILD INSTRUCTIONS

Instructions for the next developer or AI model that builds the v3 upgrade of Indra Giri's portfolio.
Written 2026-07-19 after a full code review. Read this whole file before writing any code.

## 0. Prerequisites and hard rules

1. Read `CLAUDE.md` in this folder and `D:\My_profile\MASTER-INSTRUCTIONS.md` first. Their rules apply to everything below.
2. NEVER work in the raw path with spaces. Always use the junction `D:\My_profile\indra_portfolio`.
3. The site is Next.js 15 App Router, TypeScript, Tailwind, `output: "export"` (fully static). Every feature below MUST work with static export. No server-side runtime, no API routes that need a server, no databases.
4. Content rules: no em-dashes anywhere, no mouse effects, honest credentials only. Do not invent trainings, clients, testimonials or numbers. Where real content is missing, use a clearly marked TODO and ask the owner.
5. Never run `npm run build` while the dev server is running.
6. Design language is already established: deep navy + gold (dark default), ivory + bronze (light), Fraunces display serif, mono eyebrow labels (`.fig-label`), `.panel`, `.btn-primary`, `.btn-ghost`. New pages must look like they were always part of the site. Reuse `SectionHead`, `Reveal`, and the existing card patterns from `Research.tsx`.

## 1. Scope overview (7 workstreams)

| # | Workstream | Result |
|---|-----------|--------|
| A | Content architecture migration | Blog, trainings, projects, resources move from TS objects to markdown/JSON files in `content/` so a CMS can edit them |
| B | Training & Workshops | New home section + `/trainings` index + `/trainings/[slug]` detail pages with photos |
| C | Project detail pages | `/projects/[slug]` with brief + photos, research cards link to them |
| D | Resources page | `/resources` with curated links, filterable, plus banner to owner's external Excel & AI resources site |
| E | Sankhya AI highlight | Co-founder positioning + outbound link in hero, about, journey, footer |
| F | Admin panel | Browser-based CMS (Pages CMS recommended) so the owner can publish articles, trainings, projects and resources without touching code |
| G | Fixes + pipelines | All review findings fixed (SEO, OG, a11y, RSS, analytics, sitemap) and the publish pipeline documented end to end |

## 2. Information needed from the owner (TODOs)

Collect these before or during the build. Mark anything missing with a visible TODO, never guess.

| Item | Where used | Current state |
|------|-----------|---------------|
| Real LinkedIn URL | `data.ts` `profile.linkedin` | DONE 2026-07-19: set to https://www.linkedin.com/in/indra-giri-72aba3a7/ |
| Sankhya AI website URL | Workstream E | Placeholder added 2026-07-19: `profile.sankhya` exists in `data.ts` with `url: ""`. Owner has no site yet; keep all Sankhya links gated on `url` being non-empty. Still confirm wording vs "Sankhya Solutions Pvt. Ltd." with owner |
| External Excel & AI resources website URL | `/resources` banner | CONFIRMED 2026-07-19: no URL yet. Set `externalSite.url: ""` in `resources.json` and keep the banner hidden until it is non-empty (same gating pattern as `profile.sankhya.url`) |
| Real portrait + about photos | `public/images/` | CONFIRMED 2026-07-19: owner will supply later. Keep the existing labelled placeholder SVGs; do not generate fake photos |
| Training photos (KUSOM, government school sessions) | `/trainings/[slug]` galleries | CONFIRMED 2026-07-19: owner will upload via the admin panel later. Ship trainings with `photos: []` and a labelled placeholder cover SVG per training (same visual style as `portrait.svg`: accent-tinted, text label naming the training). Galleries render only when real photos exist |
| Project photos | `/projects/[slug]` galleries | CONFIRMED 2026-07-19: same as training photos: `photos: []`, gallery hidden until owner uploads via admin panel |
| Final production domain | `SITE_URL`, sitemap, robots, OG, RSS | Undecided (GitHub Pages workflow exists; Vercel also an option; custom domain planned) |
| Formspree form ID | Contact form + deploy.yml secret | Not set; form currently falls back to mailto |

## 3. Workstream A: content architecture migration

This is the foundation. Do it first; B, C, D and F all depend on it.

### 3.1 Target layout

```
content/
  blog/                      one .md file per post
    making-ai-policy-work-in-nepal.md
    ...
  trainings/                 one .md file per training
    kusom-advanced-excel-ai.md
    govt-school-teachers-ai.md
  projects/                  one .md file per project (12 existing projects)
    brick-plus-endline.md
    ...
  resources.json             flat list of resource links
public/
  images/
    uploads/                 CMS media folder (all owner-uploaded photos land here)
      trainings/
      projects/
```

### 3.2 File formats

Markdown with YAML frontmatter for the three collections; the markdown body is the long description. Example blog post:

```markdown
---
title: Making AI Policy Work in Nepal
excerpt: Nepal does not need a perfect AI policy. It needs a workable one...
date: 2026-05-18
category: AI Policy
readTime: 6 min read
tags: [AI policy, Nepal, Governance]
draft: false
---

Every few months a new AI strategy document appears...

## Start with what AI actually needs

AI runs on three inputs...
```

Migrate the 4 existing posts from `src/lib/blog.ts` losslessly: each `BlogSection.heading` becomes an `## heading`, paragraphs become markdown paragraphs. Slug = filename. Keep `displayDate` derived from `date` at load time (format "May 18, 2026"), do not store it twice.

### 3.3 Training frontmatter schema

```yaml
---
title: Advanced Excel & AI for Managers        # required
client: KUSOM (Kathmandu University School of Management)
audience: Working professionals and MBA students
date: 2026-04-15            # ISO, used for sorting
dateDisplay: April 2026     # optional; derive from date if absent
duration: 4 days
location: Kathmandu, Nepal
status: completed           # completed | recurring | upcoming
summary: One-line card text (max ~160 chars)
topics: [Advanced Excel, Generative AI, Prompt engineering, Automation]
cover: /images/uploads/trainings/kusom-cover.jpg   # optional
photos:
  - src: /images/uploads/trainings/kusom-1.jpg
    caption: Hands-on Excel session, day 2
outcomes:                   # optional bullet list
  - Participants built their own AI-assisted reporting workflow
testimonial:                # optional, only if a real quote exists
  quote: ""
  name: ""
  role: ""
draft: false
---

Long description in markdown (2 to 5 paragraphs): who it was for, what was
covered day by day, what participants left with.
```

Seed exactly TWO trainings (the only real ones; confirm details with owner):

1. `kusom-advanced-excel-ai.md`: the 4-day Advanced Excel + AI program at KUSOM, status `completed`.
2. `govt-school-teachers-ai.md`: ongoing AI training for government school teachers in Kathmandu, status `recurring`.

Leave `photos: []` with a TODO comment until the owner uploads photos via the admin panel.

### 3.4 Project frontmatter schema

Migrate all 12 projects from `src/lib/data.ts` `projects[]`. Keep every existing field, add detail-page fields:

```yaml
---
title: "Endline Evaluation: Brick Plus Project"
org: World Vision International
location: Lalitpur, Nepal
period: 2025 - Present          # new, ask owner or omit
status: ongoing                 # ongoing | completed
categories: [impact]            # impact | valuechain | social | market | ai
tags: [Mixed methods, Household survey, KII, FGD]
summary: Card text (the current `desc` field)
big: true                       # spans 2 cols in the grid
cover: ""                       # optional
photos: []                      # same shape as trainings
draft: false
---

Optional long brief in markdown. IF THE BODY IS EMPTY the project gets NO
detail page and its card stays non-clickable. This keeps the site honest:
detail pages appear only when the owner writes a real brief.
```

### 3.5 resources.json schema

```json
{
  "intro": "Guides, templates and tools I recommend and produce for Excel, AI and research work.",
  "externalSite": {
    "label": "Excel & AI Resource Hub",
    "url": "TODO_OWNER_RESOURCES_URL",
    "description": "My dedicated site with in-depth Excel and AI tutorials and downloads."
  },
  "items": [
    {
      "title": "…",
      "description": "One or two sentences.",
      "url": "https://…",
      "type": "guide",
      "topic": "excel"
    }
  ]
}
```

`type`: guide | template | video | tool | dataset | article. `topic`: excel | ai | research | data. Seed `items` empty or with 2 or 3 real links confirmed by the owner; do not fabricate.

### 3.6 Loaders

Create `src/lib/content.ts`:

- Dependencies: `gray-matter` (frontmatter) and `marked` (markdown to HTML) or `react-markdown`. Keep it light; no MDX.
- Functions: `getPosts()`, `getPost(slug)`, `getTrainings()`, `getTraining(slug)`, `getProjects()`, `getProject(slug)`, `getResources()`. All read from `content/` with `fs` at build time (server components only). Sort by date desc. Filter out `draft: true`.
- Export the same TypeScript interfaces the components use today so existing components keep compiling. `src/lib/blog.ts` becomes a thin re-export (or is deleted and imports updated).
- `src/lib/data.ts` keeps everything that is NOT a collection: profile, roles, stats, clients, about, aiPractice, skills, teaching, journey, navLinks. Do not move those.
- Rendered markdown must be styled by the existing `.article-body` styles in `globals.css` (check headings, lists, links, blockquotes all look right in dark AND light).

### 3.7 Migration acceptance

- `npm run build` passes; page count = old 9 pages + new routes.
- `/blog` and all 4 article pages render identically to before (visually compare).
- Research grid renders identically from the new loader, filters still work.

## 4. Workstream B: Training & Workshops

### 4.1 Home page section

- New `src/components/sections/Training.tsx`, `id="training"`, placed AFTER `AIPractice` and BEFORE `Research` in `app/page.tsx`.
- Section renumbering (update the `fig` prop on every SectionHead and the fig-label in Contact):
  01 About, 02 AI, 03 Training, 04 Research, 05 Skills, 06 Teaching, 07 Publications, 08 Journey, 09 Writing, 10 Contact.
- Content: SectionHead (tag "Training", title along the lines of "Training that sticks" with an italic accent word) + intro sentence + one card per training (max 4 shown) + a `btn-ghost` "All trainings & workshops" linking to `/trainings`.
- Card contents: cover photo if present (else a subtle accent-tinted placeholder block, NOT a fake photo), title, client, duration + status chip (reuse the ongoing/completed dot pattern from ProjectCard; map `recurring` to the pulsing accent dot with label "recurring"), summary, topic chips (max 3).
- Cards link to `/trainings/[slug]`.

### 4.2 `/trainings` index page

- Mirrors `/blog` page structure: Navbar, hero heading ("Training & <em>workshops</em>"), intro, grid of all trainings (2 cols desktop), Footer.
- Each card as in 4.1. Order: recurring/upcoming first, then completed by date desc.
- Page metadata: title `Training & Workshops | Indra Giri`, description from intro, OG tags (see workstream G).

### 4.3 `/trainings/[slug]` detail page

Layout modeled on `blog/[slug]/page.tsx` (Navbar, max-w-3xl article column, Footer):

1. Back link "All trainings".
2. Meta row (mono caps): client · dateDisplay · duration · location · status.
3. `h1` title in display font.
4. Summary as the lede (accent left border, same as blog excerpt).
5. Photo gallery: if photos exist, a responsive grid (1 col mobile, 2 cols from `sm`), each photo in a rounded-2xl bordered figure with optional mono caption below. Use plain `<img>` (images are unoptimized in this config) with `loading="lazy"` and REQUIRED meaningful `alt` text (use caption or title). No lightbox library; keep it simple. If no photos, omit the gallery entirely.
6. Markdown body rendered with `.article-body`.
7. `outcomes` as a "What participants left with" bullet panel, only if present.
8. `testimonial` as a styled blockquote, only if a real quote exists.
9. CTA panel at the bottom: "Want this training at your organisation?" + `btn-primary` "Get in touch" linking `/#contact`. This is the conversion point; make it prominent.

- `generateStaticParams` over all non-draft trainings; `generateMetadata` with title, description = summary, OG image = cover photo when present.

### 4.4 Navigation

- Add `{ href: "/#training", label: "Training" }` to `navLinks` after Research... actually place it right after "AI" to match new section order: About, AI, Training, Research, Teaching, Publications, Journey, Blog, Contact.
- The navbar is getting crowded (9+ links). RECOMMENDED trim for desktop: About, AI, Training, Research, Resources, Blog, Contact (drop Teaching, Publications, Journey from the top bar; they remain reachable by scrolling and stay in the mobile full-screen menu which handles more items gracefully). Confirm with owner; if unsure, implement the trimmed version.

## 5. Workstream C: project detail pages

1. Route `src/app/projects/[slug]/page.tsx` + `generateStaticParams` over projects whose markdown body is non-empty.
2. Detail layout mirrors the training detail page: back link "All research", meta row (org · location · period · status), title, summary lede, photo gallery (same component as trainings; extract a shared `PhotoGallery` component into `components/ui/`), markdown brief, tag chips, then a "More research" link back to `/#research`.
3. In `Research.tsx` ProjectCard: when the project has a detail page, wrap the card in a `Link` and add a small `IconArrowUpRight` in the top-right corner on hover (`opacity-0 group-hover:opacity-100`). When it has no detail page, render exactly as today. The card must communicate clickability (cursor, hover border already exists).
4. Do NOT write fake briefs. Seed at most 2 detail bodies from information already in the repo (e.g. Brick Plus, Dairy Market Study) using only facts present in `data.ts`/CV, and mark them for owner review. All others start with empty bodies (no page) until the owner writes them in the admin panel.
5. `generateMetadata` per project: title `"<project title> | Indra Giri"`, description = summary, OG image = cover when present.

## 6. Workstream D: `/resources` page

1. Route `src/app/resources/page.tsx` (static). Navbar/Footer as usual.
2. Hero: fig-label "Resources", heading like "Useful <em>resources</em>", intro from `resources.json`.
3. Prominent banner panel near the top (accent border, like the featured paper panel in Publications): the owner's external Excel & AI resource site: label, description, `btn-primary` "Visit the resource hub" with `target="_blank"`. Uses `externalSite` from `resources.json`. If URL is still TODO, hide the banner (do not ship a dead button).
4. Below: filter chips by `topic` (All, Excel, AI, Research, Data) reusing the exact filter-button pattern from `Research.tsx`, then a card grid. Resource card: type badge (mono caps chip), title, description, domain of the URL in mono (e.g. "youtube.com"), external-link icon. Whole card is an `<a target="_blank" rel="noopener noreferrer">`.
5. Cross-links: in the Publications section add a slim CTA row under the grids: "Looking for hands-on material? Browse my resources" linking `/resources`. Add "Resources" to the navbar (see 4.4).
6. Empty state: if `items` is empty, show the banner plus a single quiet line "Curated resources are being added. Check back soon." Never fake entries.

## 7. Workstream E: Sankhya AI highlight

FIRST confirm with the owner the exact relationship between "Sankhya AI" and "Sankhya Solutions Pvt. Ltd." and the URL. Then:

1. `data.ts`: DONE 2026-07-19, `profile.sankhya` already exists with `url: ""` (owner has no Sankhya AI site yet). Do not invent a URL.
2. Hero: in the meta row above the h1 (location · availability) add a third item: `Co-founder · Sankhya AI` as an outbound link (accent color, external-link icon at 12px). Keep the row wrapping clean at 375px.
3. About: extend the second paragraph or the "AI Practitioner" pillar to state co-foundership in one honest sentence, linking the name.
4. Journey: update the current Sankhya entry role line to reflect co-founder status if accurate (owner confirms wording), org name links out.
5. Footer: add a Sankhya AI icon link (use `IconSparkles` or `IconBuildingSkyscraper` from tabler) alongside the existing socials.
6. All outbound links: `target="_blank" rel="noopener noreferrer"`.
7. If the URL is not provided, implement everything behind a check (`sankhya.url` truthy) so nothing dead ships.

## 8. Workstream F: admin panel

Constraint recap: static export on GitHub Pages/Vercel means there is NO server to host a classic admin. The correct architecture is a git-based CMS: the admin UI edits the markdown/JSON files in the GitHub repo, every save is a commit, and the existing GitHub Action rebuilds and deploys the site automatically (2 to 3 minutes to live). This also gives full version history of every edit.

### 8.1 Recommended: Pages CMS (zero infrastructure)

1. Push the repo to GitHub (it may currently be local-only; check `git remote -v`).
2. Add `.pages.yml` at the repo root defining the collections. Skeleton (verify field syntax against current docs at pagescms.org before finalizing):

```yaml
media:
  input: public/images/uploads
  output: /images/uploads

content:
  - name: posts
    label: Blog posts
    type: collection
    path: content/blog
    filename: "{fields.slug}.md"   # or derive from title
    view:
      fields: [title, date, category]
      sort: [date]
    fields:
      - { name: title, label: Title, type: string, required: true }
      - { name: excerpt, label: Excerpt, type: text, required: true }
      - { name: date, label: Date, type: date, required: true }
      - { name: category, label: Category, type: string }
      - { name: readTime, label: Read time, type: string }
      - { name: tags, label: Tags, type: string, list: true }
      - { name: draft, label: Draft, type: boolean, default: false }
      - { name: body, label: Body, type: rich-text }

  - name: trainings
    label: Trainings & workshops
    type: collection
    path: content/trainings
    fields:
      - { name: title, type: string, required: true }
      - { name: client, type: string }
      - { name: audience, type: string }
      - { name: date, type: date, required: true }
      - { name: duration, type: string }
      - { name: location, type: string }
      - { name: status, type: select, options: { values: [completed, recurring, upcoming] } }
      - { name: summary, type: text }
      - { name: topics, type: string, list: true }
      - { name: cover, type: image }
      - name: photos
        type: object
        list: true
        fields:
          - { name: src, type: image }
          - { name: caption, type: string }
      - { name: outcomes, type: string, list: true }
      - { name: draft, type: boolean, default: false }
      - { name: body, label: Description, type: rich-text }

  - name: projects
    label: Research projects
    type: collection
    path: content/projects
    fields: []   # mirror section 3.4, same pattern as trainings

  - name: resources
    label: Resources
    type: file
    path: content/resources.json
    fields: []   # mirror section 3.5
```

3. Owner onboarding (write this into a short `ADMIN-GUIDE.md` for him, in plain language):
   - Go to `https://app.pagescms.org`, sign in with the GitHub account that owns the repo, open the repo.
   - Edit or add a post/training/project, upload photos in the same form, press Save.
   - Wait 2 to 3 minutes; the site rebuilds and the change is live. Check the Actions tab if it does not appear.
   - Photos: upload JPGs under 500 KB where possible (phone photos should be resized; the guide should mention any simple resizer).
4. IMPORTANT local-sync note for the guide and for future Claude sessions: after CMS edits, run `git pull` in the local repo before doing local work, otherwise pushes will conflict.

### 8.2 Alternative if Pages CMS is unsuitable

Sveltia CMS (Decap-compatible, single `admin/index.html` + `config.yml` in `public/`, GitHub backend). It needs a small OAuth gateway (Cloudflare Worker, free tier) for GitHub sign-in. Only choose this if Pages CMS cannot model the content; it is more setup for the same result. Do NOT build a custom admin app; it is not worth maintaining and cannot run on a static host anyway.

### 8.3 Draft workflow

`draft: true` posts/trainings/projects are excluded by the loaders (3.6), so the owner can save unfinished work safely. Document this in `ADMIN-GUIDE.md`.

## 9. Workstream G: fixes from the expert review + pipelines

### 9.1 Critical fixes

| Fix | Where | Detail |
|-----|-------|--------|
| LinkedIn placeholder | `src/lib/data.ts` | DONE 2026-07-19: real URL is in place, footer link works. No action needed |
| Real photos | `public/images/` | When owner supplies: save as `portrait.jpg` (3:4) and `about.jpg` (4:5), update `profile.portrait` / `profile.aboutPhoto` |
| `metadataBase` + OG image | `src/app/layout.tsx` | Add `export const SITE_URL` in data.ts (env-overridable via `NEXT_PUBLIC_SITE_URL`). Set `metadataBase: new URL(SITE_URL)`, `openGraph.images: ["/og/og-default.png"]`, `twitter: { card: "summary_large_image" }`. Create `public/og/og-default.png` 1200x630: navy `#0c101b` background, name in Fraunces, gold accent rule, roles line, site URL. Generate it with a small script (`scripts/generate-og.mjs` using `satori` + `sharp`) or design it once by hand; a committed static PNG is fine |

### 9.2 SEO plumbing

1. `src/app/sitemap.ts`: static-export compatible (`export const dynamic = "force-static"`). Include `/`, `/blog`, every post, `/trainings`, every training, every project detail page, `/resources`. `lastModified` from content dates.
2. `src/app/robots.ts`: allow all, point to `${SITE_URL}/sitemap.xml`.
3. JSON-LD in `layout.tsx` body: `Person` schema: name, jobTitle "AI Trainer and Senior Researcher", worksFor Sankhya, `sameAs`: [linkedin, github, arxiv], address Kathmandu NP, alumniOf South Asian University. On blog posts additionally emit `Article` schema (headline, datePublished, author) from `generateMetadata`'s sibling; simplest is a small `<JsonLd>` server component.
4. Blog post OG: extend `generateMetadata` in `blog/[slug]/page.tsx` with `openGraph: { type: "article", publishedTime, tags }`; same pattern for trainings and projects.
5. RSS: `src/app/feed.xml/route.ts` with `export const dynamic = "force-static"`, emitting RSS 2.0 from `getPosts()`. Add `<link rel="alternate" type="application/rss+xml">` in layout head and a small RSS icon in the footer.

### 9.3 Accessibility and UX fixes

1. `Contact.tsx`: wrap fields in a real `<form onSubmit={...}>` (button type submit, `e.preventDefault()`), add a visible or `sr-only` `<label htmlFor>` per field with matching `id`s, `required` + `type="email"` native validation, an `aria-live="polite"` region for the status text, and a hidden honeypot field (e.g. `company`) that aborts submit when filled. Keep the Formspree/mailto fallback logic unchanged.
2. Reduced motion: create `src/components/ui/MotionProvider.tsx` (`"use client"`, wraps children in `<MotionConfig reducedMotion="user">` from framer-motion) and wrap the page content in `layout.tsx` body with it.
3. Skills bars: in `Skills.tsx` remove percentage-driven bars. Show per tool: name + tier badge (Expert/Advanced, accent-bordered chip) and optionally a one-word evidence hint. Delete `val` from `data.ts` tools once unused. Rationale: self-scored percentages read as unserious to research clients.
4. Trusted-by strip (`Hero.tsx`): on mobile cap to 2 rows: smaller gap, `text-[0.6rem]`, and add subtle `·` separators or `opacity-70` on alternating items so mixed-length names read cleanly at 375px.
5. RoleFlipper: replace `min-w-[240px]` with a width measured from the longest role or `min-w-[9ch]`-style em sizing so "University Educator" never overflows at 375px.
6. Verify stats honesty after content additions (e.g. trainings count "5+" vs seeded trainings; publications "6+"): numbers on the site must never exceed what the site itself can evidence.

### 9.4 Analytics

Add a privacy-friendly tracker, no cookie banner needed:

- If deploying on Vercel: `@vercel/analytics` (works with static export? verify; if not, use the script tag approach below).
- Default recommendation: GoatCounter (free) or Plausible (paid). Script tag in `layout.tsx`, gated behind `process.env.NEXT_PUBLIC_ANALYTICS_SRC` so local dev stays clean. Document in the deploy workflow env.

### 9.5 Pipelines (the automation the owner asked for)

1. **Content publish pipeline (already mostly exists)**: Pages CMS save -> commit to `main` -> `.github/workflows/deploy.yml` -> GitHub Pages. Fix the workflow: `NEXT_PUBLIC_BASE_PATH: /indra-giri-portfolio` is a guess; set it to the ACTUAL repo name, or remove it entirely if using a user page (`<user>.github.io`) or a custom domain or Vercel. Add `NEXT_PUBLIC_SITE_URL` env to the build step.
2. **If Vercel is chosen instead**: delete/disable the Pages workflow, connect the repo in Vercel, set env vars (`NEXT_PUBLIC_FORMSPREE_ID`, `NEXT_PUBLIC_SITE_URL`), keep `output: "export"`. Same CMS-commit-deploy flow.
3. **CI quality gate**: add a `check` job to the workflow before deploy: `npm run lint` and `npm run build` on PRs and pushes. Optional but recommended: `lychee` link checker over `out/` monthly (cron) to catch dead resource links, opening an issue on failure.
4. **Build-time artifacts**: sitemap, robots, RSS and OG image all generate during `npm run build`; no extra pipeline steps needed. If `scripts/generate-og.mjs` is used, wire it as `prebuild` in `package.json`.

## 10. Suggested build order

1. A: content migration + loaders (site renders identically) -> commit.
2. G fixes 9.1 to 9.3 (they touch files A already moved) -> commit.
3. B: training section + pages, with section renumbering -> commit.
4. C: project detail pages -> commit.
5. D: resources page -> commit.
6. E: Sankhya AI (may stay TODO-gated) -> commit.
7. F: push to GitHub, `.pages.yml`, connect Pages CMS, write `ADMIN-GUIDE.md`, test an edit end to end -> commit.
8. G 9.4 to 9.5: analytics + workflow fixes -> commit -> verify live deploy.
9. Update `CLAUDE.md`: new architecture (content/ folder, loaders, new routes, section numbering 01 to 10, admin flow, junction rule unchanged).

## 11. Final verification checklist (supersedes the one in CLAUDE.md for this upgrade)

1. `npm run dev`: home, `/blog`, one article, `/trainings`, one training, one project page, `/resources` all load with ZERO console errors, dark and light both readable.
2. Research filters still work (AI & tech shows 2 cards); clickable project cards navigate, non-detail cards do not.
3. Mobile 375px: no horizontal scroll anywhere, nav menu works, hero meta row with the Sankhya link wraps cleanly, trusted-by strip is tidy.
4. Contact form: submits on Enter, labels announced by screen reader (spot check with browser a11y tree), invalid email blocked natively, honeypot untriggered.
5. Stop dev server, `npm run build` passes; confirm `out/` contains sitemap.xml, robots.txt, feed.xml, og image, and all new routes.
6. Share preview: paste the deployed URL into an OG debugger (e.g. opengraph.xyz); a proper card with image appears. Repeat for one blog post.
7. Admin round trip: owner (or tester) edits a training in Pages CMS, uploads a photo, saves; within ~3 minutes the live site shows it; `git pull` locally shows the commit.
8. No em-dashes in any new content or UI copy. No fabricated content anywhere. All external links open in a new tab and none 404.
