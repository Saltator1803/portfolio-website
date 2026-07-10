"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { useAnimationFrame } from "framer-motion";

interface WavyTickerProps {
  items: React.ReactNode[];
  direction?: "left" | "right";
  speed?: number;
  slowdownOnHover?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  itemWidth?: number;
  gap?: number;
  padding?: number;
}

export default function WavyTicker({
  items = [],
  direction = "left",
  speed = 40, // pixels per second
  slowdownOnHover = 0.2, // speed multiplier on hover
  waveAmplitude = 14, // height of wave
  waveFrequency = 0.006, // wave frequency
  itemWidth = 72, // fixed item width in px
  gap = 32, // spacing between items in px
  padding = 24 // vertical padding
}: WavyTickerProps) {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [offset, setOffset] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1200);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setViewportWidth(window.innerWidth);
      const handleResize = () => {
        if (containerRef.current) {
          setViewportWidth(containerRef.current.offsetWidth);
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Animation frame loop
  useAnimationFrame((time, delta) => {
    if (!mounted || isHovered && slowdownOnHover === 0) return;
    
    // Scale speed on hover
    const currentSpeed = isHovered ? speed * slowdownOnHover : speed;
    
    // Increment translation offset (delta is in ms, speed is px/s)
    setOffset((prev) => prev + currentSpeed * (delta / 1000));
  });

  const totalItemWidth = itemWidth + gap;
  const totalLength = items.length * totalItemWidth;

  // Calculate repeats to fill the screen and overlap cleanly
  const repeats = useMemo(() => {
    if (totalLength === 0) return 3;
    return Math.max(3, Math.ceil(viewportWidth / totalLength) + 2);
  }, [viewportWidth, totalLength]);

  const allItems = useMemo(() => {
    return Array.from({ length: repeats }, () => items).flat();
  }, [repeats, items]);

  if (items.length === 0) return null;
  if (!mounted) {
    return (
      <div 
        style={{ height: itemWidth + waveAmplitude * 2 + padding * 2 }} 
        className="w-full bg-transparent" 
      />
    );
  }

  // Calculate scrolling track layout transform offset
  const loopLength = totalLength;
  let finalOffset = 0;
  if (direction === "left") {
    // Scrolling left
    finalOffset = -(offset % loopLength);
  } else {
    // Scrolling right
    finalOffset = (offset % loopLength) - loopLength;
  }

  const calculatedHeight = itemWidth + waveAmplitude * 2 + padding * 2;

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden relative flex items-center select-none"
      style={{ 
        height: `${calculatedHeight}px`,
        maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex absolute items-center transform-gpu"
        style={{
          gap: `${gap}px`,
          transform: `translate3d(${finalOffset}px, 0, 0)`,
          willChange: "transform"
        }}
      >
        {allItems.map((item, index) => {
          // Calculate item's timeline position for the wave effect
          const itemPosition = index * totalItemWidth;
          
          // Sine wave translation
          const waveOffset = Math.sin((itemPosition + offset) * waveFrequency) * waveAmplitude;

          return (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center transform-gpu"
              style={{
                width: `${itemWidth}px`,
                height: `${itemWidth}px`,
                transform: `translate3d(0, ${waveOffset}px, 0)`,
                willChange: "transform"
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
