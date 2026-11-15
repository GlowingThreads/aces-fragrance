// Small line icons. Drawn here so no icon package is needed.
const paths = {
  cologne: <><rect x="6" y="9" width="12" height="12" rx="1" /><path d="M10 9V6h4v3M9.500 6h5M10 3.500h4M9 14h6" /></>,
  perfume: <><circle cx="12" cy="15" r="6" /><path d="M10.500 9.200V6.500h3v2.700M9.500 6.500h5M12 6.500V4M12 4h3.500M18 3v2M9.500 15.500a2.500 2.500 0 0 1 2.500-2.500" /></>,
  signature: <><path d="M12 3l2.200 6.300L20.500 12l-6.300 2.200L12 21l-2.200-6.800L3.500 12l6.300-2.700z" /></>,
  pin: <><path d="M12 21s7-6.200 7-11.500A7 7 0 0 0 5 9.500C5 14.800 12 21 12 21Z" /><circle cx="12" cy="9.500" r="2.500" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 20.500c1.200-3.600 4.300-5.500 8-5.500s6.800 1.900 8 5.500" /></>,
  bag: <><path d="M5 8h14l-1 12.500H6z" /><path d="M9 8V6.500a3 3 0 0 1 6 0V8" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  phone: <path d="M5 4h4l1.500 4.500-2 1.500a12 12 0 0 0 5.500 5.500l1.500-2L20 15v4a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1Z" />,
};

export default function Icon({ name }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {paths[name] || paths.signature}
    </svg>
  );
}
