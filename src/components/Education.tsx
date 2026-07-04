"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { GraduationCap, Sparkles, Calendar, BookOpen, School } from "lucide-react";

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Set up scroll listener across the 180vh section height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Custom triangle scatter positions for 3 cards:
  // Card 0 (MBA) goes top-left
  // Card 1 (MCA) goes top-right
  // Card 2 (B.Sc) goes bottom-center
  const scatterCoords = [
    { x: -350, y: -80, scale: 0.95, rotate: -5 },
    { x: 350, y: -80, scale: 0.95, rotate: 5 },
    { x: 0, y: 220, scale: 0.95, rotate: 2 }
  ];

  const educationData = [
    {
      degree: "MBA (Technology Management)",
      institution: "Institute of Product Leadership",
      duration: "Expected 2027",
      details: "Focus: Product Strategy, GTM Execution, & Tech MBA Core",
      color: "rgba(197, 168, 128, 0.15)", // luxury gold glow
      icon: <Sparkles className="w-5 h-5 text-luxuryGold" />
    },
    {
      degree: "MCA (Computer Application)",
      institution: "Trinity Academy of Engineering",
      duration: "2024",
      details: "Focus: Software Systems, Architectures, & Development Loops",
      color: "rgba(59, 130, 246, 0.1)", // blue glow
      icon: <GraduationCap className="w-5 h-5 text-blue-400" />
    },
    {
      degree: "B.Sc (Computer Science)",
      institution: "University of Mumbai",
      duration: "2022",
      details: "Focus: Core Computing Foundations, Systems, & Algorithms",
      color: "rgba(168, 85, 247, 0.1)", // purple glow
      icon: <BookOpen className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <section 
      ref={containerRef} 
      id="education" 
      className="relative h-[180vh] bg-background z-20 border-b border-luxuryBorder"
    >
      {/* Sticky Frame Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        
        {/* Section Header */}
        <div className="absolute top-24 left-8 md:left-16 flex flex-col gap-2 max-w-6xl w-full border-b border-luxuryBorder/30 pb-6 pointer-events-none">
          <h2 className="text-xs tracking-ultraWide text-luxuryGold uppercase font-mono flex items-center gap-2">
            <School className="w-3.5 h-3.5 text-luxuryGold" />
            / 03 — Academic Foundation
          </h2>
          <span className="text-3xl font-light text-foreground tracking-widest uppercase block">
            Education
          </span>
        </div>

        {/* Scroll Instructional Cue */}
        <div className="absolute bottom-12 text-center pointer-events-none z-10">
          <span className="text-[10px] uppercase font-mono tracking-superWide text-luxuryMuted animate-pulse">
            Scroll down to unpack academic timeline
          </span>
        </div>

        {/* 3D Scatter Container */}
        <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center overflow-visible">
          {educationData.map((edu, idx) => {
            const coord = scatterCoords[idx];

            // Map scroll progress to outward scattering translations
            const x = useTransform(scrollYProgress, [0.3, 0.75], [0, coord.x]);
            const y = useTransform(scrollYProgress, [0.3, 0.75], [0, coord.y]);
            const scale = useTransform(scrollYProgress, [0.3, 0.75], [1.05, coord.scale]);
            const rotate = useTransform(scrollYProgress, [0.3, 0.75], [0, coord.rotate]);
            
            // Subtle blur filter transition on scroll
            const blur = useTransform(scrollYProgress, [0.3, 0.75], ["blur(0px)", "blur(0px)"]);

            return (
              <motion.div
                key={idx}
                style={{
                  position: "absolute",
                  x,
                  y,
                  scale,
                  rotate,
                  filter: blur,
                  width: "100%",
                  maxWidth: "340px",
                  zIndex: 3 - idx
                }}
                className="group"
              >
                <div 
                  className="glass-panel p-6 rounded-2xl border border-luxuryBorder hover:border-luxuryGold transition-colors duration-500 shadow-2xl relative overflow-hidden"
                  style={{
                    boxShadow: `0 10px 40px -10px rgba(0, 0, 0, 0.5), 0 0 40px ${edu.color}`
                  }}
                >
                  {/* Decorative Background Elements */}
                  <div className="absolute -top-[100px] -right-[100px] w-[180px] h-[180px] rounded-full blur-[60px] opacity-40 pointer-events-none transition-transform duration-700 group-hover:scale-110" style={{ backgroundColor: edu.color.replace("0.1", "0.2") }} />

                  <div className="flex justify-between items-start gap-4 mb-4 border-b border-luxuryBorder/20 pb-4">
                    <div className="w-10 h-10 rounded-xl glass-panel border border-luxuryBorder flex items-center justify-center shadow-lg">
                      {edu.icon}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-luxuryMuted font-mono px-2.5 py-1 border border-luxuryBorder bg-white/[0.01] rounded-full">
                      <Calendar className="w-3 h-3 text-luxuryGold/70" />
                      {edu.duration}
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-light text-foreground tracking-wide leading-snug group-hover:text-luxuryGold transition-colors duration-300">
                    {edu.degree}
                  </h3>
                  <p className="text-xs font-semibold text-luxuryMuted uppercase tracking-wider mt-1.5">
                    {edu.institution}
                  </p>
                  
                  <p className="text-xs text-luxuryMuted/80 font-light mt-4 leading-relaxed border-t border-luxuryBorder/10 pt-3">
                    {edu.details}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
