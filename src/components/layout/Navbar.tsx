"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { profile, navLinks } from "@/lib/data";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 sm:px-10",
          scrolled
            ? "bg-bg/85 shadow-[0_1px_0_rgb(var(--line)/0.08)] backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <a href="#top" className="font-display text-lg font-bold tracking-tight text-fg">
          IG<span className="text-accent-text">—</span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted">
            evidence engine
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={profile.cvPath}
            download
            className="hidden rounded-full border border-accent bg-accent px-5 py-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-accent-ink transition-transform hover:-translate-y-0.5 sm:block"
          >
            Download CV
          </a>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line/15 text-fg lg:hidden"
          >
            <IconMenu2 size={17} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-bg/97 px-8 py-6 backdrop-blur-lg"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">
                Index
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line/15 text-fg"
              >
                <IconX size={18} />
              </button>
            </div>
            <div className="mt-12 flex flex-col gap-2">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="flex items-baseline gap-4 border-b border-line/10 py-4 font-display text-3xl font-bold text-fg"
                >
                  <span className="font-mono text-xs text-accent-text">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {l.label}
                </motion.a>
              ))}
            </div>
            <a
              href={profile.cvPath}
              download
              className="mt-auto rounded-full border border-accent bg-accent py-3.5 text-center font-mono text-xs font-semibold uppercase tracking-[0.15em] text-accent-ink"
            >
              Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
