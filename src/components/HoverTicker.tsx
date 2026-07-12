"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ExternalLink, BookOpen } from "lucide-react";

interface TickerCard {
  src: string;
  title: string;
  eyebrow: string;
  hook: string;
  link: string;
  accent: string;
  shadowGlow: string;
}

interface HoverTickerProps {
  items: TickerCard[];
  speedSeconds?: number;
}

export default function HoverTicker({ items = [], speedSeconds = 35 }: HoverTickerProps) {
  // Duplicate items array to ensure seamless infinite looping
  const marqueeItems = [...items, ...items, ...items];

  const trackRef = useRef<HTMLDivElement>(null);
  const [oneSetWidth, setOneSetWidth] = useState(0);
  const x = useMotionValue(0);

  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (trackRef.current) {
      const timer = setTimeout(() => {
        if (trackRef.current) {
          setOneSetWidth(trackRef.current.scrollWidth / 3);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [items]);

  useEffect(() => {
    const handleResize = () => {
      if (trackRef.current) {
        setOneSetWidth(trackRef.current.scrollWidth / 3);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const speed = 0.85; // Pixels per frame scroll speed

    const animate = () => {
      if (oneSetWidth > 0) {
        if (!isHoveredRef.current && !isDraggingRef.current) {
          let currentX = x.get() - speed;
          if (currentX <= -oneSetWidth) {
            currentX += oneSetWidth;
          }
          x.set(currentX);
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [oneSetWidth, x]);

  const handleDragEnd = () => {
    isDraggingRef.current = false;
    if (oneSetWidth > 0) {
      let currentX = x.get();
      if (currentX <= -oneSetWidth) {
        x.set(currentX + oneSetWidth);
      } else if (currentX > 0) {
        x.set(currentX - oneSetWidth);
      }
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="w-full relative overflow-hidden py-6 select-none">
      {/* Edge Vignette Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-[12%] bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-[12%] bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Marquee Drag Area */}
      <div 
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
      >
        <motion.div 
          ref={trackRef}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -oneSetWidth * 2, right: 0 }}
          dragElastic={0.15}
          dragMomentum={true}
          onDragStart={() => { isDraggingRef.current = true; }}
          onDragEnd={handleDragEnd}
          className="flex gap-4 w-max"
        >
          {marqueeItems.map((item, idx) => (
            <motion.a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel flex-shrink-0 relative overflow-hidden border border-white/5 flex flex-col justify-between p-6 cursor-pointer group/card"
              style={{
                width: "300px",
                height: "320px",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)"
              }}
              whileHover={{
                y: -8,
                borderColor: "rgba(255, 255, 255, 0.15)",
                boxShadow: `0 15px 30px -5px ${item.shadowGlow}, 0 5px 15px rgba(0,0,0,0.6)`
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Colored top-right border marker on hover */}
              <div 
                className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                style={{
                  borderTop: `2px solid ${item.accent}`,
                  borderRight: `2px solid ${item.accent}`,
                  borderTopRightRadius: "20px"
                }}
              />
              <div 
                className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                style={{
                  borderBottom: `2px solid ${item.accent}`,
                  borderLeft: `2px solid ${item.accent}`,
                  borderBottomLeftRadius: "20px"
                }}
              />

              {/* Background Mockup Image Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-15 filter brightness-[0.5] group-hover/card:scale-[1.04] transition-transform duration-700 pointer-events-none"
                style={{ backgroundImage: `url(${item.src})` }}
              />

              <div className="space-y-3 relative z-10">
                {/* Eyebrow Theme Tag */}
                <div className="flex items-center gap-1.5">
                  <span 
                    className="w-1.5 h-1.5 rounded-full" 
                    style={{ 
                      backgroundColor: item.accent,
                      boxShadow: `0 0 8px ${item.accent}`
                    }}
                  />
                  <span className="text-[9px] tracking-widest text-luxuryMuted font-mono uppercase">
                    {item.eyebrow}
                  </span>
                </div>

                {/* Case Study Title */}
                <h3 className="text-lg font-light text-foreground tracking-wide group-hover/card:text-luxuryGold transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Short Hook */}
                <p className="text-[12px] text-luxuryMuted leading-relaxed font-light">
                  {item.hook}
                </p>
              </div>

              {/* Footer CTA Link */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between relative z-10">
                <span className="text-[9px] text-luxuryMuted font-mono tracking-widest uppercase flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-luxuryGold" />
                  Strategy Case
                </span>
                
                <span 
                  className="text-[10px] font-semibold hover:underline flex items-center gap-1 transition-colors duration-300 font-mono"
                  style={{ color: item.accent }}
                >
                  READ REPORT
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
