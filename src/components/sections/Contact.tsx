"use client";

import { useState } from "react";
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconSend,
  IconCheck,
  IconAlertCircle,
  IconLoader2,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { profile, whatsappUrl } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

type Status = "idle" | "sending" | "sent" | "error" | "invalid" | "invalidEmail";

const labels: Record<Status, string> = {
  idle: "Send message",
  sending: "Sending…",
  sent: "Message sent",
  error: "Something went wrong, please try again",
  invalid: "Please fill name, email & message",
  invalidEmail: "Please enter a valid email address",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("invalid");
      setTimeout(() => setStatus("idle"), 2200);
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setStatus("invalidEmail");
      setTimeout(() => setStatus("idle"), 2200);
      return;
    }
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (!formspreeId) {
      // no form service configured: open the visitor's email app instead
      const body = encodeURIComponent(`${form.message}\n\n${form.name} (${form.email})`);
      const subject = encodeURIComponent(form.subject || `Message from ${form.name}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-line/15 bg-bg px-5 py-4 text-sm text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const labelCls = "mb-1.5 block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted";
  const isError = status === "error" || status === "invalid" || status === "invalidEmail";

  return (
    <section id="contact" className="mx-auto max-w-content px-6 py-20 sm:px-10">
      <Reveal>
        <div className="fig-label mb-5">08 · Contact</div>
        <h2 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-6xl lg:text-7xl">
          Let&apos;s work
          <br />
          <em className="italic text-accent-text">together</em>
        </h2>
        <p className="mt-6 max-w-xl leading-relaxed text-muted">
          Open to research collaborations, AI training engagements, consulting, guest lectures
          and speaking opportunities. I usually respond within a day.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="flex flex-col">
            {[
              { Icon: IconMail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              {
                Icon: IconBrandWhatsapp,
                label: "WhatsApp",
                value: profile.phone,
                href: whatsappUrl,
                external: true,
              },
              { Icon: IconPhone, label: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}` },
              { Icon: IconMapPin, label: "Location", value: profile.location },
            ].map(({ Icon, label, value, href, external }) => {
              const Row = (
                <div className="group flex items-center gap-5 border-b border-line/10 py-6 transition-all hover:pl-2">
                  <Icon size={20} className="text-accent-text" />
                  <div>
                    <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                      {label}
                    </div>
                    <div className="mt-0.5 font-display text-lg font-semibold text-fg group-hover:text-accent-text">
                      {value}
                    </div>
                  </div>
                </div>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  {Row}
                </a>
              ) : (
                <div key={label}>{Row}</div>
              );
            })}

            <div className="mt-8 inline-flex items-center gap-3 self-start rounded-full border border-accent/30 bg-accent/[0.07] px-5 py-3 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-fg">
              <span className="relative h-2 w-2 rounded-full bg-accent">
                <span className="absolute inset-0 animate-ping2 rounded-full bg-accent" />
              </span>
              Available for research & AI projects
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form className="panel p-7 sm:p-9" onSubmit={submit} noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className={labelCls}>Name</label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  className={inputCls}
                  placeholder="Your name"
                  value={form.name}
                  onChange={update("name")}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className={labelCls}>Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={inputCls}
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={update("email")}
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="contact-subject" className={labelCls}>Subject</label>
              <input
                id="contact-subject"
                name="subject"
                autoComplete="off"
                className={inputCls}
                placeholder="What's this about?"
                value={form.subject}
                onChange={update("subject")}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="contact-message" className={labelCls}>Message</label>
              <textarea
                id="contact-message"
                name="message"
                required
                className={`${inputCls} min-h-32 resize-y`}
                placeholder="Write your message…"
                value={form.message}
                onChange={update("message")}
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-mono text-xs font-semibold uppercase tracking-[0.15em] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                status === "sent"
                  ? "bg-fg text-bg"
                  : "bg-accent text-accent-ink hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgb(var(--accent)/0.3)]"
              }`}
            >
              {status === "sending" && <IconLoader2 size={15} className="animate-spin" />}
              {status === "sent" && <IconCheck size={15} />}
              {isError && <IconAlertCircle size={15} />}
              {status === "idle" && <IconSend size={15} />}
              {labels[status]}
            </button>
            <p role="status" aria-live="polite" className="sr-only">
              {status !== "idle" ? labels[status] : ""}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
