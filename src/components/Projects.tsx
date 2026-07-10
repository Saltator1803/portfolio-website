"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import data from "@/data/profile.json";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Calendar, ChevronLeft, ChevronRight, X, FileText, Presentation, ExternalLink } from "lucide-react";

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
      { src: "/images/projects/solargrid_mockup.png", index: 5 }
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
        {selectedProject && (() => {
          // Rich details map matching the screenshot specifications
          const PROJECT_DETAILS_MAP: Record<string, {
            statusBadge: string;
            subTagline: string;
            briefSummary: string;
            stats: string[];
            keyAreas: string;
            detailedDescription: string;
            whereThisStands: string;
            execSummaryLink: string;
            slideDeckLink: string;
            applicationLink: string;
          }> = {
            "karigold": {
              statusBadge: "0→1 · STRATEGY & GTM",
              subTagline: "Karigar-First D2C Gold Jewelry Marketplace",
              briefSummary: "Restructuring India's ₹5.5L Cr gold jewelry market by connecting certified local karigars directly to consumers, cutting retail markup by 15%.",
              stats: [
                "₹5.5L Cr market size",
                "100+ customer interviews",
                "6 brand tear-downs",
                "HUID transparency"
              ],
              keyAreas: "D2C Marketplace · Disintermediation · Trust-as-a-Service",
              detailedDescription: "KariGold addresses high retailer markups (up to 25%) and lack of purity traceability. By using government HUID tracking numbers and connecting verified regional artisans directly with buyers, KariGold doubles artisan wages while delivering custom purity-guaranteed gold at wholesale rates.",
              whereThisStands: "Strategy phase completed. Preparing to deploy high-fidelity landing pages to capture deposit commitments and validate email conversion rates.",
              execSummaryLink: "#",
              slideDeckLink: "#",
              applicationLink: "https://karigold.vercel.app/"
            },
            "nexus": {
              statusBadge: "MVP · AWARDED 1ST PLACE",
              subTagline: "B2B operations & value proposition design for MICE",
              briefSummary: "Award-winning SaaS coordination platform designed for the ₹10,000 Cr MICE event industry, resolving operational budget leakage by 5%.",
              stats: [
                "Awarded 1st of 10 teams",
                "₹10,000 Cr MICE sector",
                "10 event organizers surveyed",
                "12h/week saved"
              ],
              keyAreas: "B2B SaaS · SLA Tracking · Vendor Dashboards",
              detailedDescription: "Nexus coordinates vendor deliverables, tracks SLA delays, and manages operational change orders in real-time, eliminating WhatsApp and spreadsheet clutter to save event managers hours of tracking weekly.",
              whereThisStands: "Awarded top honor at IPL Skillathon. Closed beta planned with 3 local event agencies using interactive Figma prototype validations.",
              execSummaryLink: "#",
              slideDeckLink: "#",
              applicationLink: "https://ishandave-main.github.io/Nexus-event/"
            },
            "parkhive": {
              statusBadge: "0→1 · VALIDATING",
              subTagline: "Real-Time Parking Discovery for Urban India",
              briefSummary: "Built and validated a WhatsApp-first real-time parking discovery platform for Indian metro cities, from 50+ surveys and 20+ interviews to a live tested MVP, tackling a ₹20,000 Cr annual congestion problem in Bangalore alone.",
              stats: [
                "12.3M vehicles · 27K spots",
                "50+ surveys · 20+ interviews",
                "MVP live-tested",
                "82% want mobile solution"
              ],
              keyAreas: "Product Strategy · Zero-App MVP · Urban Mobility",
              detailedDescription: "Our WhatsApp-based real-time parking discovery platform helps urban drivers in Indian metro cities who want to find available parking instantly near their destination by reducing 15 to 20 minute search loops, fuel waste, and the stress of circling endlessly, enabling predictable, under-8-minute parking every trip, every time.",
              whereThisStands: "MVP tested live across Koramangala, Indiranagar, MG Road. Currently scoping mobility partner integration and platform architecture for scale.",
              execSummaryLink: "#",
              slideDeckLink: "#",
              applicationLink: "https://hive-parking.preview.emergentagent.com/"
            },
            "my fitness pal": {
              statusBadge: "ENGINEERING · COMPLETE",
              subTagline: "High-speed nutrition tracking client checkout",
              briefSummary: "A custom React client engineered to bypass slow macro tracking flows, reducing time-to-log by 60%.",
              stats: [
                "15s macro entry loop",
                "60% faster logging",
                "React & Tailwind",
                "100% stable static flow"
              ],
              keyAreas: "Web Development · Front-End Optimization · UX Analytics",
              detailedDescription: "An engineering experiment focused on customer retention in fitness apps. It optimizes search bars and macro-breakdown chart renders to deliver high-performance logging without database lag.",
              whereThisStands: "Code fully shipped on GitHub. Preparing voice-to-text integration pipelines to evaluate input error rates.",
              execSummaryLink: "#",
              slideDeckLink: "#",
              applicationLink: "https://arrozsolutions.github.io/MyFitPal/#how-it-works"
            },
            "anthill": {
              statusBadge: "MVP · ACTIVE",
              subTagline: "AI-Powered Conference Companion",
              briefSummary: "An AI-powered conference companion designed to help attendees maximize the value of professional events through personalized recommendations and intelligent networking.",
              stats: [
                "AI recommendation engine",
                "Smart attendee matching",
                "Centralized event assets",
                "Real-time event insights"
              ],
              keyAreas: "AI Personalization · Smart Matchmaking · Attendee Engagement",
              detailedDescription: "Anthill helps attendees maximize event ROI by analyzing profiles to recommend relevant sessions, suggest networking connections, and centralize resources, transforming standard conferences into highly engaging, data-driven experiences.",
              whereThisStands: "MVP active and piloted. Organizers see higher networking quality and content access rates.",
              execSummaryLink: "#",
              slideDeckLink: "#",
              applicationLink: "https://www.anything.com/mobile-preview/f9420417-94ce-4f60-a2bb-9611ed25b10e"
            },
            "solar grid": {
              statusBadge: "0→1 · DECENTRALIZED",
              subTagline: "Peer-to-Peer Solar Energy Marketplace",
              briefSummary: "A peer-to-peer renewable energy marketplace enabling households and businesses with surplus solar energy to trade electricity directly with nearby consumers.",
              stats: [
                "P2P energy trading",
                "Dynamic pricing model",
                "Real-time supply monitoring",
                "Community carbon metrics"
              ],
              keyAreas: "Marketplace Design · Energy Trading Systems · Analytics Dashboards",
              detailedDescription: "SolarGrid creates a decentralized energy trading ecosystem where surplus solar producers sell directly to neighbors, supported by dynamic supply-demand metrics, community carbon impact tracking, and local microgrid grid-health insights.",
              whereThisStands: "Core marketplace dynamics completed. Evaluating microgrid pilot scenarios and battery storage ledger optimizations.",
              execSummaryLink: "#",
              slideDeckLink: "#",
              applicationLink: "https://468c1755-91ae-4312-b8a7-98be28b4979e.web.createdevserver.com/"
            },
            "anthropic": {
              statusBadge: "STRATEGY · COMPLETED",
              subTagline: "Enterprise AI market monetization study",
              briefSummary: "Strategic evaluation of safety APIs and seat license monetizations, proving an 8x revenue advantage per user.",
              stats: [
                "8x revenue per user",
                "Vertex & Bedrock parities",
                "Enterprise seat study",
                "Model commoditization hedge"
              ],
              keyAreas: "AI Platform Strategy · B2B GTM · Compute Unit Economics",
              detailedDescription: "Evaluates B2B market moat strategies for frontier models, focusing on multi-cloud security compliance and model integration safety protocols.",
              whereThisStands: "Case study complete. Transitioning findings into framework guidelines for enterprise client integrations.",
              execSummaryLink: "#",
              slideDeckLink: "#",
              applicationLink: "/case-studies/anthropic-case-study.html"
            },
            "cred": {
              statusBadge: "STRATEGY · COMPLETED",
              subTagline: "Fintech credit club monetization teardown",
              briefSummary: "Monetization study analyzing trust score rewards and premium advertising conversion rates for the top 1% credit segment.",
              stats: [
                "Top 1% segment curation",
                "Premium merchant conversion",
                "Zero general ad noise",
                "Credit default evaluation"
              ],
              keyAreas: "Fintech Economics · Curation Loops · Ad ROI Optimization",
              detailedDescription: "Analyzes how restricting access to high-credit scores generates merchant conversion and ROI, supporting premium club valuation models.",
              whereThisStands: "Teardown complete. Validating default risk metrics against general credit transaction logs.",
              execSummaryLink: "#",
              slideDeckLink: "#",
              applicationLink: "/case-studies/cred-case-study.html"
            },
            "blinkit": {
              statusBadge: "STRATEGY · COMPLETED",
              subTagline: "Quick commerce dark store logistics analysis",
              briefSummary: "Logistics teardown mapping stores density, wastage rates, and transition to first-party inventory profitability.",
              stats: [
                "0.3% swing into EBITDA profit",
                "Dark store density modeling",
                "Ad margin optimization",
                "Wastage threshold reduction"
              ],
              keyAreas: "Quick Commerce Logistics · Unit Economics · Brand Media Monetization",
              detailedDescription: "Analyzes Blinkit's transition to profitability in low-margin quick commerce, outlining dark store optimization and retail media ads as margin drivers.",
              whereThisStands: "Case study complete. Running A/B fee tests across various dark store circles.",
              execSummaryLink: "#",
              slideDeckLink: "#",
              applicationLink: "/case-studies/blinkit-case-study.html"
            }
          };

          // Render dynamic brand logo SVGs matching details mockup
          const renderProjectLogo = (title: string) => {
            const t = title.toLowerCase();
            if (t.includes("parkhive")) {
              return (
                <div className="w-14 h-14 rounded-2xl bg-[#030303] border border-white/10 flex flex-col items-center justify-center p-2 relative shadow-inner flex-shrink-0">
                  <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#C5A880]">
                    <circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M18 16h6c3 0 5 1.5 5 4.5s-2 4.5-5 4.5h-6v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <circle cx="24" cy="24" r="9" stroke="#EAB308" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
                  </svg>
                  <span className="text-[5px] font-bold text-white/90 tracking-widest mt-0.5 uppercase leading-none font-mono">
                    PARKHIVE
                  </span>
                </div>
              );
            }
            if (t.includes("karigold")) {
              return (
                <div className="w-14 h-14 rounded-2xl bg-[#030303] border border-white/10 flex flex-col items-center justify-center p-2 relative shadow-inner flex-shrink-0">
                  <svg viewBox="0 0 48 48" className="w-8 h-8 text-luxuryGold">
                    <path d="M24 8l14 10-4 18H14l-4-18z" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                  <span className="text-[5px] font-bold text-white/90 tracking-widest mt-0.5 uppercase leading-none font-mono">
                    KARIGOLD
                  </span>
                </div>
              );
            }
            if (t.includes("nexus")) {
              return (
                <div className="w-14 h-14 rounded-2xl bg-[#030303] border border-white/10 flex flex-col items-center justify-center p-2 relative shadow-inner flex-shrink-0">
                  <svg viewBox="0 0 48 48" className="w-8 h-8 text-indigo-400">
                    <circle cx="16" cy="16" r="3" fill="currentColor" />
                    <circle cx="32" cy="16" r="3" fill="currentColor" />
                    <circle cx="24" cy="32" r="3" fill="currentColor" />
                    <line x1="16" y1="16" x2="24" y2="32" stroke="currentColor" strokeWidth="2" />
                    <line x1="32" y1="16" x2="24" y2="32" stroke="currentColor" strokeWidth="2" />
                    <line x1="16" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span className="text-[5px] font-bold text-white/90 tracking-widest mt-0.5 uppercase leading-none font-mono">
                    NEXUS
                  </span>
                </div>
              );
            }
            if (t.includes("fitness") || t.includes("fitpal")) {
              return (
                <div className="w-14 h-14 rounded-2xl bg-[#030303] border border-white/10 flex flex-col items-center justify-center p-2 relative shadow-inner flex-shrink-0">
                  <svg viewBox="0 0 48 48" className="w-8 h-8 text-green-400">
                    <path d="M12 24c6 0 10-6 12-12 2 6 6 12 12 12-6 0-10 6-12 12-2-6-6-12-12-12z" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                  <span className="text-[5px] font-bold text-white/90 tracking-widest mt-0.5 uppercase leading-none font-mono">
                    FITPAL
                  </span>
                </div>
              );
            }
            if (t.includes("anthill")) {
              return (
                <div className="w-14 h-14 rounded-2xl bg-[#030303] border border-white/10 flex flex-col items-center justify-center p-2 relative shadow-inner flex-shrink-0">
                  <svg viewBox="0 0 48 48" className="w-8 h-8 text-orange-400">
                    <circle cx="18" cy="24" r="2.5" fill="currentColor" />
                    <circle cx="30" cy="24" r="3" fill="currentColor" />
                    <circle cx="42" cy="24" r="3.5" fill="currentColor" />
                    <line x1="18" y1="24" x2="30" y2="24" stroke="currentColor" strokeWidth="2" />
                    <line x1="30" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span className="text-[5px] font-bold text-white/90 tracking-widest mt-0.5 uppercase leading-none font-mono">
                    ANTHILL
                  </span>
                </div>
              );
            }
            if (t.includes("solar")) {
              return (
                <div className="w-14 h-14 rounded-2xl bg-[#030303] border border-white/10 flex flex-col items-center justify-center p-2 relative shadow-inner flex-shrink-0">
                  <svg viewBox="0 0 48 48" className="w-8 h-8 text-yellow-400">
                    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M24 8v3M24 37v3M8 24h3M37 24h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="text-[5px] font-bold text-white/90 tracking-widest mt-0.5 uppercase leading-none font-mono">
                    SOLARGRID
                  </span>
                </div>
              );
            }
            if (t.includes("anthropic")) {
              return (
                <div className="w-14 h-14 rounded-2xl bg-[#030303] border border-white/10 flex flex-col items-center justify-center p-2 relative shadow-inner flex-shrink-0">
                  <svg viewBox="0 0 48 48" className="w-8 h-8 text-violet-400">
                    <path d="M12 36l12-24 12 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <line x1="18" y1="28" x2="30" y2="28" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span className="text-[5px] font-bold text-white/90 tracking-widest mt-0.5 uppercase leading-none font-mono">
                    ANTHROPIC
                  </span>
                </div>
              );
            }
            if (t.includes("cred")) {
              return (
                <div className="w-14 h-14 rounded-2xl bg-[#030303] border border-white/10 flex flex-col items-center justify-center p-2 relative shadow-inner flex-shrink-0">
                  <svg viewBox="0 0 48 48" className="w-8 h-8 text-blue-400">
                    <rect x="10" y="14" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
                    <line x1="10" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <span className="text-[5px] font-bold text-white/90 tracking-widest mt-0.5 uppercase leading-none font-mono">
                    CRED
                  </span>
                </div>
              );
            }
            return (
              <div className="w-14 h-14 rounded-2xl bg-[#030303] border border-white/10 flex flex-col items-center justify-center p-2 relative shadow-inner flex-shrink-0">
                <svg viewBox="0 0 48 48" className="w-8 h-8 text-yellow-500">
                  <path d="M10 16h28l-4 22H14z" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="20" cy="38" r="2" fill="currentColor" />
                  <circle cx="28" cy="38" r="2" fill="currentColor" />
                </svg>
                <span className="text-[5px] font-bold text-white/90 tracking-widest mt-0.5 uppercase leading-none font-mono">
                  BLINKIT
                </span>
              </div>
            );
          };

          const lookupKey = selectedProject.title.toLowerCase();
          const richDetail = PROJECT_DETAILS_MAP[lookupKey] || {
            statusBadge: "0→1 · VALIDATING",
            subTagline: selectedProject.tagline,
            briefSummary: selectedProject.description,
            stats: selectedProject.bulletPoints?.slice(0, 4) || ["MVP tested live"],
            keyAreas: "Product Strategy · Design · Engineering",
            detailedDescription: selectedProject.description,
            whereThisStands: "MVP launched and validation cycles underway.",
            execSummaryLink: "#",
            slideDeckLink: "#",
            applicationLink: selectedProject.link || "#"
          };

          return (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md cursor-default"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#070708] p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl flex flex-col gap-5 scrollbar-none"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.03] border border-white/5 hover:border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 cursor-pointer z-50 shadow-md"
                  aria-label="Close Details"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* Header details with brand logo & titles */}
                <div className="flex gap-4 items-start pr-8">
                  {renderProjectLogo(selectedProject.title)}
                  
                  <div className="flex flex-col gap-1">
                    {/* Status Badge */}
                    <div className="self-start text-[9px] text-[#D4AF37] font-mono font-medium tracking-widest uppercase px-2.5 py-0.5 bg-[#D4AF37]/5 border border-[#D4AF37]/25 rounded-full">
                      {richDetail.statusBadge}
                    </div>
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight mt-1 leading-none">
                      {selectedProject.title}
                    </h3>
                    {/* Sub-tagline */}
                    <span className="text-[11px] text-white/50 font-mono tracking-normal leading-normal mt-0.5">
                      {richDetail.subTagline}
                    </span>
                  </div>
                </div>

                {/* Brief highlight paragraph */}
                <p className="text-[12.5px] leading-relaxed text-white/85 font-light">
                  {richDetail.briefSummary}
                </p>

                {/* Stats cards grid */}
                <div className="grid grid-cols-2 gap-3">
                  {richDetail.stats.map((stat, idx) => (
                    <div 
                      key={idx}
                      className="px-3 py-2 rounded-xl border border-white/5 bg-white/[0.01] text-[10.5px] font-mono text-white/60 tracking-tight leading-normal"
                    >
                      {stat}
                    </div>
                  ))}
                </div>

                {/* Key Disciplines */}
                <span className="text-[10.5px] tracking-wider text-blue-400 font-mono select-none">
                  {richDetail.keyAreas}
                </span>

                <div className="w-full h-[1px] bg-white/5 my-1" />

                {/* Detailed Description */}
                <p className="text-[12.5px] leading-relaxed text-white/90 font-light">
                  {richDetail.detailedDescription}
                </p>

                {/* Where this stands box */}
                <div className="rounded-2xl border border-[#D4AF37]/15 bg-white/[0.01] p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[10px] font-semibold tracking-wider text-[#D4AF37] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    WHERE THIS STANDS
                  </div>
                  <p className="text-[11px] text-white/60 leading-relaxed font-light">
                    {richDetail.whereThisStands}
                  </p>
                </div>

                {/* Modal actions (Exec Summary, Slide Deck, Application) */}
                <div className="grid grid-cols-3 gap-3 mt-2">
                  <a 
                    href={richDetail.execSummaryLink}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all font-mono text-[10px] font-medium text-white/80 text-center"
                  >
                    <FileText className="w-3.5 h-3.5 text-white/40" />
                    Exec Summary
                  </a>
                  <a 
                    href={richDetail.slideDeckLink}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all font-mono text-[10px] font-medium text-white/80 text-center"
                  >
                    <Presentation className="w-3.5 h-3.5 text-white/40" />
                    Slide Deck
                  </a>
                  <a 
                    href={richDetail.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 transition-all font-mono text-[10px] font-medium text-[#D4AF37] text-center"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Application
                  </a>
                </div>

              </motion.div>
            </div>
          );
        })()}
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
