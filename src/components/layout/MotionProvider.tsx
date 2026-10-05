"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * One motion policy for the whole site: with reducedMotion="user", every
 * Framer Motion animation (hero entrance, mobile menu, Reveal, filters)
 * drops its movement when the visitor asks the OS for reduced motion, so
 * individual components no longer have to remember to check.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
