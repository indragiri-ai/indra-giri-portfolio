"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    let cur = 0;
    const iv = setInterval(() => {
      // ease toward 100 with a data-streamy stutter
      cur += Math.max(1, Math.round((100 - cur) * 0.12));
      if (cur >= 100) {
        cur = 100;
        clearInterval(iv);
        setTimeout(() => setDone(true), 350);
      }
      setCount(cur);
    }, 55);
    return () => clearInterval(iv);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-between bg-bg p-8 sm:p-12"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
            <span className="text-accent-text">●</span> compiling evidence
          </div>
          <div className="font-display text-7xl font-bold tabular-nums text-fg sm:text-8xl">
            {count}
            <span className="text-accent-text">%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
