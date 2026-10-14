"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = "hello@argimaulana.my.id";
  /* TODO: replace with user real phone/whatsapp number */
  const phone = "+62 812-3456-7890";
  const location = "Jakarta, Indonesia";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    /* In Next.js, this can be linked to an API route or email service */
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 600);
  };

  return (
    <section id="inquiry" className="py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
            Inquiries
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Start a Conversation
          </h2>
          <div className="mt-3 h-1 w-12 bg-primary rounded-full" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Direct Channels */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Have a project in mind, need architecture consulting, or interested in collaborating?
              Reach out directly or send a message using the form.
            </p>

            <div
              onClick={handleCopyEmail}
              data-magnetic
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary/50 text-primary">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-mono text-[11px] text-muted-foreground">
                    Email Address
                  </div>
                  <div className="text-xs font-semibold text-foreground">
                    {email}
                  </div>
                </div>
              </div>
              <button
                type="button"
                aria-label="Copy Email"
                className="text-muted-foreground group-hover:text-primary transition-colors"
              >
                {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary/50 text-primary">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <div className="font-mono text-[11px] text-muted-foreground">
                  Phone / WhatsApp
                </div>
                <div className="text-xs font-semibold text-foreground">
                  {phone}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary/50 text-primary">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <div className="font-mono text-[11px] text-muted-foreground">
                  Location
                </div>
                <div className="text-xs font-semibold text-foreground">
                  {location}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-card p-6 md:p-8"
            >
              {submitted && (
                <div className="mb-6 flex items-center gap-2.5 rounded-lg border border-primary/40 bg-primary/10 p-3.5 text-xs font-medium text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>Thank you! Your message has been received. I will reply shortly.</span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block font-mono text-xs text-muted-foreground">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Argi Maulana"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-muted-foreground">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="subject" className="block font-mono text-xs text-muted-foreground">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  placeholder="Project Inquiry / Role Opportunity"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="block font-mono text-xs text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  placeholder="Tell me about your project scope, timeline, and goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                data-magnetic
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <span>{loading ? "Sending..." : "Send Message"}</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
