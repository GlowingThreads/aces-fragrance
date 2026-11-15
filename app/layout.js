import "./globals.css";
import { preload } from "react-dom";
import { Cinzel, Cormorant_Garamond, Jost } from "next/font/google";
import site from "../site.config";
import { ecwidScript } from "../lib/inline";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EcwidScript from "../components/EcwidScript";
import Effects from "../components/Effects";
import Toaster from "../components/Toaster";

// Cinzel: engraved Roman capitals for the name and page titles. Cormorant Garamond: a fine serif for
// headings and italic accents. Jost: a clean, quiet sans-serif for everything else.
const display = Cinzel({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-display" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-serif" });
const body = Jost({ subsets: ["latin"], variable: "--font-body" });

const description = `${site.name}: ${site.slogan.toLowerCase()}. Discover the collection online.`;

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.slogan}`, template: `%s | ${site.name}` },
  description,
  openGraph: { siteName: site.name, type: "website", locale: "en_CA", title: `${site.name} | ${site.slogan}`, description },
  // The share picture itself is app/opengraph-image.jpg and app/twitter-image.jpg; Next.js adds them automatically.
  twitter: { card: "summary_large_image" },
};

export const viewport = { themeColor: "#000000" };

export default function RootLayout({ children }) {
  // Ask the browser to start fetching the title lettering outlines straight away (used by lib/goldText.js).
  preload("/fonts/cinzel-700.json", { as: "fetch", crossOrigin: "anonymous" });
  return (
    <html lang="en-CA" className={`${display.variable} ${serif.variable} ${body.variable}`}>
      <body>
        {/* First thing in <body>, so it runs before Ecwid's script. It is deliberately not in <head>:
            hosts such as Netlify add their own tags there, which React must not be asked to match. */}
        {site.storeId && <script dangerouslySetInnerHTML={{ __html: ecwidScript }} />}
        <div id="site">
          <a href="#main" className="skip">Skip to content</a>
          <Header />
          <main id="main" tabIndex={-1}>{children}</main>
          <Footer />
        </div>
        <Toaster />
        <Effects />
        <EcwidScript storeId={site.storeId} />
      </body>
    </html>
  );
}
