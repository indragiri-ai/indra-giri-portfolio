"use client";

import { useEffect, useRef, useState } from "react";
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

type Status = "idle" | "sending" | "sent" | "mailto" | "error" | "timeout";
type Field = "name" | "email" | "subject" | "message";
type Errors = Partial<Record<Field, string>>;

const FIELDS: Field[] = ["name", "email", "subject", "message"];

const statusText: Record<Exclude<Status, "idle" | "sending">, string> = {
  sent: "Thank you, your message has been sent. I usually reply within a day.",
  mailto: `Your email app should have opened with the message filled in. If nothing happened, write to ${profile.email} directly.`,
  error: "Something went wrong and the message was not sent. Please try again, or email me directly.",
  timeout: "The request timed out and the message was not sent. Please try again, or email me directly.",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUEST_TIMEOUT_MS = 15_000;
const LIMITS = { name: 100, email: 254, subject: 200, message: 5_000 } as const;

/* Baked in at build time by the static export. Without a valid ID the form
   falls back to opening the visitor's email app, and the button and the note
   under it say so BEFORE they press it. */
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";
const USE_FORMSPREE = /^[A-Za-z0-9_-]+$/.test(FORMSPREE_ID);

function validate(p: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!p.name) errors.name = "Please enter your name.";
  else if (p.name.length > LIMITS.name) errors.name = `Please keep this under ${LIMITS.name} characters.`;
  if (!p.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(p.email) || p.email.length > LIMITS.email)
    errors.email = "This does not look like a valid email address.";
  if (p.subject.length > LIMITS.subject)
    errors.subject = `Please keep this under ${LIMITS.subject} characters.`;
  if (!p.message) errors.message = "Please write a message.";
  else if (p.message.length > LIMITS.message)
    errors.message = `Please keep this under ${LIMITS.message.toLocaleString("en")} characters.`;
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [gotcha, setGotcha] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRequestRef = useRef<AbortController | null>(null);
  const requestSequenceRef = useRef(0);

  const clearResetTimer = () => {
    if (!resetTimerRef.current) return;
    clearTimeout(resetTimerRef.current);
    resetTimerRef.current = null;
  };

  const resetStatusAfter = (delay: number) => {
    clearResetTimer();
    resetTimerRef.current = setTimeout(() => {
      setStatus("idle");
      resetTimerRef.current = null;
    }, delay);
  };

  useEffect(
    () => () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      requestSequenceRef.current += 1;
      activeRequestRef.current?.abort();
    },
    []
  );

  const update =
    (k: Field) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      // an error stays until the visitor edits that field, not on a timer
      setErrors((prev) => {
        if (!prev[k]) return prev;
        const next = { ...prev };
        delete next[k];
        return next;
      });
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    clearResetTimer();

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
      _gotcha: gotcha,
    };

    const found = validate(payload);
    setErrors(found);
    const firstInvalid = FIELDS.find((f) => found[f]);
    if (firstInvalid) {
      setStatus("idle");
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    // Bots commonly fill this off-screen field. Formspree also recognises
    // _gotcha server-side, but short-circuiting avoids spending form quota.
    if (gotcha) {
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setGotcha("");
      resetStatusAfter(6000);
      return;
    }

    if (!USE_FORMSPREE) {
      // no form service configured: open the visitor's email app instead
      const body = encodeURIComponent(
        `${payload.message}\n\n${payload.name} (${payload.email})`
      );
      const subject = encodeURIComponent(payload.subject || `Message from ${payload.name}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    activeRequestRef.current?.abort();
    const controller = new AbortController();
    activeRequestRef.current = controller;
    const requestSequence = ++requestSequenceRef.current;
    const requestTimeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error("failed");
      if (requestSequence !== requestSequenceRef.current) return;
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setGotcha("");
      resetStatusAfter(6000);
    } catch (error) {
      if (requestSequence !== requestSequenceRef.current) return;
      // failures stay on screen: the visitor needs to know it did not send
      setStatus(error instanceof Error && error.name === "AbortError" ? "timeout" : "error");
    } finally {
      clearTimeout(requestTimeout);
      if (activeRequestRef.current === controller) activeRequestRef.current = null;
    }
  };

  const inputCls =
    "w-full rounded-xl border border-line/15 bg-bg px-5 py-4 text-sm text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-[invalid=true]:border-error/70";
  const labelCls = "mb-1.5 block font-mono text-xs uppercase tracking-[0.12em] text-muted";
  const isError = status === "error" || status === "timeout";

  /** Shared a11y wiring per field: invalid state plus its error message. */
  const fieldProps = (f: Field) => ({
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? `contact-${f}-error` : undefined,
  });
  const fieldError = (f: Field) =>
    errors[f] ? (
      <p id={`contact-${f}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-error">
        <IconAlertCircle size={14} aria-hidden /> {errors[f]}
      </p>
    ) : null;

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
                    <div className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
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

            <div className="mt-8 inline-flex items-center gap-3 self-start rounded-full border border-accent/30 bg-accent/[0.07] px-5 py-3 font-mono text-xs uppercase tracking-[0.12em] text-fg">
              <span className="relative h-2 w-2 rounded-full bg-accent">
                <span className="absolute inset-0 animate-ping2 rounded-full bg-accent" />
              </span>
              Available for research & AI projects
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form className="panel relative p-7 sm:p-9" onSubmit={submit} noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className={labelCls}>Name</label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={LIMITS.name}
                  className={inputCls}
                  placeholder="Your name"
                  value={form.name}
                  onChange={update("name")}
                  {...fieldProps("name")}
                />
                {fieldError("name")}
              </div>
              <div>
                <label htmlFor="contact-email" className={labelCls}>Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={LIMITS.email}
                  className={inputCls}
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={update("email")}
                  {...fieldProps("email")}
                />
                {fieldError("email")}
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="contact-subject" className={labelCls}>Subject</label>
              <input
                id="contact-subject"
                name="subject"
                autoComplete="off"
                maxLength={LIMITS.subject}
                className={inputCls}
                placeholder="What's this about?"
                value={form.subject}
                onChange={update("subject")}
                {...fieldProps("subject")}
              />
              {fieldError("subject")}
            </div>
            <div className="mt-4">
              <label htmlFor="contact-message" className={labelCls}>Message</label>
              <textarea
                id="contact-message"
                name="message"
                required
                maxLength={LIMITS.message}
                className={`${inputCls} min-h-32 resize-y`}
                placeholder="Write your message…"
                value={form.message}
                onChange={update("message")}
                {...fieldProps("message")}
              />
              {fieldError("message")}
            </div>
            <div
              aria-hidden="true"
              className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
            >
              <label htmlFor="contact-company">Leave this field blank</label>
              <input
                id="contact-company"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                value={gotcha}
                onChange={(e) => setGotcha(e.target.value)}
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
              {status === "sending" ? (
                <IconLoader2 size={15} className="animate-spin" />
              ) : status === "sent" ? (
                <IconCheck size={15} />
              ) : USE_FORMSPREE ? (
                <IconSend size={15} />
              ) : (
                <IconMail size={15} />
              )}
              {status === "sending"
                ? "Sending…"
                : status === "sent"
                  ? "Message sent"
                  : USE_FORMSPREE
                    ? "Send message"
                    : "Open in my email app"}
            </button>
            <p
              role="status"
              aria-live="polite"
              className={`mt-4 flex items-start justify-center gap-2 text-center text-sm leading-relaxed empty:hidden ${
                isError ? "text-error" : "text-fg"
              }`}
            >
              {status === "idle" || status === "sending" ? "" : statusText[status]}
            </p>
            <p className="mt-4 text-center text-xs leading-relaxed text-muted">
              {USE_FORMSPREE
                ? "Your message is delivered through Formspree."
                : `This opens your email app with the message ready to send to ${profile.email}.`}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
