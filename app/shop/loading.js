import { SkeletonCard } from "../../components/ProductCard";
import PageHero from "../../components/PageHero";

// Shown while the collection or a product page is waiting for Ecwid.
export default function Loading() {
  return (
    <div aria-busy="true">
      <PageHero eyebrow="One moment" title="The Collection" />
      <section className="wrap section">
        <p className="sr-only" role="status">Loading the collection</p>
        <div className="grid">
          {Array.from({ length: 8 }, (_, i) => <SkeletonCard key={i} />)}
        </div>
      </section>
    </div>
  );
}
