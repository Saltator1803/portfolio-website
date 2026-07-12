"use client";

import React from "react";
import HoverTicker from "./HoverTicker";
import { Sparkles } from "lucide-react";

export default function StrategyVault() {
  const caseStudies = [
    {
      src: "/images/projects/blinkit_mockup.png",
      title: "Blinkit — Profitability & Operations",
      eyebrow: "Growth, Operations & Unit Economics",
      link: "/case-studies/blinkit-case-study.html",
      accent: "#e8a33d", // Amber
      shadowGlow: "rgba(232, 163, 61, 0.18)",
      hook: "Blinkit turned its first adjusted EBITDA profit in Q4 FY26 — on a margin of 0.3% of order value. The real story isn't the win, it's how thin the win still is."
    },
    {
      src: "/images/projects/starbucks_mockup.png",
      title: "CRED — Monetization & Exclusivity",
      eyebrow: "Business Model & Trust-Based Monetization",
      link: "/case-studies/cred-case-study.html",
      accent: "#c5a880", // Muted Gold
      shadowGlow: "rgba(197, 168, 128, 0.18)",
      hook: "CRED restricts membership to users with a credit score above 750 — deliberately excluding 99% of India's population — and only monetizes about a third of its paying-eligible base."
    },
    {
      src: "/images/projects/notion_mockup.png",
      title: "Anthropic — Enterprise AI Strategy",
      eyebrow: "Enterprise AI Product Strategy",
      link: "/case-studies/anthropic-case-study.html",
      accent: "#6366f1", // Indigo
      shadowGlow: "rgba(99, 102, 241, 0.18)",
      hook: "While competitors chased consumer scale, Anthropic bet that the enterprise buyer — slower, pickier, but stickier — was the better business to build."
    },
    {
      src: "/images/projects/solargrid_mockup.png",
      title: "Duolingo — Retention & Gamification",
      eyebrow: "Product Design & Retention",
      link: "/case-studies/duolingo-case-study.html",
      accent: "#22c55e", // Green
      shadowGlow: "rgba(34, 197, 94, 0.18)",
      hook: "When free AI can already teach a language as well as a paid app, what's left to sell? Duolingo's answer: the habit, not the lesson."
    },
    {
      src: "/images/projects/anthill_mockup.png",
      title: "PUBG/BGMI — Durable Core Loop Design",
      eyebrow: "Addictive Product Design / Engagement",
      link: "/case-studies/pubg-bgmi-case-study.html",
      accent: "#f97316", // Red-Orange
      shadowGlow: "rgba(249, 115, 22, 0.18)",
      hook: "India banned the game outright in 2020. Five years later, its India-specific successor is one of Krafton's fastest-growing markets."
    },
    {
      src: "/images/projects/nexus_mockup.png",
      title: "Google vs Microsoft — AI Distribution",
      eyebrow: "AI Platform Competition",
      link: "/case-studies/google-vs-microsoft-case-study.html",
      accent: "#8b5cf6", // Purple
      shadowGlow: "rgba(139, 92, 246, 0.18)",
      hook: "ChatGPT still has the most users. Gemini is growing the fastest. Copilot barely shows up in web traffic — yet holds a defensible enterprise position."
    },
    {
      src: "/images/projects/karigold_mockup.png",
      title: "Krutrim — Failure Analysis",
      eyebrow: "Failure Analysis / Post-Mortem",
      link: "/case-studies/krutrim-case-study.html",
      accent: "#991b1b", // Muted Grey-Red
      shadowGlow: "rgba(153, 27, 27, 0.18)",
      hook: "Bhavish Aggarwal promised India its own OpenAI. Two years later, the team that was supposed to build it had shrunk by 70% and the flagship products were shelved."
    },
    {
      src: "/images/projects/parkhive_mockup.png",
      title: "Meta — Cross-App Moat & Defense",
      eyebrow: "Competitive Moat & Platform Defense",
      link: "/case-studies/meta-facebook-case-study.html",
      accent: "#0d9488", // Deep Teal
      shadowGlow: "rgba(13, 148, 136, 0.18)",
      hook: "TikTok took the attention. Meta didn't chase it back with better content — it changed what 'leaving Facebook' costs a user."
    }
  ];

  return (
    <section 
      id="strategy-vault" 
      className="relative py-20 bg-background border-b border-luxuryBorder z-20 flex flex-col items-center overflow-hidden"
    >
      {/* Decorative side ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-luxuryGold/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl w-full px-8 md:px-16 mb-8 flex flex-col md:flex-row justify-between items-baseline gap-4 border-b border-luxuryBorder pb-8 relative z-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-xs tracking-ultraWide text-luxuryGold uppercase font-mono flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-luxuryGold" />
            / 02.2 — Strategic Analysis
          </h2>
          <span className="text-3xl font-light text-foreground tracking-widest uppercase block">
            Strategy Case Studies
          </span>
        </div>
        <span className="text-xs tracking-widest text-luxuryMuted font-mono uppercase select-none">
          8 Teardowns Compiled
        </span>
      </div>

      {/* HoverTicker Wrapper */}
      <div className="w-full relative z-10">
        <HoverTicker items={caseStudies} />
      </div>

      <div className="text-center pointer-events-none mt-4 relative z-10">
        <span className="text-[10px] uppercase font-mono tracking-superWide text-luxuryMuted">
          Hover to pause autoscroll · Click any card to read full teardown report
        </span>
      </div>
    </section>
  );
}
