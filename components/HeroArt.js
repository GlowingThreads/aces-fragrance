import Sunburst from "./Sunburst";

// Hero artwork: the house flacon, a clear glass bottle carrying the gold ace of spades, standing in front
// of a burst of gold light. The bottle is public/flacon.webp (a transparent, web-sized copy of
// assets/originals/gold-spade-flacon.jpg) and the light is a looping video (see components/Sunburst.js).
// Only the soft shadow on the floor is drawn here.
export default function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <Sunburst />
      <svg className="hero-bottle" viewBox="0 0 420 540" focusable="false">
        <defs>
          <radialGradient id="art-floor" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#000" stopOpacity="0.85" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="210" cy="508" rx="130" ry="12" fill="url(#art-floor)" />
        <image href="/flacon.webp" x="71" y="42" width="278" height="468" preserveAspectRatio="xMidYMid meet" />
      </svg>
    </div>
  );
}
