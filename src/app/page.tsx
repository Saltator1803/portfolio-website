import Header from "@/components/Header";
import HeroScroll from "@/components/HeroScroll";
import Frameworks from "@/components/Frameworks";
import Projects from "@/components/Projects";
import StrategyVault from "@/components/StrategyVault";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import ResumeBuilder from "@/components/ResumeBuilder";
import Globe from "@/components/Globe";

export default function Home() {
  return (
    <main className="relative w-full bg-background">
      <Header />
      <HeroScroll />
      <Frameworks />
      <Projects />
      <StrategyVault />
      <Experience />
      <Skills />
      <Education />
      <ResumeBuilder />
      <Globe />
    </main>
  );
}
