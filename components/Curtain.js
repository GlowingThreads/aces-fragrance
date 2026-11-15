// The opening curtain. On the first page of a visit the gold spade appears alone on black for a moment,
// then two black panels part to reveal the site. It is plain HTML and CSS (see "curtain" in globals.css),
// so it covers the page from the very first paint and needs no JavaScript to finish.
// A tiny script at the start of <body> (lib/inline.js) marks later pages of the same visit, and CSS then
// leaves the curtain out. Visitors who ask for reduced motion never see it.
import site from "../site.config";

export default function Curtain() {
  return (
    <div className="curtain" aria-hidden="true">
      <i className="curtain-panel left" />
      <i className="curtain-panel right" />
      <div className="curtain-mark">
        <img src="/spade.webp" alt="" width="124" height="130" />
        <span className="curtain-line" />
        <span className="curtain-name">{site.name}</span>
      </div>
    </div>
  );
}
