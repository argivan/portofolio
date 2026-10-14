"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Mail, Database, Server, Layout, ShieldCheck } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FOCUS_AREAS = [
  "Laravel & Go Microservices",
  "React & Next.js Frontends",
  "PostgreSQL & Query Optimization",
  "Docker Containerization & CI/CD",
  "High-Throughput REST & WebSocket APIs",
];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % FOCUS_AREAS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Asymmetric Hero Introduction */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status badge: Clean flat border, no pulsing neon glow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-mono text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span>Available for freelance projects & full-time roles</span>
            </div>

            {/* Headline: Clean typography, no gradient text, vermilion accent */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl md:leading-[1.1]">
              Building reliable web apps &amp;{" "}
              <span className="text-primary underline decoration-primary/30 decoration-2 underline-offset-8">
                scalable backend
              </span>{" "}
              systems.
            </h1>

            {/* Plain, specific copy without generic fluff */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              I am Argi Maulana, a Fullstack Developer building production systems with
              Laravel, Node.js, Go, React, Next.js, and PostgreSQL. I design clean database schemas,
              resilient APIs, and fast, predictable user interfaces.
            </p>

            {/* Focus area pill */}
            <div className="mt-5 flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="text-primary font-bold">Focus:</span>
              <span className="rounded border border-border bg-card px-2.5 py-1 text-foreground">
                {FOCUS_AREAS[roleIndex]}
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                data-magnetic
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>View Selected Work</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#contact"
                data-magnetic
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://github.com"
                /* TODO: replace with user personal GitHub profile URL if different */
                target="_blank"
                rel="noreferrer"
                data-magnetic
                aria-label="GitHub Profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <GithubIcon className="h-4 w-4" />
              </a>

              <a
                href="https://linkedin.com"
                /* TODO: replace with user personal LinkedIn profile URL if different */
                target="_blank"
                rel="noreferrer"
                data-magnetic
                aria-label="LinkedIn Profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>

              <a
                href="mailto:hello@argimaulana.my.id"
                /* TODO: replace with user primary email address if different */
                data-magnetic
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Real Stack & Core Competencies Table (Replaces the fake macOS JSON card) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Core Capabilities
                  </span>
                  <h3 className="text-base font-bold text-foreground">
                    Production Stack
                  </h3>
                </div>
                <div className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                  Active
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/50 p-3">
                  <Server className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                  <div>
                    <div className="font-mono text-xs font-semibold text-foreground">
                      Backend &amp; Architecture
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      PHP (Laravel), Node.js (Express), Go (Microservices), RESTful &amp; WebSocket APIs
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/50 p-3">
                  <Layout className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                  <div>
                    <div className="font-mono text-xs font-semibold text-foreground">
                      Frontend Engineering
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      React, Next.js (App Router), TypeScript, Tailwind CSS, Responsive Design Systems
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/50 p-3">
                  <Database className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                  <div>
                    <div className="font-mono text-xs font-semibold text-foreground">
                      Databases &amp; Caching
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      PostgreSQL, MySQL, Redis Pub/Sub &amp; Caching, MongoDB
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/50 p-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                  <div>
                    <div className="font-mono text-xs font-semibold text-foreground">
                      DevOps &amp; Infrastructure
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Docker Containers, GitHub Actions CI/CD, AWS EC2/S3, Linux Server Management
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-border pt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono">Experience: 5+ Years</span>
                <span className="font-mono text-primary font-medium">Jakarta, ID</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
