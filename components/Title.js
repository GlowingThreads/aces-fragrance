"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { showSnap } from "../lib/titleSnapshot";

// The main heading of a page.
//
// The heading is ordinary text first (readable by search engines and screen readers, and shown if
// anything below fails). On top of it, `gold` draws the same words as real 3D gold lettering:
// solid, engraved-looking capitals with bevelled edges that mirror soft, warm surroundings.
// See lib/goldText.js for the drawing. `lines` splits a title so each line sits on its own row.

// The 3D code is fetched in the background as soon as any page with a title loads, and kept.
// `goldText` is filled in when it has arrived.
let goldText = null;
const loading = typeof window === "undefined"
  ? null
  : import("../lib/goldText").then((module) => { goldText = module; return module.prepare().then(() => module); }).catch(() => null);

// Runs before the browser paints, so on later pages the gold is in place from the first frame.
const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Title({ text, lines = [text], gold = true }) {
  const wrap = useRef(null);

  useBeforePaint(() => {
    if (!gold) return;
    const el = wrap.current;
    let stop = () => {};
    let cancelled = false;
    let picture = null;

    if (goldText?.isReady()) {
      // Already loaded (moving between pages): draw straight away, with no fade.
      stop = goldText.mountGoldText(el, { instant: true });
    } else {
      // First page of the visit: the 3D code is still loading. If this title has been seen before, show
      // the saved picture of it at once; otherwise the plain heading shows and then fades to gold.
      picture = showSnap(el);
      // Called once the live drawing has taken over, or once it is clear this device cannot draw 3D.
      const settle = (drew) => {
        picture?.remove();
        picture = null;
        if (!drew) el.classList.remove("is-3d", "instant"); // back to the plain heading
      };
      loading?.then((module) => {
        if (cancelled) return;
        if (!module) return settle(false);
        stop = module.mountGoldText(el, { instant: Boolean(picture), onSettled: settle });
      });
    }

    return () => {
      cancelled = true;
      stop();
      picture?.remove();
      el.classList.remove("is-3d", "instant");
    };
  }, [gold, text]);

  return (
    <div className="title-wrap" ref={wrap}>
      <h1 className="title">
        {lines.map((line, i) => (
          <span className="line" key={line}>
            {/* Each word is wrapped so the 3D drawing can find where the browser placed it. */}
            {line.split(" ").map((word, n) => <span key={n}><span className="w">{word}</span> </span>)}
            {i < lines.length - 1 ? " " : ""}
          </span>
        ))}
      </h1>
    </div>
  );
}
