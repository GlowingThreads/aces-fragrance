// Who each fragrance is for: men, women or unisex. Drives the "Men" and "Women" filters on the shop page.
// Unisex scents appear under both filters.
//
// How a product's audience is decided, first match wins:
//   1. A product attribute named "For" or "Gender" in Lightspeed (e.g. "Men", "Women", "Unisex", "For him").
//      Use this for new fragrances, so they are filtered correctly without changing any code.
//   2. Its SKU in the list below, which covers the original 136 fragrances.
// A product that matches neither still appears under "All", just not under Men or Women.

export const AUDIENCES = {
  men: { label: "Men", title: "Fragrances for Men" },
  women: { label: "Women", title: "Fragrances for Women" },
};

// Reads the URL value (?for=men) and returns a known audience key, or "".
export const audienceKey = (value) => (typeof value === "string" && value in AUDIENCES ? value : "");

// Keyed by Lightspeed SKU. Based on the fragrance each scent is inspired by.
const BY_SKU = {
  // Men
  Q81017: "men", // Andalusian Orchard Bloom
  Q81015: "men", // Andalusian Orchard Rogue
  Q81016: "men", // Andalusian Orchard Summer
  VL890153B: "men", // Apollo Blue 100ml
  VL890149B: "men", // Bravo Hero 100ml
  VL9052S212: "men", // Dawn Whisper Fragrance Mist 250ml
  VP61047: "men", // Dusk Embrace 100ml
  VL8901115: "men", // Dusk Embrace Elixir 100ml
  VP61048: "men", // Elysian Fields 100ml
  VP61049: "men", // Ethereal Muse 100ml
  VL890189: "men", // Eyad Intense 100ml
  VL9059122: "men", // Eyad Intense Gift Set
  Q81023: "men", // Golden Circlet Ebony
  Q81026: "men", // Golden Circlet Glacier
  Q81022: "men", // Golden Circlet Reign
  VL890197: "men", // Imperial Crest 100ml
  VL9059124: "men", // Imperial Crest Gift Set
  VP61052: "men", // Infinite Spark 100ml
  VL890150B: "men", // Men Hombre de Oro 100ml
  Q81029: "men", // Monolith Echo
  Q81027: "men", // Monolith Layton
  Q81028: "men", // Monolith Pine
  VL890162: "men", // Moonlit Citadel 100ml
  VL8901111: "men", // Moonlit Citadel Blue 100ml
  VL9056308: "men", // Moonlit Citadel Fragrance Mist 250ml
  Q81001: "men", // Mysteries Crown Night
  VP61045: "men", // Neo-Nix 100ml
  VL9059115: "men", // Ocean Gleam Gift Set
  Q81044: "men", // Rust Code
  VP61036: "men", // Sapphire Sky 100ml
  VP61003: "men", // Shadow Leap Aqua 100ml
  Q81008: "men", // Shadow Leap Basilisk 100ml
  VP61005: "men", // Shadow Leap Instinct 100ml
  Q81046: "men", // Shadow Leap Instinct Gold 90ml
  Q81006: "men", // Shadow Leap Instinct Green
  VP61004: "men", // Shadow Leap Power 100ml
  Q81004: "men", // Shadow Leap Savage
  Q81031: "men", // Solar Drift Asalf
  VP62007: "men", // Solar Drift Asalf Eau de Parfum 50ml
  Q81030: "men", // Solar Drift Aseel
  VP61101: "men", // Solar Drift Aseel Eau de Parfum 100ml
  VP61103: "men", // Solar Drift Creed Eau de Parfum 100ml
  VP61102: "men", // Solar Drift Intense Eau de Parfum 100ml
  VP62003: "men", // Solar Drift Victor Eau de Parfum 50ml

  // Women
  VP61032: "women", // Amira Candy 100ml
  VP61037: "women", // Aurora Mist 100ml
  VP61038: "women", // Cloudy Candy 100ml
  VL890171: "women", // Crimson Bloom 100ml
  VL9056317: "women", // Crimson Bloom Fragrance Mist 250ml
  VL8901109: "women", // Deserve Love 100ml
  Q81010: "women", // Elysian Fields Aqua
  Q81011: "women", // Elysian Fields Berry
  VP61002: "women", // Elysian Fields Berry 100ml
  Q81009: "women", // Elysian Fields Blush
  VP61001: "women", // Elysian Fields Blush 100ml
  Q81013: "women", // Elysian Fields Kiss
  Q81012: "women", // Elysian Fields Silk
  VL9056311: "women", // Eternal Rose Fragrance Mist 250ml
  VP61104: "women", // Exotic Breeze Eau de Parfum 100ml
  VP62002: "women", // Exotic Candy Eau de Parfum 50ml
  VL9053N4: "women", // Exotic Charming Vanilla Fragrance Mist 250ml
  VL8901101: "women", // Exotic Fruity Symphony 100ml
  VL9059114: "women", // Exotic Gift Set
  VL9053N2: "women", // Exotic Mist N2 Fragrance Mist 250ml
  VL9053N5: "women", // Exotic Mist N5 Fragrance Mist 250ml
  VL9053N6: "women", // Exotic Mist N6 Fragrance Mist 250ml
  VP61023: "women", // Exotic Poppy 100ml
  VP62005: "women", // Exotic Poppy Eau de Parfum 50ml
  VP61039: "women", // Exotic Purple Rose 100ml
  VP61024: "women", // Exotic Rock 100ml
  Q81043: "women", // Exotic Rock 85ml
  VP61105: "women", // Exotic Rock Eau de Parfum 100ml
  VP62001: "women", // Exotic Rock Eau de Parfum 50ml
  VP61027: "women", // Exotic Rose 100ml
  VL9053N1: "women", // Exotic Royal Bloom Fragrance Mist 250ml
  VP61025: "women", // Exotic Sugary 100ml
  Q81041: "women", // Exotic Sugary 85ml
  Q81042: "women", // Exotic Yummy 85ml
  Q81025: "women", // Golden Circlet Kismet Kiss
  VL890101B: "women", // Golden Dew 100ml
  VL890170B: "women", // Labyrinth Mysteries 100ml
  VL905970: "women", // Lovely Dream Gift Set
  VP61029: "women", // Lunar Whisper 100ml (V.V.LOVE Privé)
  VL890198: "women", // Lunar Whisper 100ml (V.V.LOVE)
  Q81049: "women", // Monika Donna 100ml
  Q81047: "women", // Monika Musk 100ml
  Q81040: "women", // Moonlit Lovers Blush
  Q81038: "women", // Moonlit Lovers Breeze
  Q81037: "women", // Moonlit Lovers Creed
  Q81036: "women", // Moonlit Lovers Petal
  VL890117B: "women", // Party Charming Vanilla 100ml
  VP61031: "women", // Pink Cutie 100ml
  VP61035: "women", // Rose D'Attar 100ml
  VL890102B: "women", // Royal Sweety 100ml
  VL890169: "women", // Silent Longing 100ml
  VL9056315: "women", // Silent Longing Fragrance Mist 250ml
  VP61041: "women", // Stellar Echoes 100ml
  VL8901104: "women", // Stellar Echoes Blanc 100ml
  VL9056313: "women", // Stellar Echoes Fragrance Mist 250ml
  VL890167: "women", // Stellar Echoes Noir 100ml
  VL890105B: "women", // Stunner 100ml
  Q81020: "women", // Velvet Moon Breeze

  // Unisex
  VP61033: "unisex", // Chandelier Rouge 100ml
  VP61034: "unisex", // Cherry Fizz 100ml
  VP61030: "unisex", // Dawn Muse 100ml (V.V.LOVE Privé)
  VL890186: "unisex", // Dawn Muse 100ml (V.V.LOVE)
  VL8901113: "unisex", // Diamond Aqua 100ml
  VL8901112: "unisex", // Diamond Incense 100ml
  Q81014: "unisex", // Elysian Fields Oriental
  VP61042: "unisex", // Ethereal Blue 100ml
  VL9053N3: "unisex", // Exotic Rose Fragrance Mist 250ml
  VP62004: "unisex", // Exotic Sarah Eau de Parfum 50ml
  VP61106: "unisex", // Exotic Sonata Eau de Parfum 100ml
  VP62006: "unisex", // Exotic Sonata Eau de Parfum 50ml
  Q81024: "unisex", // Golden Circlet Patina
  VP61046: "unisex", // Golden Mirage 100ml
  VL9056310: "unisex", // Jalal Al Oud Fragrance Mist 250ml
  VL9056316: "unisex", // Khayal Al Otour Fragrance Mist 250ml
  VL9056314: "unisex", // Love's Pilgrimage Fragrance Mist 250ml
  VP61051: "unisex", // Luminous Melody 100ml
  Q81048: "unisex", // Monika Magic 100ml
  Q81039: "unisex", // Moonlit Lovers Symphony
  Q81003: "unisex", // Mysteries Crown Adventure
  Q81002: "unisex", // Mysteries Crown Sunrise
  VP61043: "unisex", // Royal Diadem 100ml
  Q81045: "unisex", // Rust Code Chill
  VL890175: "unisex", // Sacred Promise 100ml
  VP61044: "unisex", // Serenity Noir 100ml
  Q81005: "unisex", // Shadow Leap Prowl
  Q81007: "unisex", // Shadow Leap Tobacco
  VP62008: "unisex", // Solar Drift Intense Eau de Parfum 50ml
  VP61050: "unisex", // Velvet Embrace Erba 100ml
  VP61028: "unisex", // Velvet Embrace Sublime 100ml
  Q81019: "unisex", // Velvet Moon Dew
  Q81021: "unisex", // Velvet Moon Petal
  Q81018: "unisex", // Velvet Moon Sonata
};

