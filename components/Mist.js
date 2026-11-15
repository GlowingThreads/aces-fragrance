"use client";
import { useEffect, useRef } from "react";

// A slow veil of scented mist behind the hero: a short, silent, looping video (public/mist.mp4).
// The clip is pale vapour on black; CSS blends the black away and warms the vapour to gold.
// Visitors who ask for reduced motion get the still poster image instead.
export default function Mist() {
  const video = useRef(null);

  useEffect(() => {
    const v = video.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.muted = true; // browsers only allow autoplay for muted video
    v.playbackRate = 0.7; // slower reads as calmer
    v.play().catch(() => {}); // if the browser still refuses, the poster stays visible
  }, []);

  return (
    <div className="mist" aria-hidden="true">
      <video ref={video} muted loop playsInline preload="metadata" poster="/mist-poster.jpg" tabIndex={-1}>
        <source src="/mist.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
