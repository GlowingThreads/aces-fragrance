import { PIP } from "./Emblem";

// Hero artwork: a gold-capped flacon standing in front of an Art Deco sunburst, drawn entirely in SVG.
// The glass holds a deep amber-brown perfume; the label carries the house's ace of spades.
const RAYS = Array.from({ length: 36 }, (_, i) => i * 10);

export default function HeroArt() {
  return (
    <svg className="hero-art" viewBox="0 0 420 540" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="art-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fdf1c7" />
          <stop offset="0.3" stopColor="#dcb96c" />
          <stop offset="0.55" stopColor="#8f6a28" />
          <stop offset="0.8" stopColor="#e3c47c" />
          <stop offset="1" stopColor="#a8823a" />
        </linearGradient>
        <linearGradient id="art-cap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7d5b20" />
          <stop offset="0.22" stopColor="#f7e3a6" />
          <stop offset="0.45" stopColor="#b98f43" />
          <stop offset="0.7" stopColor="#f0d58e" />
          <stop offset="1" stopColor="#6e4f1b" />
        </linearGradient>
        <linearGradient id="art-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.03" />
          <stop offset="1" stopColor="#d9b56a" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id="art-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c8923c" stopOpacity="0.85" />
          <stop offset="0.5" stopColor="#6b3d16" stopOpacity="0.92" />
          <stop offset="1" stopColor="#24130a" stopOpacity="0.96" />
        </linearGradient>
        <radialGradient id="art-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#d9b56a" stopOpacity="0.5" />
          <stop offset="0.55" stopColor="#5a3418" stopOpacity="0.28" />
          <stop offset="1" stopColor="#3b2416" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="art-fade" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.25" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="art-rays"><rect width="420" height="540" fill="url(#art-fade)" /></mask>
      </defs>

      <ellipse cx="210" cy="290" rx="210" ry="240" fill="url(#art-glow)" />

      {/* Sunburst: fine rays and two rings, turning very slowly behind the bottle */}
      <g mask="url(#art-rays)">
        <g className="hero-rays" stroke="#d9b56a" strokeWidth="0.700" opacity="0.55">
          {RAYS.map((angle) => <line key={angle} x1="210" y1="290" x2="210" y2="20" transform={`rotate(${angle} 210 290)`} />)}
        </g>
      </g>
      <g fill="none" stroke="url(#art-gold)">
        <circle cx="210" cy="290" r="196" strokeWidth="0.800" opacity="0.5" />
        <circle cx="210" cy="290" r="188" strokeWidth="0.400" opacity="0.5" />
      </g>

      {/* Shadow on the floor */}
      <ellipse cx="210" cy="497" rx="118" ry="9" fill="#000" opacity="0.7" />

      {/* Stopper: a faceted gold cap on a collar */}
      <path d="M176 96 L190 74 H230 L244 96 V150 H176 Z" fill="url(#art-cap)" stroke="#fdf1c7" strokeOpacity="0.5" strokeWidth="0.800" />
      <path d="M190 74 L196 96 V150 M230 74 L224 96 V150 M176 96 H244" fill="none" stroke="#3b2416" strokeOpacity="0.55" strokeWidth="0.800" />
      <rect x="182" y="150" width="56" height="22" fill="url(#art-cap)" />
      <rect x="170" y="170" width="80" height="12" rx="2" fill="url(#art-cap)" stroke="#fdf1c7" strokeOpacity="0.4" strokeWidth="0.600" />

      {/* Bottle: heavy glass shoulders, the perfume inside, then reflections */}
      <path d="M150 182 H270 L310 214 V470 a16 16 0 0 1 -16 16 H126 a16 16 0 0 1 -16 -16 V214 Z" fill="#0b0705" />
      <path d="M124 262 H296 V464 a8 8 0 0 1 -8 8 H132 a8 8 0 0 1 -8 -8 Z" fill="url(#art-liquid)" />
      <path d="M150 182 H270 L310 214 V470 a16 16 0 0 1 -16 16 H126 a16 16 0 0 1 -16 -16 V214 Z" fill="url(#art-glass)" stroke="url(#art-gold)" strokeWidth="1.400" />
      <path d="M124 262 H296" stroke="#f7e3a6" strokeOpacity="0.55" strokeWidth="0.800" />
      <path d="M128 226 V456" stroke="#fff" strokeOpacity="0.28" strokeWidth="5" strokeLinecap="round" />
      <path d="M140 232 V330" stroke="#fff" strokeOpacity="0.12" strokeWidth="2" strokeLinecap="round" />
      <path d="M292 230 V450" stroke="#f7e3a6" strokeOpacity="0.16" strokeWidth="2" strokeLinecap="round" />

      {/* Label: a double gold frame with the ace of spades and the house name */}
      <g>
        <rect x="158" y="292" width="104" height="132" fill="#0b0705" fillOpacity="0.82" stroke="url(#art-gold)" strokeWidth="1.200" />
        <rect x="164" y="298" width="92" height="120" fill="none" stroke="url(#art-gold)" strokeWidth="0.500" />
        <path d={PIP} fill="url(#art-gold)" transform="translate(190 312) scale(0.2)" />
        <text x="210" y="388" textAnchor="middle" fill="url(#art-gold)" style={{ fontFamily: "var(--font-display), serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.3em" }}>ACES</text>
        <text x="210" y="405" textAnchor="middle" fill="#d9b56a" style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 6.5, letterSpacing: "0.42em" }}>FRAGRANCE</text>
      </g>
    </svg>
  );
}
