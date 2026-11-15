// The house mark: a gold ace of spades pip set in a fine double ring. Drawn here in SVG, so it stays
// perfectly sharp at any size. Used in the header, the footer, empty states and the 404 page.
export const PIP =
  "M100 4C106 34 132 62 160 92c24 24 36 42 36 62 0 26-20 44-44 44-16 0-30-5-40-16 2 24 16 44 38 54H50c22-10 36-30 38-54-10 11-24 16-40 16-24 0-44-18-44-44 0-20 12-38 36-62C68 62 94 34 100 4Z";

// `ring={false}` draws the pip alone, for very small sizes.
export default function Emblem({ size = 34, ring = true }) {
  return (
    <svg className="emblem" viewBox="0 0 120 120" width={size} height={size} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="emblem-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbeebf" />
          <stop offset="0.35" stopColor="#d9b56a" />
          <stop offset="0.6" stopColor="#9c7630" />
          <stop offset="1" stopColor="#f0d58e" />
        </linearGradient>
      </defs>
      {ring && (
        <g fill="none" stroke="url(#emblem-gold)">
          <circle cx="60" cy="60" r="57" strokeWidth="2" />
          <circle cx="60" cy="60" r="50.500" strokeWidth="0.800" />
        </g>
      )}
      <path d={PIP} fill="url(#emblem-gold)" transform={ring ? "translate(29 22) scale(0.31)" : "translate(12 2) scale(0.48)"} />
    </svg>
  );
}
