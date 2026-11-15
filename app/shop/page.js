import Link from "next/link";
import site from "../../site.config";
import { getCollection, getProducts, childrenOf, pathTo, topLevel, SORTS, ecwidReady } from "../../lib/ecwid";
import ProductGrid from "../../components/ProductGrid";
import PageHero from "../../components/PageHero";

export async function generateMetadata({ searchParams }) {
  const { q } = await searchParams;
  return {
    title: "The Collection",
    description: `Shop the ${site.name} collection of signature colognes and luxury perfumes.`,
    alternates: { canonical: "/shop" },
    robots: q ? { index: false } : undefined,
  };
}

export default async function Shop({ searchParams }) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.slice(0, 100) : "";
  const sort = params.sort in SORTS ? params.sort : "";

  const collection = await getCollection();
  const { categories } = collection;
  const path = pathTo(categories, Number(params.category) || 0); // empty when no (or an unknown) collection is chosen
  const active = path.at(-1);
  const { items, total, error } = await getProducts({ categoryId: active?.id, keyword: q, sort });

  // Query string that keeps the current filter, for chip links and for "View more".
  const query = (categoryId) => {
    const qs = new URLSearchParams();
    if (categoryId) qs.set("category", categoryId);
    if (q) qs.set("q", q);
    if (sort) qs.set("sort", sort);
    return qs.toString();
  };
  const href = (categoryId) => `/shop${query(categoryId) ? `?${query(categoryId)}` : ""}`;

  // One row of collection chips, then one row of sub-collections for each level of the chosen path.
  const rows = [{ parent: null, list: topLevel(collection) }];
  for (const c of path) {
    const list = childrenOf(categories, c.id);
    if (list.length) rows.push({ parent: c, list });
  }

  return (
    <>
    <PageHero eyebrow={active ? "The collection" : site.slogan} title={active ? active.name : "The Collection"}>
      {!error && collection.root && <p>{total} {total === 1 ? "fragrance" : "fragrances"}{q ? ` matching "${q}"` : ""}</p>}
    </PageHero>
    <section className="wrap section">

      <form action="/shop" className="search" role="search">
        {active && <input type="hidden" name="category" value={active.id} />}
        <div className="field grow">
          <label htmlFor="q">Search</label>
          <input id="q" type="search" name="q" defaultValue={q} placeholder="Search by name or note" />
        </div>
        <div className="field">
          <label htmlFor="sort">Sort by</label>
          <select id="sort" name="sort" defaultValue={sort}>
            {Object.entries(SORTS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <button className="btn" type="submit">Apply</button>
      </form>

      {rows[0].list.length > 0 && (
        <nav aria-label="Collections" className="chip-rows">
          {rows.map(({ parent, list }) => (
            <div className={parent ? "chips sub" : "chips"} key={parent?.id || 0}>
              <Link
                href={href(parent?.id)}
                className={active?.id === parent?.id ? "chip on" : "chip"}
                aria-current={active?.id === parent?.id ? "true" : undefined}
              >
                {parent ? `All ${parent.name}` : "All"}
              </Link>
              {list.map((c) => {
                const on = path.some((p) => p.id === c.id);
                return (
                  <Link key={c.id} href={href(c.id)} className={on ? "chip on" : "chip"} aria-current={on ? "true" : undefined}>
                    {c.name}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      )}

      {!ecwidReady ? (
        <div className="notice">
          <p>The collection is not connected to Lightspeed yet. Set the store ID and public token to show it.</p>
        </div>
      ) : error || collection.error ? (
        <div className="notice" role="alert">
          <h2>We could not load the collection</h2>
          <p>Our catalog is not responding right now. Please try again in a moment, or call us at {site.phone}.</p>
          <a className="btn small" href={href(active?.id)}>Try again</a>
        </div>
      ) : !collection.root ? (
        <div className="notice">
          <h2>The collection is being prepared</h2>
          <p>Our fragrances will appear here shortly. Please visit again soon.</p>
        </div>
      ) : items.length === 0 ? (
        <div className="notice">
          <p>No fragrances found. Try a different search or collection.</p>
          <Link className="btn small ghost" href="/shop">Clear filters</Link>
        </div>
      ) : (
        // The key resets the grid's "View more" state whenever the filter changes.
        <ProductGrid key={query(active?.id)} initial={items} total={total} query={query(active?.id)} />
      )}
    </section>
    </>
  );
}
