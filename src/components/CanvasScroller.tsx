"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useImagePreloader } from "@/hooks/useImagePreloader";

gsap.registerPlugin(ScrollTrigger);

interface CanvasScrollerProps {
  directory: string;
  frameCount: number;
  triggerId: string;
  canvasClassName?: string;
  onFrameUpdate?: (progress: number) => void;
}

export default function CanvasScroller({
  directory,
  frameCount,
  triggerId,
  canvasClassName = "",
  onFrameUpdate,
}: CanvasScrollerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // Generate sequence URLs based on actual 1-indexed ezgif-frame-XXX.jpg naming pattern
  useEffect(() => {
    const urls = Array.from({ length: frameCount }).map((_, i) => {
      const paddedIndex = String(i + 1).padStart(3, "0");
      return `/${directory}/ezgif-frame-${paddedIndex}.jpg`;
    });
    setImageUrls(urls);
  }, [directory, frameCount]);

  const { loaded, progress } = useImagePreloader(imageUrls);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    if (!loaded || imageUrls.length === 0) return;

    // Build standard image caches
    imagesRef.current = imageUrls.map((url) => {
      const img = new Image();
      img.src = url;
      return img;
    });

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI display scales
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const renderFrame = (index: number) => {
      const targetImage = imagesRef.current[index];
      if (!targetImage || !ctx || !canvas) return;

      // Ensure high-quality image interpolation on high-DPI screens
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Perform Aspect Ratio-Fit calculation
      const canvasWidth = canvas.width / dpr;
      const canvasHeight = canvas.height / dpr;
      const imgWidth = targetImage.width;
      const imgHeight = targetImage.height;

      const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;

      const xOffset = (canvasWidth - newWidth) / 2;
      const yOffset = (canvasHeight - newHeight) / 2;

      ctx.drawImage(targetImage, xOffset, yOffset, newWidth, newHeight);
    };

    // Draw initial frame
    renderFrame(0);

    // Bind GSAP trigger lifecycle
    const frameObj = { frame: 0 };
    const timeline = gsap.to(frameObj, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: `#${triggerId}`,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          renderFrame(Math.floor(frameObj.frame));
          if (onFrameUpdate) {
            onFrameUpdate(self.progress);
          }
        },
      },
    });

    const handleResize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      renderFrame(Math.floor(frameObj.frame));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, [loaded, imageUrls, frameCount, triggerId, onFrameUpdate]);

  if (!loaded) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-luxuryGold font-mono text-sm tracking-widest z-50">
        <span className="mb-4 animate-pulse uppercase">INITIATING CINEMATIC INSTANCES</span>
        <div className="w-48 h-[1px] bg-neutral-900 overflow-hidden relative">
          <div 
            className="h-full bg-luxuryGold transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="mt-2 text-xs text-luxuryMuted">{progress}% Loaded</span>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full object-cover pointer-events-none ${canvasClassName}`}
    />
  );
}
