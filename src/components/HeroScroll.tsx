"use client";

import React, { useEffect, useRef } from "react";
import CanvasScroller from "./CanvasScroller";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !heroRef.current || !aboutRef.current) return;

    // GSAP context helps with clean initialization and scoping
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      // Setup initial states
      gsap.set(heroRef.current, { opacity: 1, scale: 1, y: 0, pointerEvents: "auto" });
      gsap.set(aboutRef.current, { opacity: 0, scale: 0.95, y: 20, pointerEvents: "none" });

      // 1. Animate Hero Title out quickly (duration 0.10 relative to the timeline)
      tl.to(heroRef.current, {
        opacity: 0,
        scale: 0.95,
        y: -20,
        pointerEvents: "none",
        ease: "none",
        duration: 0.10
      }, 0);

      // 2. Animate About Me in at the end (fades in around progress 0.50 to 0.65)
      tl.to(aboutRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        pointerEvents: "auto",
        ease: "none",
        duration: 0.15
      }, 0.5);

      // 3. Force the timeline duration to be exactly 1.0 so that "About Me" remains fully visible for the final 35% of scroll
      tl.set({}, {}, 1.0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="hero" className="relative h-[450vh] bg-background">
      {/* Sticky Canvas Frame Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <CanvasScroller
          directory="sequence-1"
          frameCount={76} // Adjusted based on actual frames in sequence 1 zip
          triggerId="hero"
          scrollEnd="bottom-=120vh bottom"
        />

        {/* ========================================== */}
        {/* CHAPTER 1: HERO OVERLAY */}
        {/* ========================================== */}
        <div 
          ref={heroRef}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 z-10"
        >
          <div className="max-w-5xl w-full flex flex-col items-center justify-center text-center relative select-none">
            
            <div className="relative z-10 flex flex-col items-center justify-center">
              {/* 1. Eyebrow */}
              <span className="text-xs md:text-sm tracking-ultraWide text-luxuryGold uppercase font-mono font-medium mb-3 block">
                WELCOME TO
              </span>

              {/* Decorative Line Above Name */}
              <div className="flex items-center justify-center gap-4 w-full max-w-[280px] md:max-w-[400px] my-2">
                <div className="h-[1px] bg-gradient-to-r from-transparent to-luxuryGold/50 flex-grow" />
                <span className="text-luxuryGold text-[8px] md:text-[10px]">✦</span>
                <div className="h-[1px] bg-gradient-to-l from-transparent to-luxuryGold/50 flex-grow" />
              </div>

              {/* 2. Heading / Name */}
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-extrabold uppercase glass-outline-text whitespace-nowrap my-3">
                SANJU CHAUDHARY'S
              </h1>

              {/* Decorative Line Below Name */}
              <div className="flex items-center justify-center gap-4 w-full max-w-[280px] md:max-w-[400px] my-2">
                <div className="h-[1px] bg-gradient-to-r from-transparent to-luxuryGold/50 flex-grow" />
                <span className="text-luxuryGold text-[8px] md:text-[10px]">✦</span>
                <div className="h-[1px] bg-gradient-to-l from-transparent to-luxuryGold/50 flex-grow" />
              </div>

              {/* 3. Sub-Heading */}
              <span className="text-xs md:text-sm tracking-[0.4em] text-luxuryGold uppercase font-mono font-medium mt-3 block">
                PORTFOLIO
              </span>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* CHAPTER 2: ABOUT ME OVERLAY */}
        {/* ========================================== */}
        <div 
          ref={aboutRef}
          className="absolute inset-0 flex items-center justify-center p-6 md:p-16 lg:p-24 z-10"
        >
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center select-none text-left">
            
            {/* Left Story Column */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] tracking-ultraWide text-luxuryGold uppercase font-mono font-medium block">
                  About
                </span>
                <h2 className="text-3xl md:text-4xl font-light text-white tracking-wider uppercase">
                  ABOUT <span className="text-luxuryGold font-medium">ME</span>
                </h2>
                <span className="text-xs md:text-sm font-semibold tracking-widest text-luxuryGold uppercase font-mono mt-1">
                  FROM SOFTWARE ENGINEER TO AI PRODUCT MANAGER
                </span>
              </div>

              <div className="flex flex-col gap-6 text-[15px] md:text-[17px] leading-[1.8] text-zinc-300 font-light max-w-xl">
                <p>
                  I started my journey as a Software Engineer, where I learned how to build technology from the ground up. Over time, I realized that great technology only matters when it solves meaningful problems for real people. That curiosity naturally led me into Product Management.
                </p>
                <p>
                  Today, I work at the intersection of technology, business, AI, and user experience. I enjoy validating ideas, shaping product strategy, building AI-powered solutions, and turning complex challenges into simple, impactful products that people genuinely love.
                </p>
                <p>
                  Beyond Product Management, I'm equally passionate about Product Marketing. I believe building a great product is only half the journey—the other half is positioning it, telling a compelling story, and ensuring it reaches the people it's built for. My goal is to build products that create real impact while bringing together technology, strategy, and growth.
                </p>
              </div>
            </div>

            {/* Right Stats Column */}
            <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
              <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/[0.04] bg-black/25 backdrop-blur-[4px] max-w-sm w-full grid grid-cols-2 gap-6 shadow-2xl relative">
                {/* Ambient sub-panel glow */}
                <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(197,168,128,0.02)_0%,rgba(0,0,0,0)_70%] pointer-events-none" />
                
                <div className="flex flex-col z-10">
                  <span className="text-xl md:text-2xl font-light text-luxuryGold font-mono">400K+ rupee</span>
                  <span className="text-[9px] tracking-wider text-luxuryMuted font-mono uppercase">SALES FROM COLLEGE STARTUP</span>
                </div>
                <div className="flex flex-col z-10">
                  <span className="text-xl md:text-2xl font-light text-luxuryGold font-mono">100+</span>
                  <span className="text-[9px] tracking-wider text-luxuryMuted font-mono uppercase">USER VALIDATIONS</span>
                </div>
                <div className="flex flex-col z-10">
                  <span className="text-xl md:text-2xl font-light text-luxuryGold font-mono">6+</span>
                  <span className="text-[9px] tracking-wider text-luxuryMuted font-mono uppercase">PRODUCTS BUILT</span>
                </div>
                <div className="flex flex-col z-10">
                  <span className="text-xl md:text-2xl font-light text-luxuryGold font-mono">MBA</span>
                  <span className="text-[9px] tracking-wider text-luxuryMuted font-mono uppercase">TECH MANAGEMENT</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
