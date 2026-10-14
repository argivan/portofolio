"use client";

import React, { useEffect, useRef } from "react";
import { Briefcase } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(".experience-header-anim", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Sequential timeline items entrance on scroll
      itemsRef.current.forEach((el) => {
        if (!el) return;
        const dot = el.querySelector(".timeline-dot-anim");
        const card = el.querySelector(".timeline-card-anim");

        if (dot) {
          gsap.from(dot, {
            scale: 0,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          });
        }

        if (card) {
          gsap.from(card, {
            x: -25,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="timeline" className="py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="experience-header-anim flex flex-col items-start">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
            Career Progression
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Professional Experience
          </h2>
          <div className="mt-3 h-1 w-12 bg-primary rounded-full" />
        </div>

        <div className="mt-12 relative border-l border-border ml-3 md:ml-4 space-y-10">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={exp.company}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="relative pl-8 md:pl-10"
            >
              {/* Timeline marker */}
              <div
                className={`timeline-dot-anim absolute -left-[9px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background ${
                  exp.isCurrent ? "bg-primary" : "bg-muted-foreground"
                }`}
              />

              <div className="timeline-card-anim rounded-xl border border-border bg-card p-6 transition-colors hover:border-border/80">
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
