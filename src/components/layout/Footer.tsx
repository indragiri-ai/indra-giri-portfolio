import { IconMail, IconFileText, IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";
import { profile } from "@/lib/data";

export default function Footer() {
  const socials = [
    { Icon: IconMail, href: `mailto:${profile.email}`, label: "Email" },
    { Icon: IconBrandLinkedin, href: profile.linkedin, label: "LinkedIn" },
    { Icon: IconBrandGithub, href: profile.github, label: "GitHub" },
    { Icon: IconFileText, href: profile.arxiv, label: "arXiv" },
  ];

  return (
    <footer className="border-t border-line/10 px-6 py-12 sm:px-10">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
          © {new Date().getFullYear()} {profile.name} — end of record
        </div>
        <div className="flex gap-3">
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line/15 text-fg transition-all hover:-translate-y-1 hover:border-accent hover:text-accent-text"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
        <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
          Built with Next.js 15
        </div>
      </div>
    </footer>
  );
}
