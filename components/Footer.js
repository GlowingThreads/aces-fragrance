import Link from "next/link";
import site from "../site.config";
import { getCollection, topLevel } from "../lib/ecwid";
import { Hours, tel } from "./Sections";
import Emblem from "./Emblem";

export default async function Footer() {
  const collections = topLevel(await getCollection()).slice(0, 6);
  return (
    <footer className="footer">
      <div className="wrap foot">
        <div className="foot-brand">
          <p className="brand"><Emblem size={44} /><span className="brand-name"><span className="metal">{site.name}</span><small>{site.slogan}</small></span></p>
          <p>{site.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <h2>Explore</h2>
          <Link href="/shop">The collection</Link>
          <Link href="/about">The house</Link>
          {site.address && <Link href="/find-us">Find us</Link>}
          {site.storeId && <a href="/account">My account</a>}
        </nav>
        {collections.length > 0 && (
          <nav aria-label="Collections">
            <h2>Collections</h2>
            {collections.map((c) => <Link key={c.id} href={`/shop?category=${c.id}`}>{c.name}</Link>)}
          </nav>
        )}
        <div>
          <h2>{site.address ? "Visit" : "Contact"}</h2>
          <address>
            {site.address && <>{site.address}<br /></>}
            <a href={tel}>{site.phone}</a>
            {site.email && <><br /><a href={`mailto:${site.email}`}>{site.email}</a></>}
          </address>
          {site.address && <Hours />}
        </div>
        <p className="fine">
          <span>{site.slogan}</span>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </p>
      </div>
    </footer>
  );
}
