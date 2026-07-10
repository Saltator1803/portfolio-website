"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import data from "@/data/profile.json";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";

interface ProjectItem {
  title: string;
  tagline: string;
  duration: string;
  description: string;
  bulletPoints?: string[];
  link?: string;
  isIndependent?: boolean;
  context?: string;
  problem?: string;
  process?: string;
  solutionTradeoffs?: string;
  expectedOutcome?: string;
  whatToTestNext?: string;
}

export default function Projects() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  
  // Carousel rendering settings
  const originalItems = useMemo(() => {
    return [
      { src: "/images/projects/karigold_mockup.png", index: 0 },
      { src: "/images/projects/nexus_mockup.png", index: 1 },
      { src: "/images/projects/parkhive_mockup.png", index: 2 },
      { src: "/images/projects/myfitpal_mockup.png", index: 3 },
      { src: "/images/projects/anthill_mockup.png", index: 4 },
      { src: "/images/projects/solargrid_mockup.png", index: 5 },
      { src: "/images/projects/notion_mockup.png", index: 6 },
      { src: "/images/projects/starbucks_mockup.png", index: 7 },
      { src: "/images/projects/blinkit_mockup.png", index: 8 }
    ];
  }, []);

  // Build a looped list of items to ensure seamless circular wrapping (at least 12 items)
  const renderItems = useMemo(() => {
    const items = [];
    while (items.length < 12) {
      items.push(...originalItems);
    }
    return items;
  }, [originalItems]);

  const totalItems = renderItems.length;
  const scrollTarget = useRef(0);
  const rawScroll = useMotionValue(0);
  const snapTimeout = useRef<NodeJS.Timeout | null>(null);

  // Smooth scroll spring interpolation
  const smoothScroll = useSpring(rawScroll, {
    stiffness: 180,
    damping: 35,
    mass: 1,
    restDelta: 0.001
  });

  // Responsive dimensions state
  const [dimensions, setDimensions] = useState({
    itemWidth: 500,
    itemHeight: 285,
    sideItemWidth: 320,
    sideItemHeight: 280,
    gap: 64,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDimensions({
          itemWidth: 290,
          itemHeight: 180,
          sideItemWidth: 200,
          sideItemHeight: 160,
          gap: 16,
        });
      } else {
        setDimensions({
          itemWidth: 540,
          itemHeight: 310,
          sideItemWidth: 350,
          sideItemHeight: 290,
          gap: 48,
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync scroll offset back to active project state (indices loop back to 0-8)
  useEffect(() => {
    const unsubscribe = smoothScroll.on("change", (v) => {
      const originalCount = originalItems.length;
      const rawIndex = Math.round(v);
      const normalizedIndex = ((rawIndex % originalCount) + originalCount) % originalCount;
      setActiveProjectIndex(normalizedIndex);
    });
    return () => unsubscribe();
  }, [smoothScroll, originalItems.length]);

  // Gestures mapping (attached to container viewport)
  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY * 0.8;
    scrollTarget.current += delta * 0.003;
    rawScroll.set(scrollTarget.current);

    if (snapTimeout.current) clearTimeout(snapTimeout.current);
    snapTimeout.current = setTimeout(() => {
      scrollTarget.current = Math.round(scrollTarget.current);
      rawScroll.set(scrollTarget.current);
    }, 150);
  };

  const handlePan = (e: any, info: any) => {
    const delta = -info.delta.x * 0.004;
    scrollTarget.current += delta;
    rawScroll.set(scrollTarget.current);
    if (snapTimeout.current) clearTimeout(snapTimeout.current);
  };

  const handlePanEnd = (e: any, info: any) => {
    scrollTarget.current += -info.velocity.x * 0.0012;
    scrollTarget.current = Math.round(scrollTarget.current);
    rawScroll.set(scrollTarget.current);
  };

  const handleNext = () => {
    scrollTarget.current = Math.round(scrollTarget.current) + 1;
    rawScroll.set(scrollTarget.current);
  };

  const handlePrev = () => {
    scrollTarget.current = Math.round(scrollTarget.current) - 1;
    rawScroll.set(scrollTarget.current);
  };

  return (
    <section id="projects" className="relative py-32 bg-background overflow-hidden z-20 flex flex-col items-center border-b border-luxuryBorder">
      <div className="max-w-6xl w-full px-8 md:px-16 mb-16 flex flex-col md:flex-row justify-between items-baseline gap-4 border-b border-luxuryBorder pb-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-xs tracking-ultraWide text-luxuryGold uppercase font-mono flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-luxuryGold" />
            / 02 — Digital Engineering
          </h2>
          <span className="text-3xl font-light text-foreground tracking-widest uppercase block">
            Featured Projects
          </span>
        </div>
        <a
          href="#strategy-vault"
          className="text-xs tracking-widest text-luxuryGold font-semibold hover:underline flex items-center gap-2 cursor-pointer font-mono mt-2 md:mt-0"
        >
          VIEW STRATEGY VAULT (8 CASE STUDIES) →
        </a>
      </div>

      {/* 3D 🏆 ULTRA-PREMIUM CAROUSEL */}
      <motion.div 
        onWheel={handleWheel}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing touch-action-none"
      >
        {/* Left & Right Edge Blur Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-[15%] md:w-[25%] backdrop-blur-[4px] pointer-events-none z-20 [mask-image:linear-gradient(to_right,black_0%,transparent_100%)] [WebkitMaskImage:linear-gradient(to_right,black_0%,transparent_100%)]" />
        <div className="absolute right-0 top-0 bottom-0 w-[15%] md:w-[25%] backdrop-blur-[4px] pointer-events-none z-20 [mask-image:linear-gradient(to_left,black_0%,transparent_100%)] [WebkitMaskImage:linear-gradient(to_left,black_0%,transparent_100%)]" />

        {/* 3D Viewport Root */}
        <div 
          className="relative w-0 h-0 flex items-center justify-center"
          style={{ 
            perspective: 500,
            transformStyle: "preserve-3d"
          }}
        >
          {renderItems.map((item, i) => (
            <PremiumSmearCard
              key={`card-${i}`}
              src={item.src}
              title={data.projects[item.index].title}
              index={i}
              originalIndex={item.index}
              total={totalItems}
              smoothScroll={smoothScroll}
              itemWidth={dimensions.itemWidth}
              itemHeight={dimensions.itemHeight}
              sideItemWidth={dimensions.sideItemWidth}
              sideItemHeight={dimensions.sideItemHeight}
              gap={dimensions.gap}
              borderRadius={20}
              onCardClick={(projIdx) => setSelectedProject(data.projects[projIdx])}
              onCenterCard={(cardIdx) => {
                scrollTarget.current = cardIdx;
                rawScroll.set(scrollTarget.current);
              }}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-panel border border-luxuryBorder hover:border-luxuryGold flex items-center justify-center z-40 cursor-pointer text-luxuryGold transition-all duration-300 shadow-[0_0_15px_rgba(197,168,128,0.05)]"
          aria-label="Previous Project"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-panel border border-luxuryBorder hover:border-luxuryGold flex items-center justify-center z-40 cursor-pointer text-luxuryGold transition-all duration-300 shadow-[0_0_15px_rgba(197,168,128,0.05)]"
          aria-label="Next Project"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Instructions cue */}
      <div className="text-center pointer-events-none mt-2">
        <span className="text-[10px] uppercase font-mono tracking-superWide text-luxuryMuted">
          Click active centered slide to inspect specifications
        </span>
      </div>

      {/* Project Details Modal Popout */}
      <AnimatePresence>
        {selectedProject && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md cursor-default"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel p-6 md:p-10 rounded-3xl border border-luxuryBorder/50 shadow-2xl flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full glass-panel border border-luxuryBorder hover:border-luxuryGold flex items-center justify-center text-luxuryGold hover:text-foreground transition-all duration-300 cursor-pointer z-50"
                aria-label="Close Details"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header details */}
              <div className="flex flex-col gap-1 border-b border-luxuryBorder/20 pb-5 pr-10">
                {selectedProject.isIndependent && (
                  <div className="mb-2 self-start text-[10px] text-luxuryGold font-mono tracking-widest uppercase px-3 py-1 bg-luxuryGold/5 border border-luxuryGold/20 rounded-md">
                    Independent teardown / coursework case study — not client work
                  </div>
                )}
                <span className="text-xs text-luxuryGold font-mono uppercase tracking-widest">
                  {selectedProject.tagline.split(" | ")[0]}
                </span>
                <h3 className="text-2xl md:text-3xl font-light text-foreground tracking-wide mt-1">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-luxuryMuted tracking-wider font-medium uppercase mt-1">
                  {selectedProject.tagline.split(" | ").slice(1).join(" | ")}
                </p>
                {selectedProject.duration && (
                  <div className="flex items-center gap-1.5 text-xs text-luxuryMuted font-mono mt-3">
                    <Calendar className="w-3.5 h-3.5 text-luxuryGold/70" />
                    {selectedProject.duration}
                  </div>
                )}
              </div>

              {/* Mockup Preview image in modal */}
              <div 
                className="w-full h-[180px] md:h-[260px] rounded-2xl border border-luxuryBorder/30 bg-cover bg-center shadow-lg relative overflow-hidden"
                style={{ 
                  backgroundImage: `url(${
                    selectedProject.title === "Karigold" ? "/images/projects/karigold_mockup.png" :
                    selectedProject.title === "Nexus" ? "/images/projects/nexus_mockup.png" :
                    selectedProject.title === "Parkhive" ? "/images/projects/parkhive_mockup.png" :
                    selectedProject.title === "My Fitness Pal" ? "/images/projects/myfitpal_mockup.png" :
                    selectedProject.title === "Anthill" ? "/images/projects/anthill_mockup.png" :
                    selectedProject.title === "Solar Grid" ? "/images/projects/solargrid_mockup.png" :
                    selectedProject.title.includes("Notion") ? "/images/projects/notion_mockup.png" :
                    selectedProject.title.includes("Starbucks") ? "/images/projects/starbucks_mockup.png" :
                    "/images/projects/blinkit_mockup.png"
                  })` 
                }}
              />

              {/* Specifications Descriptions */}
              <div className="space-y-6">
                <p className="text-sm md:text-base text-luxuryMuted leading-relaxed font-light">
                  {selectedProject.description}
                </p>

                {/* Structured Case Study Grid */}
                {(selectedProject.context || selectedProject.problem || selectedProject.process || selectedProject.solutionTradeoffs) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-luxuryBorder/10 pt-6">
                    {selectedProject.context && (
                      <div className="space-y-1">
                        <h4 className="text-xs font-semibold tracking-wider text-luxuryGold uppercase font-mono">
                          Context
                        </h4>
                        <p className="text-xs md:text-sm text-luxuryMuted/80 font-light leading-relaxed">
                          {selectedProject.context}
                        </p>
                      </div>
                    )}

                    {selectedProject.problem && (
                      <div className="space-y-1">
                        <h4 className="text-xs font-semibold tracking-wider text-luxuryGold uppercase font-mono">
                          The Friction / Gap
                        </h4>
                        <p className="text-xs md:text-sm text-luxuryMuted/80 font-light leading-relaxed">
                          {selectedProject.problem}
                        </p>
                      </div>
                    )}

                    {selectedProject.process && (
                      <div className="space-y-1">
                        <h4 className="text-xs font-semibold tracking-wider text-luxuryGold uppercase font-mono">
                          Process & Research
                        </h4>
                        <p className="text-xs md:text-sm text-luxuryMuted/80 font-light leading-relaxed">
                          {selectedProject.process}
                        </p>
                      </div>
                    )}

                    {selectedProject.solutionTradeoffs && (
                      <div className="space-y-1">
                        <h4 className="text-xs font-semibold tracking-wider text-luxuryGold uppercase font-mono">
                          Solution & Tradeoffs
                        </h4>
                        <p className="text-xs md:text-sm text-luxuryMuted/80 font-light leading-relaxed">
                          {selectedProject.solutionTradeoffs}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Expected Outcome & Next Steps (Full Width Rows) */}
                {(selectedProject.expectedOutcome || selectedProject.whatToTestNext) && (
                  <div className="space-y-4 border-t border-luxuryBorder/10 pt-4">
                    {selectedProject.expectedOutcome && (
                      <div className="space-y-1">
                        <h4 className="text-xs font-semibold tracking-wider text-teal-400 uppercase font-mono flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400/80 animate-pulse" />
                          Expected Outcome
                        </h4>
                        <p className="text-xs md:text-sm text-luxuryMuted/80 font-light leading-relaxed">
                          {selectedProject.expectedOutcome}
                        </p>
                      </div>
                    )}

                    {selectedProject.whatToTestNext && (
                      <div className="space-y-1">
                        <h4 className="text-xs font-semibold tracking-wider text-luxuryGold uppercase font-mono flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-luxuryGold/80 animate-pulse" />
                          What I'd Test Next
                        </h4>
                        <p className="text-xs md:text-sm text-luxuryMuted/80 font-light leading-relaxed">
                          {selectedProject.whatToTestNext}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Legacy bulletPoints fallback (if structured content is not defined) */}
                {!selectedProject.context && selectedProject.bulletPoints && (
                  <ul className="space-y-3 border-l border-luxuryBorder/30 pl-4 md:pl-6">
                    {selectedProject.bulletPoints.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="relative text-xs md:text-sm text-luxuryMuted/80 font-light hover:text-foreground transition-colors duration-300 leading-relaxed list-none before:content-[''] before:absolute before:-left-4 before:top-2 before:w-1.5 before:h-1.5 before:bg-luxuryGold/40 before:rounded-full"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Live Project launch actions */}
              <div className="flex items-center justify-between border-t border-luxuryBorder/10 pt-6 mt-2">
                {selectedProject.link && selectedProject.link !== "#" ? (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-widest text-luxuryGold font-semibold hover:underline flex items-center gap-2 cursor-pointer"
                  >
                    {selectedProject.link.includes("case-study.html") 
                      ? "READ STRATEGY CASE STUDY" 
                      : "LAUNCH LIVE PROJECT"}
                    <ArrowRight className="w-4 h-4 text-luxuryGold" />
                  </a>
                ) : (
                  <span className="text-xs text-luxuryMuted font-mono tracking-wider">
                    STRATEGY CASE STUDY
                  </span>
                )}
                
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-xs tracking-widest text-foreground hover:text-luxuryGold transition-colors duration-300 font-semibold uppercase cursor-pointer"
                >
                  CLOSE DETAILS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// 🏆 Premium 3D Smear Card Helper Component
interface PremiumCardProps {
  src: string;
  title: string;
  index: number;
  originalIndex: number;
  total: number;
  smoothScroll: any;
  itemWidth: number;
  itemHeight: number;
  sideItemWidth: number;
  sideItemHeight: number;
  gap: number;
  borderRadius: number;
  onCardClick: (index: number) => void;
  onCenterCard: (index: number) => void;
}

function PremiumSmearCard({
  src,
  title,
  index,
  originalIndex,
  total,
  smoothScroll,
  itemWidth,
  itemHeight,
  sideItemWidth,
  sideItemHeight,
  gap,
  borderRadius,
  onCardClick,
  onCenterCard
}: PremiumCardProps) {
  // Translate scroll offset relative to card position
  const localOffset = useTransform(smoothScroll, (v: number) => {
    let linearBase = index - v;
    let mapped = ((linearBase % total) + total) % total;
    if (mapped > total / 2) mapped -= total;
    return mapped;
  });

  const absOffset = useTransform(localOffset, Math.abs);

  // Dynamic width/height scaling depending on distance to center
  const cardWidth = useTransform(absOffset, [0, 1], [itemWidth, sideItemWidth], { clamp: true });
  const cardHeight = useTransform(absOffset, [0, 1], [itemHeight, sideItemHeight], { clamp: true });

  const marginLeft = useTransform(cardWidth, (w) => -w / 2);
  const marginTop = useTransform(cardHeight, (h) => -h / 2);

  // 3D positioning along curved path
  const x = useTransform(localOffset, (o) => {
    const a = Math.abs(o);
    const s = Math.sign(o);
    const centerToNext = itemWidth / 2 + gap + sideItemWidth / 2;
    const sideToSide = sideItemWidth + gap;

    if (a === 0) return 0;
    if (a <= 1) {
      return s * centerToNext * a;
    } else {
      return s * (centerToNext + (a - 1) * sideToSide * 0.85);
    }
  });

  const z = useTransform(absOffset, (a) => -a * 150);

  // Curved rotation angles
  const rotateY = useTransform(localOffset, (o) => {
    return Math.sign(o) * Math.min(Math.abs(o) * 35, 60);
  });

  // Layer ordering based on center offset
  const zIndex = useTransform(absOffset, (a) => 1000 - Math.round(a * 10));

  // Fade out cards at outer edges
  const visibilityOpacity = useTransform(absOffset, [0, 2.5, 4], [1, 1, 0]);

  // Click handler check (if centered -> open details, otherwise -> scroll center)
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const offsetVal = Math.abs(localOffset.get());
    if (offsetVal < 0.2) {
      onCardClick(originalIndex);
    } else {
      onCenterCard(index);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        marginLeft,
        marginTop,
        width: cardWidth,
        height: cardHeight,
        rotateY,
        x,
        z,
        zIndex,
        transformStyle: "preserve-3d",
        cursor: "pointer"
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius,
          opacity: visibilityOpacity,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}
      />

      {/* Project Name Below Slide */}
      <motion.div
        style={{
          position: "absolute",
          bottom: -45,
          left: -40,
          right: -40,
          textAlign: "center",
          opacity: visibilityOpacity,
        }}
        className="text-xs md:text-sm font-semibold tracking-superWide text-foreground uppercase select-none pointer-events-none drop-shadow-lg"
      >
        {title}
      </motion.div>
    </motion.div>
  );
}
