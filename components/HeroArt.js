// Hero artwork: the house flacon, a clear glass bottle carrying the gold ace of spades, standing in front
// of an Art Deco sunburst. The bottle is public/flacon.webp (a transparent, web-sized copy of
// assets/originals/gold-spade-flacon.jpg). The glow, the sunburst and the floor shadow are drawn here in SVG.
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
        <radialGradient id="art-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#d9b56a" stopOpacity="0.42" />
          <stop offset="0.55" stopColor="#5a3418" stopOpacity="0.3" />
          <stop offset="1" stopColor="#3b2416" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="art-fade" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.25" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="art-floor" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.85" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
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

      {/* Shadow on the floor, then the bottle itself */}
      <ellipse cx="210" cy="508" rx="130" ry="12" fill="url(#art-floor)" />
      <image href="/flacon.webp" x="71" y="42" width="278" height="468" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
}
