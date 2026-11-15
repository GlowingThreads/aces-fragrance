"use client";
import { useEffect, useRef } from "react";

// Gold dust in the hero: a few dozen tiny motes that drift slowly upward and glimmer, drawn on a canvas
// behind the text. More of them gather on the right, around the bottle. It only runs while the hero is
// on screen, and not at all for visitors who ask for reduced motion.
export default function Dust() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0, height = 0, frame = 0, visible = true, last = 0, motes = [];
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    // One mote. `fresh` starts it just below the bottom edge; otherwise anywhere on screen.
    function mote(fresh) {
      const nearBottle = Math.random() < 0.55;
      return {
        x: (nearBottle ? 0.5 + Math.random() * 0.5 : Math.random()) * width,
        y: fresh ? height + 8 : Math.random() * height,
        size: 0.5 + Math.random() * 1.5,
        rise: 5 + Math.random() * 13,           // pixels per second, upward
        sway: 8 + Math.random() * 16,           // how far it wanders side to side
        phase: Math.random() * Math.PI * 2,
        pace: 0.2 + Math.random() * 0.5,
        glow: 0.25 + Math.random() * 0.6,
      };
    }

    function resize() {
      const box = canvas.getBoundingClientRect();
      width = box.width; height = box.height;
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      motes = Array.from({ length: Math.round(Math.min(70, Math.max(22, width / 20))) }, () => mote(false));
    }

    function tick(now) {
      frame = requestAnimationFrame(tick);
      if (!visible) return void (last = now);
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.y -= m.rise * dt;
        m.phase += m.pace * dt;
        if (m.y < -8) { motes[i] = mote(true); continue; }
        const x = m.x + Math.sin(m.phase) * m.sway;
        // Each mote glimmers, and fades in and out near the bottom and top edges.
        const edge = Math.min(1, m.y / (height * 0.2), (height - m.y) / (height * 0.15));
        const alpha = Math.max(0, m.glow * (0.6 + 0.4 * Math.sin(m.phase * 3.1)) * edge);
        const halo = ctx.createRadialGradient(x, m.y, 0, x, m.y, m.size * 4);
        halo.addColorStop(0, `rgba(255, 240, 196, ${alpha})`);
        halo.addColorStop(0.3, `rgba(226, 190, 112, ${alpha * 0.5})`);
        halo.addColorStop(1, "rgba(201, 164, 92, 0)");
        ctx.fillStyle = halo;
        ctx.beginPath(); ctx.arc(x, m.y, m.size * 4, 0, Math.PI * 2); ctx.fill();
      }
    }

    resize();
    const onResize = new ResizeObserver(resize);
    const onScreen = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    onResize.observe(canvas); onScreen.observe(canvas);
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); onResize.disconnect(); onScreen.disconnect(); };
  }, []);

  return <canvas ref={ref} className="dust" aria-hidden="true" />;
}
