import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import GitHubContributions from "@/components/Githubcontributions";
import { Footer } from "@/components/Footer";
import FloatingDockDemo from "@/components/floating-dock-demo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-12">
      <main>
        <HeroSection />
        <ProjectsSection />
        <GitHubContributions />
      </main>
      <FloatingDockDemo />
      <Footer />
    </div>
  );
};

export default Index;