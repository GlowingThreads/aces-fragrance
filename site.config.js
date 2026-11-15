// Edit the values below. Everything on the site reads from this file.
const site = {
  name: "Aces Fragrance",
  slogan: "Signature Colognes & Luxury Perfumes",

  /* ---------- Lightspeed eCom (Ecwid) ---------- */
  // The same Lightspeed account as the main store: use the same store ID and public token.
  storeId: process.env.NEXT_PUBLIC_ECWID_STORE_ID || "",
  publicToken: process.env.ECWID_PUBLIC_TOKEN || "",
  // Host of the storefront script, taken from the "custom code" snippet in your Lightspeed admin.
  scriptHost: "app.business.shop",
  // The ONE Lightspeed category this site sells from. Only products inside it (or inside its subcategories)
  // are ever shown, searched or opened here; the rest of the account's catalog stays invisible.
  // Use the category's numeric ID (it keeps working if the category is renamed) or its exact name.
  // 209402405 is the "Ace's Fragrance" category in the Lightspeed admin.
  // Its subcategories (for example "Colognes" and "Perfumes") become the collections on this site.
  collection: process.env.ECWID_FRAGRANCE_CATEGORY || "209402405",

  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000", // your live domain, e.g. https://acesfragrance.ca
  currency: "CAD",

  /* ---------- Contact details ---------- */
  city: "Edmonton, Alberta",
  // Leave `address` empty ("") to run as an online-only boutique: the map, the Find Us page and the
  // "visit" sections then disappear on their own.
  address: "8927 Whyte Ave NW, Edmonton, AB T6C 0W8", // also drives the map
  phone: "(780) 757-3420",
  email: "", // shown in the footer and on Find Us once filled in
  // Opening hours, one line each, e.g. ["Monday to Thursday", "10am to 9pm"].
  hours: [["Every day", "9:30am to 11pm"]],
  // The same hours in the short form search engines read (days, then 24-hour times). Keep in step with the list above.
  hoursForSearch: "Mo-Su 09:30-23:00",
  // Optional: a Google Business Profile for Aces Fragrance, with its rating. While `rating` is 0 no stars are shown.
  googleUrl: "",
  google: { rating: 0, reviews: 0 },

  /* ---------- Words on the site ---------- */
  // A slim line across the very top of every page, e.g. "Complimentary shipping on orders over $150". Empty hides it.
  announcement: "",
  // Home page: the line under the name.
  tagline: "A private collection of signature colognes and luxury perfumes, each chosen for its character, its depth and the impression it leaves behind.",
  // Home page: the three pillars under "The house". `icon` names the picture: public/icon-<icon>.webp.
  highlights: [
    { icon: "cologne", title: "Signature Colognes", text: "Confident, composed scents with presence: fresh citrus openings, warm woods and deep amber finishes." },
    { icon: "perfume", title: "Luxury Perfumes", text: "Rich, layered perfumes built around florals, musks and rare resins that unfold slowly through the day." },
    { icon: "signature", title: "Your Signature", text: "Every scent is offered on its own, so you can choose precisely the one that becomes unmistakably yours." },
  ],
  // Home page: "The ritual", three short steps on wearing fragrance well.
  ritual: [
    { title: "Apply to warmth", text: "Wrists, neck and behind the ears. Warm skin carries a fragrance further and lets it open naturally." },
    { title: "Let it settle", text: "Never rub. Allow the scent to dry on its own, so the top notes give way to the heart as intended." },
    { title: "Wear it as yours", text: "A signature is worn lightly and often. Two or three sprays are enough to be remembered." },
  ],
  // Scent notes that drift across the gold divider on the home page.
  notes: ["Bergamot", "Oud", "Amber", "Jasmine", "Sandalwood", "Vetiver", "Rose", "Vanilla", "Cedar", "Musk", "Saffron", "Tonka"],
  // About page: one paragraph per entry.
  about: [
    "Aces Fragrance is a house devoted to two things only: signature colognes and luxury perfumes. Nothing else shares the shelf.",
    "Our collection is deliberately small. Each fragrance is selected for the quality of its composition, the way it wears on skin and how long it stays with you. Every scent stands as its own piece, so what you choose is exactly what arrives.",
    "Whether you are looking for the one fragrance you will wear for years or a considered gift, we are glad to help you find it.",
  ],
  // Photos for the About page, e.g. ["/house/counter.jpg"]. Put the files in public/house/ and list them here.
  photos: [],
};
export default site;
