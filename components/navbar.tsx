"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/components/client-provider";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-border bg-background/95 py-3.5 shadow-sm"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a
          href="#home"
          data-magnetic
          className="group flex items-center gap-1.5 font-mono text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          <span className="text-primary font-bold">&lt;</span>
          <span>ArgiMaulana</span>
          <span className="text-muted-foreground group-hover:text-primary transition-colors">.dev /&gt;</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-border bg-card/80 px-4 py-1.5">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                data-magnetic
                className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors rounded-full ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            data-magnetic
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="#contact"
            data-magnetic
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-6 py-6 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-medium text-foreground transition-colors hover:text-primary border-b border-border/50"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-xs font-semibold text-primary-foreground"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
