"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Each frame the ring closes 10% of the remaining gap — smooth, no oscillation.
const LERP = 0.1;

export default function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Dot snaps to real cursor position instantly
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // Ring follows via lerp in a RAF loop
  const rx = useMotionValue(-100);
  const ry = useMotionValue(-100);

  const mouse = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.body.classList.add("cursor-none-host");

    const move = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      mx.set(e.clientX);
      my.set(e.clientY);
      setHovering(!!(e.target as HTMLElement).closest("a, button, [data-cursor]"));
    };

    const tick = () => {
      rx.set(rx.get() + (mouse.current.x - rx.get()) * LERP);
      ry.set(ry.get() + (mouse.current.y - ry.get()) * LERP);
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafId.current);
      document.body.classList.remove("cursor-none-host");
    };
  }, [mx, my, rx, ry, reduced]);

  if (!enabled) return null;

  return (
    <>
      {/* trailing ring — lerped */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] rounded-full border border-accent/70"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          transition: "width 0.25s ease, height 0.25s ease",
        }}
      />
      {/* dot — instant */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ x: mx, y: my, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
