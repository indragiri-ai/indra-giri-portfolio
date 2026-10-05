"use client";

import { useSyncExternalStore } from "react";
import {
  IconMail,
  IconFileText,
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandFacebook,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { profile, whatsappUrl } from "@/lib/data";

const getYear = () => new Date().getFullYear();
const neverChanges = () => () => {};

export default function Footer() {
  /* This is a static export: the page is rendered once at build/deploy time,
     so a plain `new Date().getFullYear()` freezes at whatever year the last
     deploy happened in. useSyncExternalStore renders the build year first
     (matches the static HTML, no hydration mismatch) then re-reads the
     visitor's own clock, so a stale-but-undeployed site still shows the
     right year. */
  const year = useSyncExternalStore(neverChanges, getYear, getYear);
  /* Ordered by what a professional visitor is most likely to want. Entries with
     an empty href are dropped, so an unset profile never leaves a dead icon. */
  const socials = [
    { Icon: IconMail, href: `mailto:${profile.email}`, label: "Email" },
    { Icon: IconBrandWhatsapp, href: whatsappUrl, label: "WhatsApp" },
    { Icon: IconBrandLinkedin, href: profile.linkedin, label: "LinkedIn" },
    { Icon: IconBrandGithub, href: profile.github, label: "GitHub" },
    { Icon: IconBrandFacebook, href: profile.facebook, label: "Facebook" },
    { Icon: IconFileText, href: profile.arxiv, label: "arXiv" },
  ].filter((s) => Boolean(s.href));

  return (
    <footer className="border-t border-line/10 px-6 py-12 sm:px-10">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
          © {year} {profile.name}
        </div>
        <div className="flex gap-3">
          {socials.map(({ Icon, href, label }) => {
            const external = href.startsWith("http");
            return (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={external ? `${label} (opens in new tab)` : label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line/15 text-fg transition-all hover:-translate-y-1 hover:border-accent hover:text-accent-text"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
        <div className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
          Built with Next.js
        </div>
      </div>
    </footer>
  );
}
