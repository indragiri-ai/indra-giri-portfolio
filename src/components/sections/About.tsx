"use client";

import { motion } from "framer-motion";
import { about, profile } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-content px-6 py-28 sm:px-10">
      <SectionHead
        fig="01"
        tag="Abstract"
        title={
          <>
            Where rigorous <em>research</em>
            <br />
            meets real-world <em>impact</em>.
          </>
        }
      />

      {/* oversized pull-quote — the thesis */}
      <Reveal>
        <blockquote className="relative my-10 border-l-2 border-accent pl-8 sm:pl-12">
          <p className="max-w-3xl font-display text-3xl font-bold leading-snug text-fg sm:text-4xl">
            “{about.lead}”
          </p>
          <footer className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
            — {profile.name}, field notes
          </footer>
        </blockquote>
      </Reveal>

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
        <div>
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <p className="mb-6 leading-loose text-muted">{p}</p>
            </Reveal>
          ))}
        </div>

        <div>
          {about.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 250, damping: 22 }}
                className="group border-t border-line/10 py-7 last:border-b"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-accent-text">
                    [{pillar.tag}]
                  </span>
                  <span className="font-mono text-[0.62rem] text-muted">
                    0{i + 1} / 03
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-fg transition-colors group-hover:text-accent-text">
                  {pillar.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{pillar.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
