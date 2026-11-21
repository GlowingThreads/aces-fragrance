# Aces Fragrance

Signature Colognes & Luxury Perfumes. A Next.js storefront that sells from one category of the shared
Lightspeed eCom (Ecwid) account.

## Setup

1. Copy `.env.example` to `.env.local` (or set the same variables on your host) and fill in the store ID and
   public token. They are the same values the main store uses.
2. `npm install`, then `npm run dev`.

## Hosting (Netlify)

The live site is the Netlify project `acesfragrance`. Its three settings live under
Project configuration → Environment variables: `NEXT_PUBLIC_ECWID_STORE_ID`, `ECWID_PUBLIC_TOKEN` and
`NEXT_PUBLIC_SITE_URL`. They are read when the site is built, so after changing one, trigger a new deploy
(Deploys → Trigger deploy) for it to take effect.

## Adding fragrances (in Lightspeed)

1. The site sells from the category named **Ace's Fragrance** (set in `site.config.js`; capitals and
   apostrophes are ignored). To use a different one, change it there or set `ECWID_FRAGRANCE_CATEGORY`.
2. Optionally add subcategories inside it, such as **Colognes** and **Perfumes**. They become the collections
   on the site, and a photo on a subcategory becomes its tile picture.
3. Create one product per scent and assign it to that category or one of its subcategories.
   Nothing outside the category is ever shown, searched or opened on this site.
4. Optional, for the "composition" section on a product page, add product attributes named
   `Top Notes`, `Heart Notes`, `Base Notes` (comma-separated), and any of `Concentration`, `Scent Family`,
   `Size`, `For`, `Longevity`, `Sillage`, `Season`.

## Men and Women filters

The shop page has **Everyone / Men / Women** filters (`/shop?for=men`, `/shop?for=women`). Unisex scents show
under both. Each fragrance's audience comes from, in order:

1. A product attribute named `For` or `Gender` in Lightspeed (values like `Men`, `Women`, `Unisex`, `For him`).
   Set this on any new fragrance and it is filtered correctly with no code change.
2. Its SKU in `lib/audience.js`, which lists the original 136 fragrances.

A fragrance with neither still shows under Everyone. The same value fills the "For" line on its product page.

Wording, contact details and hours live in `site.config.js`.
