import Link from "next/link";
import Emblem from "../components/Emblem";

export default function NotFound() {
  return (
    <section className="wrap lost">
      <Emblem size={150} />
      <p className="eyebrow">Error 404</p>
      <h1 className="metal">This page has faded</h1>
      <p>The page does not exist, or the fragrance is no longer part of the collection.</p>
      <div className="actions">
        <Link className="btn" href="/shop">Explore the collection</Link>
        <Link className="btn ghost" href="/">Home</Link>
      </div>
    </section>
  );
}
