import Link from "next/link";
import site from "../site.config";
import { getCollection, getProducts, topLevel } from "../lib/ecwid";
import HeroArt from "../components/HeroArt";
import Mist from "../components/Mist";
import Title from "../components/Title";
import Stars from "../components/Stars";
import Icon from "../components/Icon";
import ProductCard from "../components/ProductCard";
import { Highlights, Ritual, Hours, Cta, Flourish, roman, tel } from "../components/Sections";

export default async function Home() {
  const [collection, latest] = await Promise.all([
    getCollection(),
    getProducts({ sort: "ADDED_TIME_DESC", limit: 4 }),
  ]);
  const collections = topLevel(collection);
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`;

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <Mist />
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">{site.slogan}</p>
            {/* Each word of the name sits on its own line so the gold lettering can be set large. */}
            <Title text={site.name} lines={site.name.split(" ")} />
            <p className="lead">{site.tagline}</p>
            <div className="actions">
              <Link className="btn" href="/shop">Explore the collection</Link>
              <Link className="btn ghost" href="/about">The house</Link>
            </div>
            <Stars />
          </div>
          {/* The wrapper leans toward the cursor; the artwork inside it floats gently (see globals.css). */}
          <div className="hero-art-wrap"><HeroArt /></div>
        </div>
        {/* House details along the bottom edge of the hero */}
        {site.address && (
          <div className="wrap">
            <ul className="hero-facts">
              <li><Icon name="pin" /><span><strong>Visit</strong>{site.address}</span></li>
              {site.hours.length > 0 && <li><Icon name="clock" /><span><strong>{site.hours[0][0]}</strong>{site.hours[0][1]}</span></li>}
              <li><Icon name="phone" /><span><strong>Call</strong><a href={tel}>{site.phone}</a></span></li>
            </ul>
          </div>
        )}
      </section>

      {/* Scent notes drifting across a gold-edged divider */}
      {site.notes.length > 0 && (
        <div className="strip" aria-hidden="true">
          {/* The same list twice, side by side. The pair slides left by exactly one list, so the loop is seamless. */}
          <div className="strip-track">
            {[0, 1].map((copy) => (
              <p key={copy}>
                {site.notes.concat(site.notes).map((note, i) => <span key={i}>{note}</span>)}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Collections: the subcategories of the fragrance category in Lightspeed */}
      {collections.length > 0 && (
        <section className="wrap section" aria-labelledby="cat-title">
          <div className="section-head reveal">
            <p className="eyebrow">The collections</p>
            <h2 id="cat-title">Choose your direction</h2>
            <Link href="/shop" className="more-link">View everything <span aria-hidden="true">→</span></Link>
          </div>
          <ul className={`tiles count-${Math.min(collections.length, 4)}`}>
            {collections.map((c, i) => (
              <li key={c.id} className="reveal">
                <Link
                  href={`/shop?category=${c.id}`}
                  className={c.image ? "tile has-image" : "tile"}
                  style={c.image ? { "--photo": `url("${c.image}")` } : undefined}
                >
                  <span className="tile-no" aria-hidden="true">{roman(i)}</span>
                  <span className="tile-name">{c.name}</span>
                  <span className="tile-arrow">Discover <span aria-hidden="true">→</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Newest fragrances */}
      {latest.items.length > 0 && (
        <section className="band" aria-labelledby="new-title">
          <div className="wrap section">
            <div className="section-head reveal">
              <p className="eyebrow">Just arrived</p>
              <h2 id="new-title">The latest additions</h2>
              <Link href="/shop?sort=ADDED_TIME_DESC" className="more-link">See all new arrivals <span aria-hidden="true">→</span></Link>
            </div>
            <div className="grid four">
              {latest.items.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* The house */}
      <section className="wrap section" aria-labelledby="house-title">
        <div className="section-head centered reveal">
          <Flourish />
          <p className="eyebrow">The house</p>
          <h2 id="house-title">Two crafts, one standard</h2>
        </div>
        <Highlights />
      </section>

      {/* The ritual */}
      {site.ritual.length > 0 && (
        <section className="band" aria-labelledby="ritual-title">
          <div className="wrap section">
            <div className="section-head centered reveal">
              <Flourish />
              <p className="eyebrow">The ritual</p>
              <h2 id="ritual-title">How to wear a fragrance</h2>
            </div>
            <Ritual />
          </div>
        </section>
      )}

      {/* Visit */}
      {site.address && (
        <section className="wrap section" aria-labelledby="visit-title">
          <div className="visit reveal">
            <div className="visit-info">
              <p className="eyebrow">In person</p>
              <h2 id="visit-title">Experience the collection</h2>
              <address>
                {site.address}<br />
                <a href={tel}>{site.phone}</a>
              </address>
              <Hours />
              <Link className="btn" href="/find-us">Map and directions</Link>
            </div>
            <iframe className="map" title={`Map showing ${site.name}`} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </section>
      )}

      <Cta />
    </>
  );
}
