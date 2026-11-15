import Link from "next/link";
import site from "../../site.config";
import PageHero from "../../components/PageHero";
import { Highlights, Ritual, Hours, Cta, Flourish, tel } from "../../components/Sections";

export const metadata = {
  title: "The House",
  description: `The story of ${site.name}, a house of signature colognes and luxury perfumes in ${site.city}.`,
};

export default function About() {
  const [opening, ...rest] = site.about;
  return (
    <>
      <PageHero eyebrow={site.city} title="The House">
        <p>{site.slogan}</p>
      </PageHero>

      <section className="wrap section split">
        <div className="prose">
          {opening && <p className="lead">{opening}</p>}
          {rest.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <aside className="panel" aria-labelledby="about-contact">
          <h2 id="about-contact">{site.address ? "Visit us" : "Speak with us"}</h2>
          <address>
            {site.address && <>{site.address}<br /></>}
            <a href={tel}>{site.phone}</a>
            {site.email && <><br /><a href={`mailto:${site.email}`}>{site.email}</a></>}
          </address>
          {site.address && <Hours />}
          {site.address && <p><Link className="btn small ghost" href="/find-us">Map and directions</Link></p>}
        </aside>
      </section>

      {site.photos.length > 0 && (
        <section className="wrap section" aria-labelledby="inside-title">
          <div className="section-head reveal">
            <p className="eyebrow">A closer look</p>
            <h2 id="inside-title">Inside the house</h2>
          </div>
          <div className="photos">
            {site.photos.map((src, i) => <img key={src} src={src} alt={`${site.name}, photo ${i + 1}`} loading="lazy" />)}
          </div>
        </section>
      )}

      <section className="wrap section" aria-labelledby="house-title">
        <div className="section-head centered reveal">
          <Flourish />
          <p className="eyebrow">What we offer</p>
          <h2 id="house-title">Two crafts, one standard</h2>
        </div>
        <Highlights />
      </section>

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

      <Cta secondary={site.address ? ["/find-us", "Find us"] : ["/", "Home"]} />
    </>
  );
}
