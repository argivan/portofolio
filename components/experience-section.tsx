"use client";

import React from "react";
import { Briefcase } from "lucide-react";

interface TimelineItem {
  period: string;
  role: string;
  company: string;
  description: string;
  isCurrent?: boolean;
}

const EXPERIENCES: TimelineItem[] = [
  {
    period: "2024 - PRESENT",
    role: "Senior Fullstack Developer",
    company: "TechFlow Solutions",
    description:
      "Leading technical architecture for high-traffic enterprise web services. Spearheaded backend refactoring into modular microservices that reduced average API latency by 45%. Managed Docker containerization and CI/CD deployment pipelines.",
    isCurrent: true,
  },
  {
    period: "2022 - 2024",
    role: "Fullstack Engineer",
    company: "AppForge Studio",
    description:
      "Engineered core multi-tier applications using Laravel, MySQL, and React. Architected third-party payment gateways (Stripe, Midtrans), designed normalized relational schemas, and optimized indexes to support 10k+ daily transactions.",
  },
  {
    period: "2020 - 2022",
    role: "Web Developer",
    company: "PixelCraft Agency",
    description:
      "Developed high-conversion web portals, client dashboards, and bespoke content management systems. Implemented responsive cross-browser layouts, accessible markup, and optimized web vitals.",
  },
];

export function ExperienceSection() {
  return (
    <section id="timeline" className="py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
            Career Progression
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Professional Experience
          </h2>
          <div className="mt-3 h-1 w-12 bg-primary rounded-full" />
        </div>

        <div className="mt-12 relative border-l border-border ml-3 md:ml-4 space-y-10">
          {EXPERIENCES.map((exp) => (
            <div key={exp.company} className="relative pl-8 md:pl-10">
              {/* Timeline marker */}
              <div
                className={`absolute -left-[9px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background ${
                  exp.isCurrent ? "bg-primary" : "bg-muted-foreground"
                }`}
              />

              <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-border/80">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold text-primary">
                    {exp.period}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <h3 className="mt-2 text-lg font-bold text-foreground">
                  {exp.role}
                </h3>

                <p className="mt-2.5 text-xs md:text-sm leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