// Turns free text such as "For Him", "Women", "Unisex" or "Men & Women" into "men", "women" or "unisex".
function parse(value) {
  const v = String(value || "").toLowerCase();
  if (!v.trim()) return "";
  if (/unisex|shared|everyone/.test(v)) return "unisex";
  const women = /\b(women|woman|female|feminine|her|ladies|lady|femme)\b/.test(v);
  const men = /\b(men|man|male|masculine|him|gentlemen|homme)\b/.test(v);
  if (men && women) return "unisex";
  return women ? "women" : men ? "men" : "";
}

// Returns "men", "women", "unisex" or "" for a product object from the Ecwid API.
export function audienceOf(p) {
  const attribute = (p.attributes || []).find((a) => /^(for|gender)$/i.test(String(a.name || "").trim()));
  const fromAttribute = parse(attribute?.value);
  if (fromAttribute) return fromAttribute;
  const sku = String(p.sku || "").trim().toUpperCase();
  return BY_SKU[sku] || "";
}

// True when the product belongs under the given filter. Unisex scents belong under both.
export function isFor(p, key) {
  if (!key) return true;
  const audience = audienceOf(p);
  return audience === key || audience === "unisex";
}

// Wording for the "For" line on a product page.
export const audienceLabel = (audience) => ({ men: "Men", women: "Women", unisex: "Unisex" })[audience] || "";
