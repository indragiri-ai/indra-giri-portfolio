# Indra Giri — The Evidence Engine (Portfolio v2)

A bold, award-grade personal portfolio for **Indra Giri** — Senior Researcher, Data Analyst & Educator. Indigo-noir editorial design with a field-survey flag-orange accent, ledger-style "FIG." annotations, and a WebGL data-field signature.

## ✨ What's inside

- **Next.js 15** (App Router) + **TypeScript** + **React 19**
- **Tailwind CSS** with CSS-variable design tokens, **dark + light modes** (toggle in nav)
- **Preloader** (data-counter intro) and page-load choreography
- **WebGL hero** — drifting data-point field with pointer parallax (**React Three Fiber**)
- **Lenis** smooth scroll integrated with **GSAP ScrollTrigger**
- **Pinned horizontal-scroll** Career Journey on desktop (vertical on mobile)
- **Custom cursor** (dot + spring ring), **magnetic buttons**, spotlight cards, kinetic split-letter headline, client marquee, animated counters & meters
- Filterable research **bento grid** with layout animations
- **Working contact form** → `/api/contact` (Resend, with graceful dev fallback)
- `prefers-reduced-motion` respected throughout (WebGL, preloader, smooth scroll and pinning all degrade gracefully)
- Fully responsive · SEO + OpenGraph metadata · all content in **one data file**

## 🚀 Run it

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## 📬 Contact form email (optional)

Copy `.env.example` → `.env.local`, add your [Resend](https://resend.com) key:

```env
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO_EMAIL=girindra075@gmail.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

Without a key the form still works in dev (logs to the server console).

## ✏️ Edit content

Everything lives in **`src/lib/data.ts`** — projects, publications, skills, teaching, journey, contact details. Edit that one file; the site updates.

Personalise:
- `profile.linkedin` — replace the placeholder with your real URL
- `profile.arxiv` — verify the link resolves
- Skill values — the `tools` array
- CV — already at `public/cv/Indra_Giri_CV.pdf` (Download button wired)
- Photo — drop one in `public/images/` and use it where you like (e.g. About)

## 📁 Structure

```
src/
├── app/                # layout (fonts/theme), page, globals, api/contact
├── components/
│   ├── sections/       # Hero · About · Research · Skills · Teaching
│   │                   # Publications · Journey (horizontal) · Contact
│   ├── layout/         # Navbar (mobile menu, theme toggle) · Footer
│   ├── ui/             # Reveal · MagneticButton · Counter · ThemeToggle · SectionHead
│   └── effects/        # HeroCanvas (WebGL) · SmoothScroll · CursorTrail · Preloader
├── hooks/              # usePrefersReducedMotion
└── lib/                # data.ts (⭐ all content) · utils.ts
```

## ☁️ Deploy

Push to GitHub → import at <https://vercel.com/new> → add the env vars → Deploy.
Every later `git push` redeploys automatically.

---

© Indra Giri. Designed & built as The Evidence Engine.
