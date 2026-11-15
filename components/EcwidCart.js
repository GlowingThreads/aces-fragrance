"use client";
import { useEffect } from "react";
import { STORE_DIV, whenEcwidReady } from "./EcwidScript";

// Hosts Lightspeed's own storefront widget and opens it on one of its pages:
// "cart" (which leads into the secure checkout) or "account/settings" (sign in, orders, addresses).
//
// The widget belongs to the whole Lightspeed account, so left alone it could also browse that account's
// full catalog (for example through a "Continue shopping" link). This site only sells fragrance, so the
// widget's own catalog pages are never shown: they are swapped for this site's collection page instead.
const CATALOG_PAGES = ["CATEGORY", "PRODUCT", "SEARCH", "FAVORITES"];

export default function EcwidCart({ page = "cart" }) {
  useEffect(() => {
    // If the script loaded before this page was shown (browser back/forward), start the widget now.
    if (window.xProductBrowser && !document.getElementById(STORE_DIV)?.hasChildNodes()) {
      window.xProductBrowser(`id=${STORE_DIV}`);
    }
    let active = true;
    let arrived = false; // true once the cart or account screen has been shown
    let retries = 0;
    const cancel = whenEcwidReady((Ecwid) => {
      Ecwid.OnPageLoaded.add((loaded) => {
        if (!active) return;
        if (!CATALOG_PAGES.includes(loaded?.type)) return void (arrived = true);
        // A catalog page. Before the cart has appeared this is only the widget's starting page, so ask
        // again for the page we want. Afterwards it means the visitor chose to keep shopping.
        if (!arrived && retries++ < 3) Ecwid.openPage(page);
        else window.location.assign("/shop");
      });
      Ecwid.openPage(page);
    });
    return () => { active = false; cancel(); };
  }, [page]);
  return <div id={STORE_DIV} className="ecwid-host" />;
}
