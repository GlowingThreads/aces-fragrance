"use client";
import { useEffect, useRef } from "react";

// The burst of gold light behind the hero bottle: a short, silent, seamlessly looping video
// (public/sunburst.mp4, a small web-sized copy of assets/originals/sunburst.mp4).
// CSS fades its edges into the page and blends it with the black behind, so only the light shows.
// Visitors who ask for reduced motion get the still poster image instead.
export default function Sunburst() {
  const video = useRef(null);

  useEffect(() => {
    const v = video.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.muted = true; // browsers only allow autoplay for muted video
    v.play().catch(() => {}); // if the browser still refuses, the poster stays visible
  }, []);

  return (
    <div className="sunburst" aria-hidden="true">
      <video ref={video} muted loop playsInline preload="metadata" poster="/sunburst-poster.jpg" tabIndex={-1}>
        <source src="/sunburst.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
