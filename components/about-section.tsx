"use client";

import React, { useEffect, useRef } from "react";
import { Briefcase, CheckCircle2, Zap, Users, Download, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  {
    icon: Briefcase,
    target: 5,
    prefix: "",
    suffix: "+",
    label: "Years Experience",
    subtext: "Enterprise & startup web apps",
  },
  {
    icon: CheckCircle2,
    target: 50,
    prefix: "",
    suffix: "+",
    label: "Projects Completed",
    subtext: "Fullstack, API & frontend builds",
  },
  {
    icon: Zap,
    target: 99,
    prefix: "<",
    suffix: "ms",
    label: "Average API Latency",
    subtext: "Optimized queries & caching",
  },
  {
    icon: Users,
    target: 20,
    prefix: "",
    suffix: "+",
    label: "Clients & Teams",
    subtext: "Delivering reliable deliverables",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const countRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Reveal section header
      gsap.from(".about-header", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Reveal narrative copy
      gsap.from(".about-narrative", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Reveal and stagger stat cards
      gsap.from(".about-stat-card", {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-stats-container",
          start: "top 85%",
        },
      });

      // Animate stat numbers counting up
      STATS.forEach((stat, index) => {
        const el = countRefs.current[index];
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          onUpdate: () => {
            el.textContent = `${stat.prefix}${Math.round(obj.val)}${stat.suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDownloadCV = () => {
    /* TODO: replace with link to user actual resume/CV PDF file in /public/cv.pdf */
    alert("CV download link placeholder. Please place your resume file in /public/cv.pdf.");
  };

  return (
    <section ref={sectionRef} id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="about-header flex flex-col items-start">
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
          <div className="about-narrative lg:col-span-7 space-y-5 text-base leading-relaxed text-muted-foreground">
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

          {/* Clean Stats Grid with GSAP count-up */}
          <div className="about-stats-container lg:col-span-5 grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="about-stat-card rounded-xl border border-border bg-card p-5 transition-colors hover:border-border/80"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary/50 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="mt-4 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl font-mono">
                    <span
                      ref={(el) => {
                        countRefs.current[i] = el;
                      }}
                    >
                      {stat.prefix}0{stat.suffix}
                    </span>
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
