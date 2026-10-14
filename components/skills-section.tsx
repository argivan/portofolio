"use client";

import React, { useState } from "react";
import { Code2, Braces, Palette, Terminal, Server, Cpu, Database, Box, Cloud } from "lucide-react";

type SkillCategory = "all" | "frontend" | "backend" | "devops";

interface SkillItem {
  name: string;
  category: "frontend" | "backend" | "devops";
  icon: React.ElementType;
  description: string;
  proficiency: number;
}

const SKILLS_DATA: SkillItem[] = [
  {
    name: "React / Next.js",
    category: "frontend",
    icon: Code2,
    description: "Server & Client components, App Router, custom hooks, and state management.",
    proficiency: 90,
  },
  {
    name: "JavaScript & TypeScript",
    category: "frontend",
    icon: Braces,
    description: "Strict typing, ESNext features, asynchronous programming, and clean modular code.",
    proficiency: 95,
  },
  {
    name: "Tailwind CSS & Modern CSS",
    category: "frontend",
    icon: Palette,
    description: "Design system tokens, responsive grid layouts, animations, and zero-runtime styles.",
    proficiency: 88,
  },
  {
    name: "PHP & Laravel",
    category: "backend",
    icon: Terminal,
    description: "Eloquent ORM, queue workers, RESTful APIs, event broadcasting, and authentication.",
    proficiency: 92,
  },
  {
    name: "Node.js & Express",
    category: "backend",
    icon: Server,
    description: "Event-driven architecture, high-concurrency microservices, and middleware chains.",
    proficiency: 85,
  },
  {
    name: "Go (Golang)",
    category: "backend",
    icon: Cpu,
    description: "Goroutines, lightweight microservices, HTTP routing, and memory optimization.",
    proficiency: 75,
  },
  {
    name: "PostgreSQL & MySQL",
    category: "devops",
    icon: Database,
    description: "Complex joins, indexing strategies, migrations, and ACID transaction handling.",
    proficiency: 88,
  },
  {
    name: "Docker & Containers",
    category: "devops",
    icon: Box,
    description: "Multi-stage builds, compose files, container networking, and local reproducible environments.",
    proficiency: 80,
  },
  {
    name: "AWS & CI/CD Pipelines",
    category: "devops",
    icon: Cloud,
    description: "GitHub Actions automated testing, deployment workflows, S3, and EC2 provisioning.",
    proficiency: 82,
  },
];

const CATEGORIES: { id: SkillCategory; label: string }[] = [
  { id: "all", label: "All Tech" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "devops", label: "DevOps & Database" },
];

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState<SkillCategory>("all");

  const filteredSkills =
    activeTab === "all"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === activeTab);

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
            Technical Arsenal
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Toolbox &amp; Core Stack
          </h2>
          <div className="mt-3 h-1 w-12 bg-primary rounded-full" />
        </div>

        {/* Filter Tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-mono transition-colors ${
                activeTab === cat.id
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "border border-border bg-card text-muted-foreground hover:border-border hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary/50 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground">
                      {skill.name}
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-semibold text-muted-foreground">
                    {skill.proficiency}%
                  </span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {skill.description}
                </p>

                <div className="mt-4 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
