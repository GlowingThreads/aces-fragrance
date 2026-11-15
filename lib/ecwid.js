// Server-side access to the Lightspeed eCom (Ecwid) REST API.
// Only the PUBLIC (read-only) token is used, and it is sent in a header so it never appears in URLs or logs.
//
// This site shares its Lightspeed account with another store, so every read here is fenced to ONE category
// (site.collection) and its subcategories. Nothing outside that category can be listed, searched or opened.
import { cache } from "react";
import site from "../site.config";

export const ecwidReady = Boolean(site.storeId && site.publicToken);
export const PAGE_SIZE = 48; // products per "Load more" step
const MAX_LIMIT = 100; // Ecwid's maximum page size

export const SORTS = {
  "": "Featured",
  ADDED_TIME_DESC: "Newest",
  PRICE_ASC: "Price, low to high",
  PRICE_DESC: "Price, high to low",
  NAME_ASC: "Name, A to Z",
};

async function call(path, params = {}) {
  const qs = new URLSearchParams(params);
  const res = await fetch(`https://app.ecwid.com/api/v3/${site.storeId}${path}?${qs}`, {
    headers: { Authorization: `Bearer ${site.publicToken}` },
    next: { revalidate: 300 }, // cache for 5 minutes
  });
  if (!res.ok) {
    const error = new Error(`Ecwid ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return res.json();
}

// Follows Ecwid's offset paging until every item has been read.
async function callAll(path, params = {}) {
  const items = [];
  for (let page = 0; page < 50; page++) {
    const data = await call(path, { ...params, limit: String(MAX_LIMIT), offset: String(items.length) });
    items.push(...(data.items || []));
    if (!data.items?.length || items.length >= (data.total || 0)) break;
  }
  return items;
}

/* ---------- The fragrance collection ---------- */

export const childrenOf = (categories, parentId) => categories.filter((c) => c.parentId === parentId);

// The chosen category followed by all of its subcategories, at any depth.
export function withDescendants(categories, id) {
  const ids = [id];
  for (let i = 0; i < ids.length; i++) ids.push(...childrenOf(categories, ids[i]).map((c) => c.id));
  return ids;
}

// Finds the Lightspeed category named in site.config.js and everything beneath it. Returns:
//   root        the category itself ({ id, name }), or null when it does not exist yet
//   ids         its ID and the IDs of all its subcategories: the only categories this site may read
//   categories  the subcategories, at any depth. The top-level ones have parentId === root.id
//   error       true when Lightspeed could not be reached
// `cache` makes every part of one page share a single lookup.
export const getCollection = cache(async () => {
  const none = { root: null, ids: [], categories: [], error: false };
  if (!ecwidReady) return none; // store not connected yet
  try {
    const all = (await callAll("/categories"))
      .filter((c) => c.enabled !== false)
      .sort((a, b) => (a.orderBy || 0) - (b.orderBy || 0))
      .map((c) => ({ id: c.id, parentId: c.parentId || 0, name: c.name || "", image: c.thumbnailUrl || "" }));
    const wanted = String(site.collection || "").trim();
    const root = /^\d+$/.test(wanted)
      ? all.find((c) => c.id === Number(wanted))
      : all.find((c) => c.name.trim().toLowerCase() === wanted.toLowerCase());
    if (!root) return none;
    const ids = withDescendants(all, root.id);
    return { root, ids, categories: all.filter((c) => c.id !== root.id && ids.includes(c.id)), error: false };
  } catch {
    return { ...none, error: true };
  }
});

// The collections shown as tiles and filter chips: the subcategories directly under the fragrance category.
export const topLevel = (collection) => (collection.root ? childrenOf(collection.categories, collection.root.id) : []);

// Path from a top-level collection down to the chosen one, e.g. [Colognes, Woody]. Empty for an unknown ID.
export function pathTo(categories, id) {
  const path = [];
  let current = categories.find((c) => c.id === id);
  while (current && path.length < 10) {
    path.unshift(current);
    current = categories.find((c) => c.id === current.parentId);
  }
  return path;
}

// True when a product from the API sits somewhere inside the fragrance category.
const inCollection = (p, ids) => [p.defaultCategoryId, ...(p.categoryIds || [])].some((id) => ids.includes(id));

/* ---------- Products ---------- */

// Only the fields a product card needs, so little data is sent to the browser.
function toCard(p) {
  return {
    id: p.id,
    name: p.name,
    price: p.defaultDisplayedPriceFormatted || "",
    image: p.hdThumbnailUrl || p.thumbnailUrl || p.imageUrl || "", // already sized by Ecwid, never cropped
    inStock: p.inStock !== false,
    hasOptions: (p.options || []).length > 0,
  };
}

// Returns { items, total, error }. `error` is true when Ecwid could not be reached,
// so pages can tell "the API failed" apart from "nothing matched".
// `categoryId` narrows the list to one collection; anything outside the fragrance category is ignored.
export async function getProducts({ categoryId, keyword, sort, offset = 0, limit = PAGE_SIZE } = {}) {
  const collection = await getCollection();
  if (collection.error) return { items: [], total: 0, error: true };
  if (!collection.root) return { items: [], total: 0, error: false }; // not connected, or the category is not created yet
  try {
    const inside = categoryId && categoryId !== collection.root.id && collection.ids.includes(categoryId);
    // `categories` takes a comma-separated list, so a collection also shows its subcategories' products.
    const categoryIds = inside ? withDescendants(collection.categories, categoryId) : collection.ids;
    const params = {
      enabled: "true",
      categories: categoryIds.join(","),
      offset: String(offset),
      limit: String(Math.min(limit, MAX_LIMIT)),
    };
    if (keyword) params.keyword = keyword;
    if (sort && sort in SORTS) params.sortBy = sort;
    const data = await call("/products", params);
    return { items: (data.items || []).map(toCard), total: data.total || 0, error: false };
  } catch {
    return { items: [], total: 0, error: true };
  }
}

// Every fragrance product ID, for the sitemap.
export async function getAllProductIds() {
  const { root, ids } = await getCollection();
  if (!root) return [];
  try {
    return (await callAll("/products", { enabled: "true", categories: ids.join(","), responseFields: "total,items(id)" })).map((p) => p.id);
  } catch {
    return [];
  }
}

// Returns the product, or null when it does not exist or is not part of the fragrance category.
// Other failures throw and are caught by app/shop/error.js.
export const getProduct = cache(async (id) => {
  if (!/^\d+$/.test(String(id))) return null;
  const { root, ids, error } = await getCollection();
  if (error) throw new Error("Ecwid unavailable");
  if (!root) return null;
  try {
    const p = await call(`/products/${id}`);
    return p.enabled === false || !inCollection(p, ids) ? null : p;
  } catch (error) {
    if (error.status === 404) return null;
    throw error;
  }
});

// Related products: the ones picked in the Lightspeed admin first, then others from the same collection.
// Products from outside the fragrance category are never included, even if they were picked in the admin.
export async function getRelated(p, limit = 4) {
  const { root, ids } = await getCollection();
  if (!root) return [];
  try {
    const found = [];
    const add = (items) => {
      for (const item of items || []) {
        if (item.id !== p.id && inCollection(item, ids) && !found.some((f) => f.id === item.id) && found.length < limit) found.push(toCard(item));
      }
    };
    const picked = p.relatedProducts?.productIds || [];
    if (picked.length) {
      add((await call("/products", { enabled: "true", productId: picked.slice(0, 20).join(",") })).items);
    }
    const related = p.relatedProducts?.relatedCategory;
    const wanted = [(related?.enabled && related.categoryId) || 0, p.defaultCategoryId, ...(p.categoryIds || []), root.id];
    const categoryId = wanted.find((id) => ids.includes(id));
    if (found.length < limit && categoryId) {
      add((await call("/products", { enabled: "true", categories: String(categoryId), limit: String(limit + 1) })).items);
    }
    return found;
  } catch {
    return []; // related products are optional
  }
}

export function productImages(p) {
  const images = (p.media?.images || []).map((i) => i.image800pxUrl || i.imageOriginalUrl).filter(Boolean);
  if (!images.length && p.imageUrl) images.push(p.imageUrl);
  return images;
}

/* ---------- Fragrance details ---------- */

// Reads the scent details from a product's attributes in Lightspeed. Attribute names are matched loosely
// (any capitalisation), so "Top Notes", "top notes" and "Top" all work. Returns:
//   notes  [{ tier: "Top" | "Heart" | "Base", list: ["Bergamot", "Pink pepper"] }]  (the scent pyramid)
//   facts  [{ label: "Concentration", value: "Eau de Parfum" }]                        (short facts)
const NOTE_TIERS = [["Top", /^(top|head|opening)( notes?)?$/], ["Heart", /^(heart|middle|mid)( notes?)?$/], ["Base", /^(base|dry ?down)( notes?)?$/]];
const FACTS = [
  ["Concentration", /^(concentration|strength|type)$/],
  ["Scent family", /^(scent |fragrance |olfactory )?family$/],
  ["Size", /^(size|volume)$/],
  ["For", /^(for|gender)$/],
  ["Longevity", /^(longevity|lasting)$/],
  ["Sillage", /^(sillage|projection)$/],
  ["Season", /^(season|best for)$/],
];

export function scentProfile(p) {
  const attributes = (p.attributes || [])
    .map((a) => ({ name: String(a.name || "").trim().toLowerCase(), value: String(a.value || "").trim() }))
    .filter((a) => a.name && a.value);
  const valueOf = (pattern) => attributes.find((a) => pattern.test(a.name))?.value || "";
  const notes = NOTE_TIERS
    .map(([tier, pattern]) => ({ tier, list: valueOf(pattern).split(/[,;\n]+/).map((n) => n.trim()).filter(Boolean) }))
    .filter((n) => n.list.length);
  const facts = FACTS.map(([label, pattern]) => ({ label, value: valueOf(pattern) })).filter((f) => f.value);
  return { notes, facts };
}
