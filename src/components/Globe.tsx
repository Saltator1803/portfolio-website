"use client";

import React from "react";
import data from "@/data/profile.json";

export default function Globe() {
  return (
    <footer id="contact" className="relative w-full bg-background overflow-hidden flex flex-col p-8 md:px-16 md:py-24 z-20 gap-16">
      {/* Visual Ambient Globe Loop Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-0 mix-blend-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/world.png" // Safe image fallback in event video fails tracking
        >
          <source src="/globe-loop.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-6">
          <h2 className="text-xs tracking-ultraWide text-luxuryGold uppercase font-mono">
            / 04 — Let's connect
          </h2>
          <h3 className="text-4xl md:text-6xl font-light text-foreground tracking-widest uppercase">
            Let's build<br />something new.
          </h3>
          <p className="text-luxuryMuted text-sm font-light max-w-sm leading-relaxed">
            I'm open to PM roles, founding-team opportunities and freelance product work in AI & SaaS.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-lg border border-white/5 w-full max-w-md space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-luxuryGold tracking-widest font-mono">Direct Communication</span>
            <p className="text-foreground text-sm font-light">{data.profile.email}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-luxuryGold tracking-widest font-mono">Current Location</span>
            <p className="text-foreground text-sm font-light">{data.profile.location}</p>
          </div>
          <div className="pt-4 border-t border-white/10 flex gap-6 text-xs text-luxuryMuted tracking-wider">
            <a href={`https://${data.profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-300">LinkedIn</a>
            <a href={`https://${data.profile.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-300">GitHub</a>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-superWide text-luxuryMuted uppercase gap-4">
        <span>© {new Date().getFullYear()} SANJU CHOWDHURY. ALL RIGHTS RESERVED.</span>
        <span>Built with ❤️ by Sanju Chowdhury</span>
      </div>
    </footer>
  );
}
