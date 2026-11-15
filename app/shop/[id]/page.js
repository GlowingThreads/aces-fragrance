import Link from "next/link";
import { notFound } from "next/navigation";
import site from "../../../site.config";
import { getProduct, getRelated, getCollection, pathTo, productImages, scentProfile } from "../../../lib/ecwid";
import ProductBuy from "../../../components/ProductBuy";
import ProductCard from "../../../components/ProductCard";
import Gallery from "../../../components/Gallery";
import Notes from "../../../components/Notes";
import Icon from "../../../components/Icon";
import Title from "../../../components/Title";
import { tel } from "../../../components/Sections";

const plain = (html) => (html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = await getProduct(id);
  if (!p) return { title: "Fragrance not found" };
  const images = productImages(p);
  const description = plain(p.description) || `${p.name}, from ${site.name}.`;
  return {
    title: p.name,
    description,
    alternates: { canonical: `/shop/${id}` },
    // A product with a photo is shared with that photo; one without falls back to the site's share picture.
    openGraph: { title: p.name, description, type: "website", images: images.length ? images.slice(0, 1) : ["/opengraph-image.jpg"] },
  };
}

export default async function Product({ params }) {
  const { id } = await params;
  const p = await getProduct(id); // null for anything outside the fragrance category
  if (!p) notFound();

  const [related, collection] = await Promise.all([getRelated(p), getCollection()]);
  // The collection this fragrance belongs to, e.g. [Colognes, Woody].
  const home = [p.defaultCategoryId, ...(p.categoryIds || [])].find((c) => collection.categories.some((k) => k.id === c));
  const trail = pathTo(collection.categories, home || 0);
  const images = productImages(p);
  const price = p.defaultDisplayedPrice ?? p.price ?? 0;

  // Only what the buying panel needs is sent to the browser.
  const buy = {
    id: p.id,
    name: p.name,
    inStock: p.inStock !== false,
    price,
    priceFormatted: p.defaultDisplayedPriceFormatted || "",
    options: (p.options || []).map((o) => ({
      type: o.type,
      name: o.name,
      required: Boolean(o.required),
      defaultChoice: o.defaultChoice,
      choices: (o.choices || []).map((c) => ({ text: c.text, priceModifier: c.priceModifier || 0, priceModifierType: c.priceModifierType })),
    })),
    combinations: (p.combinations || []).map((c) => ({
      options: (c.options || []).map((o) => ({ name: o.name, value: o.value })),
      inStock: c.inStock,
      price: c.defaultDisplayedPrice ?? c.price,
    })),
  };

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: p.sku,
    image: images,
    description: plain(p.description),
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      url: `${site.url}/shop/${p.id}`,
      price,
      priceCurrency: site.currency,
      availability: p.inStock === false ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
    },
  };

  return (
    <div className="wrap section product">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <nav aria-label="Breadcrumb" className="crumbs">
        <Link href="/shop">The collection</Link>
        {trail.map((c) => (
          <Link key={c.id} href={`/shop?category=${c.id}`}>{c.name}</Link>
        ))}
        <span aria-current="page">{p.name}</span>
      </nav>

      <div className="detail">
        <Gallery images={images} alt={p.name} />
        <div>
          <p className="eyebrow">{trail.length > 0 ? trail.at(-1).name : site.name}</p>
          {/* Product names can be long, so they use the plain heading style, not the 3D lettering. */}
          <Title text={p.name} gold={false} />
          <ProductBuy product={buy} currency={site.currency} />
          <ul className="assure">
            {site.address && <li><Icon name="pin" /><span>Also available in person at {site.address}</span></li>}
            <li><Icon name="phone" /><span>Questions about this scent? Call <a href={tel}>{site.phone}</a></span></li>
          </ul>
          <Notes profile={scentProfile(p)} />
          {/* Description HTML comes from your own Lightspeed admin, so it is trusted content. */}
          {p.description && (
            <section className="desc" aria-labelledby="details-title">
              <h2 id="details-title">The story</h2>
              <div dangerouslySetInnerHTML={{ __html: p.description }} />
            </section>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="related" aria-labelledby="related-title">
          <div className="section-head">
            <p className="eyebrow">Continue exploring</p>
            <h2 id="related-title">You may also admire</h2>
          </div>
          <div className="grid four">
            {related.map((r) => <ProductCard key={r.id} product={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
