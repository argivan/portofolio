"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, Layers, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

type ProjectCategory = "all" | "fullstack" | "frontend" | "backend";

interface ProjectItem {
  id: string;
  title: string;
  category: "fullstack" | "frontend" | "backend";
  tag: string;
  stars: number;
  description: string;
  tech: string[];
  github: string;
  demo: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "apex-analytics",
    title: "Apex Analytics Hub",
    category: "fullstack",
    tag: "Fullstack SaaS",
    stars: 48,
    description:
      "Multi-tenant data analytics platform with customizable KPI widgets, role-based access control, queued asynchronous PDF exports, and database query optimizations.",
    tech: ["Laravel", "React", "PostgreSQL", "Redis"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    id: "sneakerlab",
    title: "SneakerLab Online Store",
    category: "frontend",
    tag: "Frontend & E-Commerce",
    stars: 32,
    description:
      "E-commerce storefront engineered for sub-second interactions. Features dynamic multi-filter facet search, synchronized cart state management, and Stripe checkout integration.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Stripe"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    id: "flowchat",
    title: "FlowChat Real-time Engine",
    category: "backend",
    tag: "Backend Microservice",
    stars: 55,
    description:
      "WebSocket-driven messaging engine capable of sustained concurrent rooms. Backed by Redis Pub/Sub horizontal message distribution and MongoDB persistence.",
    tech: ["Node.js", "Socket.io", "Redis", "MongoDB"],
    github: "https://github.com",
    demo: "https://example.com",
  },
];

const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "fullstack", label: "Fullstack" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Header and filters reveal
      gsap.from(".projects-header-anim", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".projects-filter-anim", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      // Cards staggered entrance
      gsap.from(".project-card-anim", {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 82%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter]);

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeFilter);

  return (
    <section ref={sectionRef} id="projects" className="py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="projects-header-anim flex flex-col items-start">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
            Selected Work
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Featured Projects
          </h2>
          <div className="mt-3 h-1 w-12 bg-primary rounded-full" />
        </div>

        {/* Filter buttons */}
        <div className="projects-filter-anim mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-mono transition-colors ${
                activeFilter === cat.id
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "border border-border bg-card text-muted-foreground hover:border-border hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              data-magnetic
              className="project-card-anim group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full border border-border bg-secondary/40 px-3 py-1 font-mono text-[11px] text-muted-foreground">
                    {project.tag}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-muted-foreground">
                    <Star className="h-3.5 w-3.5 text-primary fill-primary" />
                    <span>{project.stars}</span>
                  </div>
                </div>

                {/* Minimalist Visual Wireframe */}
                <div className="mt-5 rounded-lg border border-border/80 bg-background/80 p-4">
                  <div className="flex items-center gap-2 border-b border-border/60 pb-2.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {project.id}.service
                    </span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="h-3 w-4/5 rounded bg-muted/60" />
                    <div className="h-3 w-3/5 rounded bg-muted/40" />
                    <div className="mt-2 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
                      <span className="font-mono text-[10px] text-muted-foreground">
                        Production build • REST &amp; SQL
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Title & Description */}
                <h3 className="mt-5 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>

              {/* Tech Badges & Links */}
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-border/60 bg-secondary/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <a
                    href={project.github}
                    /* TODO: replace with specific repository URL */
                    target="_blank"
                    rel="noreferrer"
                    data-magnetic
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>Code</span>
                  </a>

                  <a
                    href={project.demo}
                    /* TODO: replace with specific live demo URL */
                    target="_blank"
                    rel="noreferrer"
                    data-magnetic
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
