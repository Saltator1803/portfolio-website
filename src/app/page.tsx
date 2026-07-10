import Header from "@/components/Header";
import HeroScroll from "@/components/HeroScroll";
import Experience from "@/components/Experience";
import Frameworks from "@/components/Frameworks";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import StrategyVault from "@/components/StrategyVault";
import Education from "@/components/Education";
import ResumeBuilder from "@/components/ResumeBuilder";
import Globe from "@/components/Globe";

export default function Home() {
  return (
    <main className="relative w-full bg-background">
      <Header />
      <HeroScroll />
      <Experience />
      <Frameworks />
      <Skills />
      <Projects />
      <StrategyVault />
      <Education />
      <ResumeBuilder />
      <Globe />
    </main>
  );
}
