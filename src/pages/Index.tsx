import { HeroSection } from "@/components/HeroSection";
import { EducationSection } from "@/components/EducationSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import GitHubContributions from "@/components/Githubcontributions";
import { Footer } from "@/components/Footer";
import FloatingDockDemo from "@/components/floating-dock-demo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-12">
      <main>
        <HeroSection />
        <EducationSection />
        <ProjectsSection />
        <GitHubContributions />
      </main>
      <FloatingDockDemo />
      <Footer />
    </div>
  );
};

export default Index;