"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Dot eases quickly toward the cursor — fast enough to feel instant,
// soft enough to smooth out subpixel jitter.
const DOT_LERP = 0.4;

// Ring uses a two-layer lerp: the velocity itself is eased toward the
// remaining gap, then applied to position. This gives natural momentum —
// smooth acceleration and deceleration instead of a fixed-percentage chase.
const RING_ACCEL = 0.18; // how strongly the gap pulls on velocity
const RING_FRICTION = 0.82; // how much velocity carries over each frame

// Below this total movement (px/frame) everything has settled — stop the RAF.
const IDLE_EPSILON = 0.01;

export default function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Dot — lightly eased toward the real cursor
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // Ring — momentum-based follow
  const rx = useMotionValue(-100);
  const ry = useMotionValue(-100);

  const mouse = useRef({ x: -100, y: -100 });
  const ringVel = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const running = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.body.classList.add("cursor-none-host");

    const tick = () => {
      const { x: tx, y: ty } = mouse.current;

      // Dot: simple lerp at a high factor
      const dotDx = (tx - mx.get()) * DOT_LERP;
      const dotDy = (ty - my.get()) * DOT_LERP;
      mx.set(mx.get() + dotDx);
      my.set(my.get() + dotDy);

      // Ring: lerp the velocity, then apply velocity to position
      const v = ringVel.current;
      v.x = v.x * RING_FRICTION + (tx - rx.get()) * RING_ACCEL;
      v.y = v.y * RING_FRICTION + (ty - ry.get()) * RING_ACCEL;
      rx.set(rx.get() + v.x);
      ry.set(ry.get() + v.y);

      // Total motion this frame — if everything has settled, park exactly
      // on target and stop burning frames until the next mousemove.
      const moved =
        Math.abs(dotDx) +
        Math.abs(dotDy) +
        Math.abs(v.x) +
        Math.abs(v.y) +
        Math.abs(tx - rx.get()) +
        Math.abs(ty - ry.get());

      if (moved < IDLE_EPSILON) {
        mx.set(tx);
        my.set(ty);
        rx.set(tx);
        ry.set(ty);
        v.x = 0;
        v.y = 0;
        running.current = false;
        return;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (running.current) return;
      running.current = true;
      rafId.current = requestAnimationFrame(tick);
    };

    const move = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setHovering(!!(e.target as HTMLElement).closest("a, button, [data-cursor]"));
      wake();
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafId.current);
      running.current = false;
      document.body.classList.remove("cursor-none-host");
    };
  }, [mx, my, rx, ry, reduced]);

  if (!enabled) return null;

  return (
    <>
      {/* trailing ring — momentum follow */}
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
      {/* dot — fast ease */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ x: mx, y: my, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
