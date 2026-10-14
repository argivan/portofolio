"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// STYLES (uses shadcn tokens only, so it follows your theme.css palette)
// -------------------------------------------------------------------------
const STYLES = `
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 40s linear infinite; }

@media (prefers-reduced-motion: reduce) {
  .animate-footer-scroll-marquee { animation: none; }
}

.footer-bg-grid {
  background-size: 64px 64px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 4%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 4%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-giant-bg-text {
  font-size: 28vw;
  line-height: 0.75;
  font-weight: 800;
  letter-spacing: -0.06em;
  color: transparent;
  -webkit-text-stroke: 1.5px color-mix(in oklch, var(--primary) 35%, transparent);
}

/* Flat, solid pill: no glassmorphism, no glow */
.footer-pill {
  border: 1px solid var(--border);
  background: color-mix(in oklch, var(--foreground) 3%, transparent);
  transition: background .3s ease, color .3s ease, border-color .3s ease;
}
.footer-pill:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: var(--primary-foreground);
}
.footer-pill:hover svg { color: var(--primary-foreground); }
`;

// -------------------------------------------------------------------------
// MAGNETIC BUTTON
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const element = localRef.current;
      if (!element) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const ctx = gsap.context(() => {
        const onMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(element, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(element, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.35)" });
        };
        element.addEventListener("mousemove", onMove as EventListener);
        element.addEventListener("mouseleave", onLeave);
        return () => {
          element.removeEventListener("mousemove", onMove as EventListener);
          element.removeEventListener("mouseleave", onLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------
const MARQUEE = [
  "Clean Architecture",
  "Laravel & Go",
  "React & Next.js",
  "PostgreSQL",
  "Docker & CI/CD",
  "Open for work",
];

const MarqueeItem = () => (
  <div className="flex items-center gap-10 px-5">
    {MARQUEE.map((t) => (
      <React.Fragment key={t}>
        <span>{t}</span>
        <span className="text-primary">●</span>
      </React.Fragment>
    ))}
  </div>
);

export interface CinematicFooterProps {
  email?: string;
  github?: string;
  linkedin?: string;
  name?: string;
}

export function CinematicFooter({
  email = "hello@argimaulana.my.id",
  github = "https://github.com",
  linkedin = "https://linkedin.com",
  name = "Argi Maulana",
}: CinematicFooterProps) {
  const [year, setYear] = useState(2026);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.85, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Curtain reveal: wrapper clips the fixed footer so it is revealed as the page above scrolls away */}
      <div
        ref={wrapperRef}
        id="contact"
        className="relative h-[100svh] min-h-[650px] w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="cinematic-footer-wrapper fixed bottom-0 left-0 flex h-[100svh] min-h-[650px] w-full flex-col justify-between overflow-hidden bg-background text-foreground">
          <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

          <div
            ref={giantTextRef}
            className="footer-giant-bg-text pointer-events-none absolute -bottom-[2vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
          >
            ARGI
          </div>

          {/* Marquee */}
          <div className="absolute left-0 top-10 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-border bg-primary py-3 text-primary-foreground">
            <div className="animate-footer-scroll-marquee flex w-max text-xs font-bold uppercase tracking-[0.25em] md:text-sm">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* Center content */}
          <div className="relative z-10 mx-auto mt-20 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6">
            <h2
              ref={headingRef}
              className="mb-10 text-center text-4xl font-extrabold leading-[0.95] tracking-tighter md:text-8xl"
            >
              Let&apos;s build
              <br />
              <span className="text-primary">something real.</span>
            </h2>

            <div ref={linksRef} className="flex w-full flex-col items-center gap-6">
              <div className="flex w-full flex-wrap justify-center gap-4">
                <MagneticButton
                  as="a"
                  href={`mailto:${email}`}
                  className="footer-pill group flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold md:px-10 md:py-5 md:text-base"
                >
                  <Mail className="h-5 w-5 text-primary transition-colors" />
                  Send an email
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-pill group flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold md:px-10 md:py-5 md:text-base"
                >
                  <GithubIcon className="h-5 w-5 text-primary transition-colors" />
                  GitHub
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-pill group flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold md:px-10 md:py-5 md:text-base"
                >
                  <LinkedinIcon className="h-5 w-5 text-primary transition-colors" />
                  LinkedIn
                </MagneticButton>
              </div>

              <div className="mt-2 flex w-full flex-wrap justify-center gap-3 md:gap-5">
                {[
                  { label: "Home", href: "#home" },
                  { label: "About", href: "#about" },
                  { label: "Skills", href: "#skills" },
                  { label: "Projects", href: "#projects" },
                  { label: "Experience", href: "#timeline" },
                ].map((item) => (
                  <MagneticButton
                    key={item.href}
                    as="a"
                    href={item.href}
                    className="footer-pill rounded-full px-5 py-2.5 text-xs font-medium text-muted-foreground transition-colors md:px-6 md:py-3 md:text-sm"
                  >
                    {item.label}
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-20 flex w-full flex-col items-center justify-between gap-4 px-6 pb-6 md:flex-row md:px-12 md:pb-8">
            <div className="order-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground md:order-1 md:text-xs">
              © {year} {name}. All rights reserved.
            </div>

            <div className="footer-pill order-1 flex cursor-default items-center gap-2 rounded-full px-6 py-2.5 md:order-2 md:py-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground md:text-xs">
                Hand-built by
              </span>
              <span className="ml-1 text-xs font-extrabold md:text-sm">{name}</span>
            </div>

            <MagneticButton
              as="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="footer-pill group order-3 flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground md:h-12 md:w-12"
            >
              <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}
