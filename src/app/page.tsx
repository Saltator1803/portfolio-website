import Header from "@/components/Header";
import HeroScroll from "@/components/HeroScroll";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import ResumeBuilder from "@/components/ResumeBuilder";
import Globe from "@/components/Globe";

export default function Home() {
  return (
    <main className="relative w-full bg-background">
      <Header />
      <HeroScroll />
      <Experience />
      <Projects />
      <Education />
      <ResumeBuilder />
      <Globe />
    </main>
  );
}
