import Link from "next/link";
import site from "../site.config";
import Icon from "./Icon";

// Blocks shared by the home page and the About page.

// A small gold ornament: a diamond between two fine rules. Used to separate and crown sections.
export function Flourish() {
  return <span className="flourish" aria-hidden="true"><i /></span>;
}

// The three pillars of the house.
export function Highlights() {
  return (
    <ul className="features">
      {site.highlights.map((h) => (
        <li key={h.title} className="reveal">
          <Icon name={h.icon} />
          <h3>{h.title}</h3>
          <p>{h.text}</p>
        </li>
      ))}
    </ul>
  );
}

// "The ritual": numbered steps on wearing fragrance, set in Roman numerals.
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
export const roman = (n) => ROMAN[n] || String(n + 1);

export function Ritual() {
  return (
    <ol className="ritual">
      {site.ritual.map((step, i) => (
        <li key={step.title} className="reveal">
          <span className="numeral" aria-hidden="true">{roman(i)}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function Hours() {
  if (!site.hours.length) return null;
  return (
    <dl className="hours">
      {site.hours.map(([d, h]) => (
        <div key={d}><dt>{d}</dt><dd>{h}</dd></div>
      ))}
    </dl>
  );
}

export const tel = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

// Closing invitation. `line` is two short phrases: the first in gold capitals, the second in italic script.
export function Cta({ line = ["Find your", "signature"], secondary = ["/about", "The house"] }) {
  return (
    <section className="cta">
      <div className="wrap reveal">
        <Flourish />
        <p className="cta-line"><span className="metal">{line[0]}</span> <em>{line[1]}</em></p>
        <div className="actions">
          <Link className="btn" href="/shop">Explore the collection</Link>
          <Link className="btn ghost" href={secondary[0]}>{secondary[1]}</Link>
        </div>
      </div>
    </section>
  );
}
