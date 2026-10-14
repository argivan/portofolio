import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { ContactForm } from "@/components/contact-form";
import { CinematicFooter } from "@/components/ui/motion-footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Screen 1: Hero Section (Sticky underneath, scales & dims as Screen 2 curtains over it) */}
      <HeroSection />

      {/* Screen 2 & Content Curtain: Slides UP and OVER Screen 1 with rounded-t-3xl and deep shadow */}
      <div className="relative z-10 bg-background rounded-t-3xl border-t border-border shadow-[0_-25px_60px_-15px_rgba(0,0,0,0.3)] rounded-b-3xl border-b overflow-hidden">
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactForm />
      </div>

      {/* Screen 3: Cinematic Footer (Curtain-reveal scroll scrub underneath) */}
      <CinematicFooter
        name="Argi Maulana"
        email="hello@argimaulana.my.id"
        github="https://github.com"
        linkedin="https://linkedin.com"
      />
    </main>
  );
}
