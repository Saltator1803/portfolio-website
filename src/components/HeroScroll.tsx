"use client";

import React from "react";
import CanvasScroller from "./CanvasScroller";
import data from "@/data/profile.json";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroScroll() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 0.4, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={containerRef} id="hero" className="relative h-[250vh] bg-background">
      {/* Sticky Canvas Frame Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <CanvasScroller
          directory="sequence-1"
          frameCount={76} // Adjusted based on actual frames in sequence 1 zip
          triggerId="hero"
        />

        {/* Cinematic Minimal Typography Overlay */}
        <motion.div 
          style={{ opacity, scale, y: textY }}
          className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 z-10 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none"
        >
          <div className="max-w-4xl space-y-6">
            <h1 className="text-4xl md:text-7xl font-light tracking-wide leading-tight text-foreground">
              Sensing <span className="text-luxuryGold italic">Opportunity</span>.<br />
              Structuring <span className="font-semibold text-foreground">Execution</span>.
            </h1>
            <p className="text-sm md:text-lg text-luxuryMuted tracking-wider font-light max-w-2xl leading-relaxed">
              {data.profile.title}. Focused on {data.profile.focus.toLowerCase()}
            </p>
            <div className="pt-4 flex items-center gap-4 text-xs tracking-superWide text-luxuryGold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-luxuryGold animate-ping" />
              0 → 1 Enterprise Builder
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
