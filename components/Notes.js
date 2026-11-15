// The scent pyramid on a product page: top, heart and base notes, plus short facts such as concentration.
// The values come from the product's attributes in Lightspeed (see scentProfile in lib/ecwid.js).
const ABOUT = {
  Top: "The opening: what you notice first",
  Heart: "The character: what emerges as it settles",
  Base: "The memory: what lingers for hours",
};

export default function Notes({ profile }) {
  const { notes, facts } = profile;
  if (!notes.length && !facts.length) return null;
  return (
    <section className="scent" aria-labelledby="scent-title">
      <h2 id="scent-title">The composition</h2>
      {facts.length > 0 && (
        <dl className="facts">
          {facts.map((f) => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}
        </dl>
      )}
      {notes.length > 0 && (
        <ol className="pyramid">
          {notes.map((n) => (
            <li key={n.tier}>
              <h3>{n.tier} notes</h3>
              <p className="fine">{ABOUT[n.tier]}</p>
              <ul>{n.list.map((note) => <li key={note}>{note}</li>)}</ul>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
