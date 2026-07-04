"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import data from "@/data/profile.json";
import { MyResumeDoc } from "./ResumeBuilder";
import { Download, Sun, Moon } from "lucide-react";

// Dynamically import PDFDownloadLink to bypass SSR issues
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false, loading: () => <span className="text-[10px] text-luxuryMuted font-mono">Loading builder...</span> }
);

export default function Header() {
  const [isClient, setIsClient] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setIsClient(true);
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "light") {
        document.documentElement.classList.add("light");
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-8 py-5 md:px-16 flex justify-between items-center bg-background/90 backdrop-blur-md border-b border-luxuryBorder shadow-lg shadow-black/5 transition-all duration-300">
      <div className="flex flex-col">
        <span className="text-sm font-semibold tracking-ultraWide text-foreground uppercase">
          {data.profile.name}
        </span>
        <span className="text-[10px] tracking-superWide text-luxuryGold uppercase mt-1">
          Portfolio
        </span>
      </div>

      <nav className="hidden md:flex gap-8 text-[11px] tracking-widest text-luxuryMuted uppercase">
        <a href="#hero" className="hover:text-foreground transition-colors duration-300">About</a>
        <a href="#experience" className="hover:text-foreground transition-colors duration-300">Experience</a>
        <a href="#projects" className="hover:text-foreground transition-colors duration-300">Projects</a>
        <a href="#education" className="hover:text-foreground transition-colors duration-300">Education</a>
        <a href="#resume-builder" className="hover:text-foreground transition-colors duration-300">Resume</a>
      </nav>

      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full glass-panel border border-luxuryBorder hover:border-luxuryGold text-luxuryGold flex items-center justify-center transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(197,168,128,0.05)]"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-luxuryGold" />
          ) : (
            <Moon className="w-4 h-4 text-luxuryGold" />
          )}
        </button>

        <div>
          {isClient ? (
            <PDFDownloadLink document={<MyResumeDoc />} fileName="Sanju_Chowdhury_Resume.pdf">
              {/* @ts-ignore */}
              {({ loading }) => (
                <button
                  disabled={loading}
                  className="glass-panel text-luxuryGold hover:text-black hover:bg-luxuryGold text-[11px] tracking-widest uppercase py-2 px-4 rounded-full transition-all duration-500 ease-out border border-luxuryBorder hover:border-luxuryGold shadow-[0_0_15px_rgba(197,168,128,0.1)] hover:shadow-[0_0_20px_rgba(197,168,128,0.3)] cursor-pointer inline-flex items-center gap-2 font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  {loading ? "Compiling..." : "Download Resume"}
                </button>
              )}
            </PDFDownloadLink>
          ) : (
            <button
              disabled
              className="glass-panel text-luxuryGold/40 text-[11px] tracking-widest uppercase py-2 px-4 rounded-full border border-luxuryBorder/20 opacity-50 cursor-not-allowed inline-flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5 opacity-55" />
              Loading...
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

