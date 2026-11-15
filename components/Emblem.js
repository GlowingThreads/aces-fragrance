// The house mark: the polished gold ace of spades. Used in the header, the footer, empty states and the 404 page.
// The pictures are public/spade-mark.webp (small) and public/spade.webp (large): transparent, web-sized
// copies of assets/originals/gold-spade.jpg.
const RATIO = 671 / 640; // height / width of the picture

export default function Emblem({ size = 34 }) {
  const src = size > 90 ? "/spade.webp" : "/spade-mark.webp";
  return <img className="emblem" src={src} alt="" width={Math.round(size / RATIO)} height={size} />;
}
