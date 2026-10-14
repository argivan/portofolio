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

      {/* Curtain wrapper: opaque, rounded-b-3xl, relative z-10, border-b border-border */}
      <div className="relative z-10 bg-background rounded-b-3xl border-b border-border shadow-2xl">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactForm />
      </div>

      {/* Cinematic Footer with curtain-reveal scroll scrub */}
      <CinematicFooter
        name="Argi Maulana"
        email="hello@argimaulana.my.id"
        github="https://github.com"
        linkedin="https://linkedin.com"
      />
    </main>
  );
}
