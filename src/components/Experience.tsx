"use client";

import React, { useState, useEffect, useRef } from "react";
import data from "@/data/profile.json";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Calendar, Sparkles, Server, Terminal, TrendingUp, Layers, MousePointer, HelpCircle } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string;
  technologies?: string[];
  bulletPoints?: string[];
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Subscribe to page scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map progress (0 -> 1) to active index (0 -> 3)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const totalItems = data.experience.length;
      if (totalItems === 0) return;
      const index = Math.max(0, Math.min(Math.floor(latest * totalItems), totalItems - 1));
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Background images matching the generated workspace assets
  const getBackgroundImage = (company: string) => {
    const c = company.toLowerCase();
    if (c.includes("arroz")) return "/images/experience/arroz_solutions_bg.png";
    if (c.includes("500")) return "/images/experience/five_hundred_trips_bg.png";
    if (c.includes("asset")) return "/images/experience/asset_cues_bg.png";
    if (c.includes("retail")) return "/images/experience/retail_scan_bg.png";
    return "";
  };

  const getCompanyInitials = (company: string) => {
    if (company.toLowerCase().includes("500")) return "5T";
    if (company.toLowerCase().includes("arroz")) return "AS";
    if (company.toLowerCase().includes("asset")) return "AC";
    if (company.toLowerCase().includes("retail")) return "RS";
    return company.substring(0, 2).toUpperCase();
  };

  const getRoleIcon = (role: string) => {
    const r = role.toLowerCase();
    if (r.includes("flutter") || r.includes("cross-platform")) return <Terminal className="w-4 h-4 text-luxuryGold" />;
    if (r.includes("intern")) return <Layers className="w-4 h-4 text-luxuryGold" />;
    if (r.includes("development") || r.includes("business")) return <TrendingUp className="w-4 h-4 text-luxuryGold" />;
    return <Server className="w-4 h-4 text-luxuryGold" />;
  };

  const getRoleThemeColor = (company: string) => {
    const c = company.toLowerCase();
    if (c.includes("arroz")) return "rgba(20, 184, 166, 0.4)"; // Teal
    if (c.includes("500")) return "rgba(99, 102, 241, 0.4)"; // Indigo
    if (c.includes("asset")) return "rgba(168, 85, 247, 0.4)"; // Purple
    if (c.includes("retail")) return "rgba(245, 158, 11, 0.4)"; // Amber
    return "rgba(197, 168, 128, 0.4)"; // Gold
  };

  const handleThumbnailClick = (index: number) => {
    if (typeof window !== "undefined" && containerRef.current) {
      const containerTop = containerRef.current.offsetTop;
      const scrollableHeight = containerRef.current.offsetHeight - window.innerHeight;
      const targetScrollY = containerTop + (index / (data.experience.length - 1)) * scrollableHeight;
      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      ref={containerRef} 
      id="experience" 
      className="relative h-[280vh] bg-background"
    >
      {/* Sticky Frame Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Gallery (Cross-fading slides) */}
        {data.experience.map((exp, index) => {
          const bg = getBackgroundImage(exp.company);
          return (
            <motion.div
              key={index}
              className="absolute inset-0 bg-cover bg-center pointer-events-none filter brightness-[0.35] contrast-[1.05]"
              style={{ 
                backgroundImage: bg ? `url(${bg})` : "none",
                zIndex: 0
              }}
              initial={{ opacity: index === 0 ? 1 : 0 }}
              animate={{ opacity: activeIndex === index ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          );
        })}

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(0,0,0,0)_20%,rgba(0,0,0,0.85)_100%] pointer-events-none z-5" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/35 pointer-events-none z-5" />

        {/* Content Section Overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12 z-10">
          <div className="max-w-5xl w-full relative">
            <AnimatePresence mode="wait">
              {data.experience.map((exp, index) => {
                if (activeIndex !== index) return null;
                const roleIcon = getRoleIcon(exp.role);
                const themeColor = getRoleThemeColor(exp.company);

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -40, scale: 0.97 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-2xl border border-white/10"
                    style={{
                      boxShadow: `0 0 40px ${themeColor.replace("0.4", "0.08")}`
                    }}
                  >
                    {/* Role Theme Ambient Glow Indicator */}
                    <div 
                      className="absolute -top-[100px] -right-[100px] w-[200px] h-[200px] rounded-full blur-[80px] pointer-events-none"
                      style={{ backgroundColor: themeColor }}
                    />

                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4 border-b border-white/5 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xs tracking-ultraWide text-luxuryGold uppercase font-mono flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-luxuryGold" />
                            / 01 — Career Track
                          </h2>
                          <span className="text-[10px] text-luxuryMuted font-mono px-2 py-0.5 bg-white/5 border border-white/5 rounded-full">
                            Role {index + 1} of 4
                          </span>
                        </div>
                        <h3 className="text-xl md:text-3xl font-light text-foreground tracking-wide mt-2">
                          {exp.role}
                        </h3>
                        <p className="text-sm md:text-base font-semibold text-luxuryGold tracking-wider uppercase mt-1 flex items-center gap-1.5">
                          {roleIcon}
                          {exp.company}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-luxuryMuted font-mono px-3.5 py-2 border border-white/5 bg-white/[0.02] rounded-full">
                        <Calendar className="w-3.5 h-3.5 text-luxuryGold/70" />
                        {exp.duration}
                      </div>
                    </div>

                    {/* Job Description */}
                    <p className="text-sm md:text-base text-luxuryMuted leading-relaxed font-light mb-4">
                      {exp.description}
                    </p>

                    {/* Details Bullet Points */}
                    {exp.bulletPoints && (
                      <ul className="space-y-2 mb-6 border-l border-white/5 pl-4 md:pl-6 max-h-[30vh] overflow-y-auto">
                        {exp.bulletPoints.map((bullet, idx) => (
                          <li
                            key={idx}
                            className="relative text-xs md:text-sm text-luxuryMuted/80 font-light hover:text-foreground transition-colors duration-300 leading-relaxed list-none before:content-[''] before:absolute before:-left-4 before:top-2 before:w-1.5 before:h-1.5 before:bg-luxuryGold/40 before:rounded-full"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech Badges */}
                    {exp.technologies && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] md:text-[10px] text-luxuryMuted font-mono px-2.5 py-1 border border-white/5 bg-white/[0.01] hover:border-luxuryGold/30 hover:text-white transition-all duration-300 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Interactive Dock (Framer style scroller navigation) */}
        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-30 p-3 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md shadow-2xl">
          <span className="text-[8px] font-mono text-luxuryMuted tracking-wider uppercase writing-vertical select-none mb-1">
            Timeline
          </span>
          <div className="flex flex-col gap-4">
            {data.experience.map((exp, index) => {
              const initials = getCompanyInitials(exp.company);
              const themeColor = getRoleThemeColor(exp.company);
              const isActive = activeIndex === index;

              return (
                <div 
                  key={index}
                  className="relative group"
                >
                  <button
                    onClick={() => handleThumbnailClick(index)}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono font-medium text-sm text-white border transition-all duration-500 cursor-pointer relative z-20 ${
                      isActive 
                        ? "bg-white/10 border-white/30 font-semibold" 
                        : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                    style={{
                      boxShadow: isActive ? `0 0 15px ${themeColor.replace("0.4", "0.2")}` : "none"
                    }}
                  >
                    {initials}
                  </button>

                  {/* Dynamic Selection Border Outline (Framer sliding selection block) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeDockOutline"
                      className="absolute -inset-1.5 border border-luxuryGold rounded-2xl pointer-events-none z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Dynamic Tooltip */}
                  <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-black border border-white/15 px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-xs text-white z-50">
                    <span className="font-mono text-[10px] text-luxuryGold mr-1">{exp.duration}</span>
                    {exp.company}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col items-center mt-1 select-none pointer-events-none text-luxuryMuted opacity-60">
            <MousePointer className="w-3.5 h-3.5 animate-bounce" />
            <span className="text-[7px] font-mono uppercase tracking-widest mt-1">Scroll</span>
          </div>
        </div>

      </div>
    </section>
  );
}


