"use client";

import React from "react";
import { Briefcase, CheckCircle2, Zap, Users, Download, ArrowRight } from "lucide-react";

const STATS = [
  {
    icon: Briefcase,
    value: "5+",
    label: "Years Experience",
    subtext: "Enterprise & startup web apps",
  },
  {
    icon: CheckCircle2,
    value: "50+",
    label: "Projects Completed",
    subtext: "Fullstack, API & frontend builds",
  },
  {
    icon: Zap,
    value: "<100ms",
    label: "Average API Latency",
    subtext: "Optimized queries & caching",
  },
  {
    icon: Users,
    value: "20+",
    label: "Clients & Teams",
    subtext: "Delivering reliable deliverables",
  },
];

export function AboutSection() {
  const handleDownloadCV = () => {
    /* TODO: replace with link to user actual resume/CV PDF file in /public/cv.pdf */
    alert("CV download link placeholder. Please place your resume file in /public/cv.pdf.");
  };

  return (
    <section id="about" className="py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
            About Me
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Engineering robust backends with polished frontends.
          </h2>
          <div className="mt-3 h-1 w-12 bg-primary rounded-full" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Narrative Info */}
          <div className="lg:col-span-7 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              I am a fullstack web developer focusing on scalable web applications and clean architecture.
              My core background is anchored in server-side engineering with PHP Laravel, Node.js, and Go,
              paired with modern, component-driven client applications built on React and Next.js.
            </p>
            <p>
              Over the past 5 years, I have built multi-tenant SaaS dashboards, integrated complex third-party
              APIs (including Stripe and Midtrans payments), deployed Dockerized microservices, and tuned
              PostgreSQL queries to handle heavy transactional throughput.
            </p>
            <p>
              I treat codebase readability, predictable state management, and type safety as core requirements
              rather than afterthoughts.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                data-magnetic
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Let&apos;s Collaborate</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={handleDownloadCV}
                data-magnetic
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Download className="h-4 w-4 text-primary" />
                <span>Download CV</span>
              </button>
            </div>
          </div>

          {/* Clean Stats Grid (Flat cards, 1px border, no glassmorphism) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-border/80"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary/50 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="mt-4 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl font-mono">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-bold text-foreground">
                    {stat.label}
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">
                    {stat.subtext}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
