"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// ============================================================================
// HIGH-QUALITY GRADIENT VECTOR ILLUSTRATIONS (NO EMOJIS)
// ============================================================================

// 01 — Discovery: Magnifying glass over user profiles
const DiscoveryIllustration = () => (
  <svg viewBox="0 0 64 64" className="w-14 h-14 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
    <defs>
      <linearGradient id="disc-grad-final" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="26" fill="url(#disc-grad-final)" fillOpacity="0.08" stroke="url(#disc-grad-final)" strokeWidth="1" strokeDasharray="3 3" />
    {/* User Profile shapes */}
    <path d="M18 42c0-3 3-5 6-5s6 2 6 5" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="24" cy="29" r="3.5" stroke="#8b5cf6" strokeWidth="2" fill="none" />
    {/* Magnifying Glass */}
    <circle cx="38" cy="32" r="7.5" stroke="#3b82f6" strokeWidth="2.2" fill="#030303" />
    <line x1="43.5" y1="37.5" x2="50" y2="44" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 02 — Research: Documents + market analytics chart
const ResearchIllustration = () => (
  <svg viewBox="0 0 64 64" className="w-14 h-14 transition-transform duration-500 group-hover:scale-110">
    <defs>
      <linearGradient id="res-grad-final" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="26" fill="url(#res-grad-final)" fillOpacity="0.08" stroke="url(#res-grad-final)" strokeWidth="1" strokeDasharray="3 3" />
    {/* Document page */}
    <rect x="18" y="16" width="18" height="24" rx="2" stroke="#06b6d4" strokeWidth="2" fill="none" />
    <line x1="22" y1="22" x2="28" y2="22" stroke="#06b6d4" strokeWidth="1.5" />
    <line x1="22" y1="28" x2="32" y2="28" stroke="#06b6d4" strokeWidth="1.5" />
    {/* Market Chart */}
    <path d="M26 40l8-10 8 5 10-14" stroke="#3b82f6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="52" cy="21" r="2.5" fill="#3b82f6" />
  </svg>
);

// 03 — Synthesis: Interlocking puzzle pieces
const SynthesisIllustration = () => (
  <svg viewBox="0 0 64 64" className="w-14 h-14 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
    <defs>
      <linearGradient id="synth-grad-final" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#f43f5e" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="26" fill="url(#synth-grad-final)" fillOpacity="0.08" stroke="url(#synth-grad-final)" strokeWidth="1" strokeDasharray="3 3" />
    {/* Interlocking Puzzle Shapes */}
    <path d="M20 25h7a2 2 0 0 1 2 2v1a2 2 0 0 0 4 0v-1a2 2 0 0 1 2-2h7v9h-9" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M20 35h7a2 2 0 0 1 2 2v1a2 2 0 0 0 4 0v-1a2 2 0 0 1 2-2h7v9H20v-9z" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

// 04 — Hypothesis: Lightbulb connected to flowchart nodes
const HypothesisIllustration = () => (
  <svg viewBox="0 0 64 64" className="w-14 h-14 transition-transform duration-500 group-hover:scale-110">
    <defs>
      <linearGradient id="hypo-grad-final" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="26" fill="url(#hypo-grad-final)" fillOpacity="0.08" stroke="url(#hypo-grad-final)" strokeWidth="1" strokeDasharray="3 3" />
    {/* Lightbulb outline */}
    <path d="M32 17c-6 0-11 5-11 11 0 3.5 2 6.5 5 8.5V41h12v-4.5c3-2 5-5 5-8.5 0-6-5-11-11-11z" stroke="#eab308" strokeWidth="2" fill="none" strokeLinecap="round" />
    <line x1="28" y1="44" x2="36" y2="44" stroke="#eab308" strokeWidth="1.8" />
    {/* Nodes */}
    <circle cx="16" cy="28" r="2" fill="#f97316" />
    <line x1="18" y1="28" x2="21" y2="28" stroke="#f97316" strokeWidth="1.2" />
    <circle cx="48" cy="28" r="2" fill="#f97316" />
    <line x1="43" y1="28" x2="46" y2="28" stroke="#f97316" strokeWidth="1.2" />
  </svg>
);

// 05 — Experimentation: Chemistry flask with UI grid overlay
const ExperimentationIllustration = () => (
  <svg viewBox="0 0 64 64" className="w-14 h-14 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
    <defs>
      <linearGradient id="exp-grad-final" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="26" fill="url(#exp-grad-final)" fillOpacity="0.08" stroke="url(#exp-grad-final)" strokeWidth="1" strokeDasharray="3 3" />
    {/* Laboratory Beaker Flask */}
    <path d="M26 18h12M29 18v7L18 44h28L35 25v-7" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M22 38c3-1 6-1 9 0s6 1 9 0" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <circle cx="30" cy="31" r="1.5" fill="#6366f1" />
    <circle cx="34" cy="35" r="2" fill="#6366f1" />
  </svg>
);

// 06 — Validation: Shield, checkmark, and performance gauge metrics
const ValidationIllustration = () => (
  <svg viewBox="0 0 64 64" className="w-14 h-14 transition-transform duration-500 group-hover:scale-110">
    <defs>
      <linearGradient id="val-grad-final" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="26" fill="url(#val-grad-final)" fillOpacity="0.08" stroke="url(#val-grad-final)" strokeWidth="1" strokeDasharray="3 3" />
    {/* Shield Gauge */}
    <path d="M32 18c6 0 12-2 12-2s2 8-1 15c-3 7-11 11-11 11s-8-4-11-11c-3-7-1-15-1-15s6 2 12 2z" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* Checkmark inside */}
    <path d="M26 31l4 4 8-8" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

// 07 — Execution: Rocket ship taking off
const ExecutionIllustration = () => (
  <svg viewBox="0 0 64 64" className="w-14 h-14 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
    <defs>
      <linearGradient id="exec-grad-final" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#e11d48" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="26" fill="url(#exec-grad-final)" fillOpacity="0.08" stroke="url(#exec-grad-final)" strokeWidth="1" strokeDasharray="3 3" />
    {/* Rocket Body */}
    <path d="M37 21l-5-5-5 5v12l5 5 5-5V21z" stroke="#f43f5e" strokeWidth="2" fill="none" />
    <path d="M27 30l-5 3v5l5-2v-6zM37 30l5 3v5l-5-2v-6z" stroke="#e11d48" strokeWidth="1.5" fill="none" />
    {/* Rocket exhaust trail */}
    <line x1="32" y1="39" x2="32" y2="45" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 08 — Iteration: Circular sync reload loop arrows enclosing a core node
const IterationIllustration = () => (
  <svg viewBox="0 0 64 64" className="w-14 h-14 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45">
    <defs>
      <linearGradient id="iter-grad-final" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="26" fill="url(#iter-grad-final)" fillOpacity="0.08" stroke="url(#iter-grad-final)" strokeWidth="1" strokeDasharray="3 3" />
    {/* Core node */}
    <circle cx="32" cy="32" r="5" stroke="#f59e0b" strokeWidth="2" fill="none" />
    {/* Circular arrows */}
    <path d="M20 28A13 13 0 0 1 41 19" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M44 36a13 13 0 0 1-21 9" stroke="#d97706" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M37 19h4v-4M27 45h-4v4" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

// ============================================================================
// COMPONENT MAIN
// ============================================================================

export default function Frameworks() {
  const stages = [
    {
      id: "01",
      topic: "Discovery",
      illustration: <DiscoveryIllustration />,
      tagline: "Understand before solving.",
      description: "I identify business goals, user pain points, constraints, and desired outcomes before thinking about solutions."
    },
    {
      id: "02",
      topic: "Research",
      illustration: <ResearchIllustration />,
      tagline: "Collect evidence.",
      description: "I study customers, competitors, industry trends, and data to build a complete understanding of the problem."
    },
    {
      id: "03",
      topic: "Synthesis",
      illustration: <SynthesisIllustration />,
      tagline: "Connect the dots.",
      description: "I combine research into clear insights, identify patterns, and define the real problem worth solving."
    },
    {
      id: "04",
      topic: "Hypothesis",
      illustration: <HypothesisIllustration />,
      tagline: "Think strategically.",
      description: "I convert insights into measurable hypotheses before committing resources."
    },
    {
      id: "05",
      topic: "Experimentation",
      illustration: <ExperimentationIllustration />,
      tagline: "Learn fast.",
      description: "I create MVPs, prototypes, and rapid experiments to validate assumptions with minimum effort."
    },
    {
      id: "06",
      topic: "Validation",
      illustration: <ValidationIllustration />,
      tagline: "Measure impact.",
      description: "I validate ideas using customer feedback, product metrics, and business outcomes."
    },
    {
      id: "07",
      topic: "Execution",
      illustration: <ExecutionIllustration />,
      tagline: "Build with purpose.",
      description: "I prioritize, collaborate with teams, and execute solutions that create measurable value."
    },
    {
      id: "08",
      topic: "Iteration",
      illustration: <IterationIllustration />,
      tagline: "Improve continuously.",
      description: "I monitor performance, collect feedback, and continuously optimize the product."
    }
  ];

  // Helper helper to offset popup cards and prevent screen boundary clipping
  const getTooltipPositionClasses = (index: number) => {
    if (index === 0) return "left-0 translate-x-0";
    if (index === 7) return "right-0 translate-x-0";
    return "left-1/2 -translate-x-1/2";
  };

  const getArrowPositionClasses = (index: number) => {
    if (index === 0) return "left-8";
    if (index === 7) return "right-8";
    return "left-1/2 -translate-x-1/2";
  };

  return (
    <section id="frameworks" className="relative py-24 bg-background border-b border-luxuryBorder z-20 flex flex-col items-center overflow-hidden">
      
      {/* Decorative luxury radial background glows */}
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] rounded-full bg-blue-600/5 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] rounded-full bg-violet-600/5 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto px-8 md:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-baseline gap-4 border-b border-luxuryBorder pb-8">
          <h2 className="text-xs tracking-ultraWide text-luxuryGold uppercase font-mono flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-luxuryGold" />
            / 02.5 — Strategic Playbooks
          </h2>
          <span className="text-3xl font-light text-foreground tracking-widest uppercase block">
            How I Think
          </span>
        </div>

        {/* Timeline Row Container */}
        <div className="relative w-full py-10">
          
          {/* Connecting Horizontal Line (Animates on load) */}
          <div className="absolute top-[83px] left-[60px] right-[60px] h-[1.5px] bg-white/10 z-0 min-w-[960px] lg:min-w-0 pointer-events-none">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 shadow-[0_0_8px_#6366f1]"
            />
          </div>

          {/* Horizontal Flex Track (snap-scrolling on mobile/tablet, full-width on desktop) */}
          <div className="flex items-center justify-start lg:justify-between overflow-x-auto lg:overflow-x-visible w-full gap-10 lg:gap-0 scrollbar-none snap-x snap-mandatory px-4 lg:px-0 relative z-10">
            
            {stages.map((stage, index) => {
              const tooltipPos = getTooltipPositionClasses(index);
              const arrowPos = getArrowPositionClasses(index);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="group relative flex flex-col items-center flex-shrink-0 w-32 snap-center cursor-pointer select-none"
                >
                  
                  {/* Expanded Playbook Tooltip Card (Slides up and fades in on hover) */}
                  <div className={`absolute bottom-[132px] w-[260px] z-30 opacity-0 translate-y-3 pointer-events-none scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 ease-out bg-[#050505]/95 border border-indigo-500/25 rounded-2xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_30px_rgba(99,102,241,0.12)] backdrop-blur-md ${tooltipPos}`}>
                    {/* Header */}
                    <div className="flex justify-between items-baseline border-b border-white/5 pb-1.5 mb-2">
                      <span className="text-[10px] font-mono font-semibold tracking-widest text-indigo-400 uppercase">
                        {stage.topic}
                      </span>
                      <span className="text-[10px] font-mono text-luxuryMuted/60">
                        {stage.id}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <span className="text-[11.5px] font-medium leading-snug text-white font-mono">
                        {stage.tagline}
                      </span>
                      <p className="text-[10px] font-light leading-relaxed text-luxuryMuted">
                        {stage.description}
                      </p>
                    </div>
                    {/* Pointing Arrow */}
                    <div className={`absolute top-full w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-black/95 z-20 ${arrowPos}`} />
                  </div>

                  {/* 1. Vector Illustration */}
                  <div className="w-14 h-14 mb-4 flex items-center justify-center relative">
                    {/* Soft background radial glow */}
                    <div className="absolute inset-0 rounded-full bg-indigo-500/5 blur-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    {stage.illustration}
                  </div>

                  {/* 2. Timeline Connection Node */}
                  <div className="relative z-20 w-5.5 h-5.5 rounded-full border border-white/15 bg-background flex items-center justify-center group-hover:border-indigo-400 group-hover:shadow-[0_0_12px_#6366f1] transition-all duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/35 group-hover:bg-indigo-400 group-hover:scale-125 transition-all duration-300" />
                  </div>

                  {/* 3. Title & Stage ID */}
                  <div className="mt-4 flex flex-col items-center text-center">
                    <span className="text-xs font-mono font-medium tracking-wider text-luxuryMuted group-hover:text-white transition-colors uppercase">
                      {stage.topic}
                    </span>
                    <span className="text-[10px] font-mono text-luxuryGold mt-0.5">
                      {stage.id}
                    </span>
                  </div>

                </motion.div>
              );
            })}

          </div>

        </div>

        <div className="text-center pointer-events-none mt-10">
          <span className="text-[9px] uppercase font-mono tracking-superWide text-luxuryMuted/70 lg:block hidden">
            Hover over stage timeline nodes to reveal playbook playbooks
          </span>
          <span className="text-[9px] uppercase font-mono tracking-superWide text-luxuryMuted/70 lg:hidden block">
            Swipe horizontally · Tap nodes to reveal details
          </span>
        </div>

      </div>
    </section>
  );
}
