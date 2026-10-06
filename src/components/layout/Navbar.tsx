"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { profile, navLinks } from "@/lib/data";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { cn, asset } from "@/lib/utils";

const MENU_ID = "mobile-menu";

/** usePathname has no basePath, and trailingSlash adds a final "/". */
function isCurrent(pathname: string, href: string) {
  if (href.includes("#")) return false;
  const path = pathname.replace(/\/$/, "") || "/";
  return path === href || path.startsWith(`${href}/`);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll, trap focus inside the panel, close on Escape,
  // and return focus to the trigger once the menu closes.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = menuRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    focusables?.[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const trigger = openButtonRef.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

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
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-fg">
          Indra <span className="italic text-accent-text">Giri</span>
        </Link>

        <ul className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {navLinks.map((l) => {
            const current = isCurrent(pathname, l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "group relative font-mono text-[0.8rem] uppercase tracking-[0.12em] transition-colors hover:text-fg",
                    current ? "text-fg" : "text-muted"
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 group-hover:w-full",
                      current ? "w-full" : "w-0"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={asset(profile.cvPath)}
            download
            className="hidden rounded-full border border-accent bg-accent px-5 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-accent-ink transition-transform hover:-translate-y-0.5 sm:block"
          >
            Download CV
          </a>
          <button
            ref={openButtonRef}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls={MENU_ID}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line/15 text-fg lg:hidden"
          >
            <IconMenu2 size={17} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id={MENU_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-bg px-6 py-5"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                Menu
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line/15 text-fg"
              >
                <IconX size={18} />
              </button>
            </div>
            <div className="mt-6 min-h-0 flex-1 flex flex-col overflow-y-auto">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={isCurrent(pathname, l.href) ? "page" : undefined}
                    className="flex items-baseline gap-4 border-b border-line/10 py-3 font-display text-2xl font-semibold text-fg"
                  >
                    <span className="font-mono text-xs text-accent-text">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <a
              href={asset(profile.cvPath)}
              download
              className="mt-5 shrink-0 rounded-full border border-accent bg-accent py-3.5 text-center font-mono text-xs font-semibold uppercase tracking-[0.15em] text-accent-ink"
            >
              Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
