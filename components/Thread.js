"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// The gold thread: a fine vertical line in the left margin that draws itself down the page as you scroll,
// with a small diamond at its tip. Section headings carry a matching diamond in the same margin (see
// "thread" in globals.css), so the thread appears to link one section to the next.
// It is only shown on wide screens, where there is a margin for it to live in.
export default function Thread() {
  const ref = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const thread = ref.current;
    if (!thread) return;
    let frame = 0;
    function update() {
      frame = 0;
      // The thread has reached as far as the middle of the window.
      const top = thread.getBoundingClientRect().top;
      const reach = Math.max(0, Math.min(thread.offsetHeight, window.innerHeight * 0.5 - top));
      thread.style.setProperty("--reach", `${reach}px`);
    }
    const request = () => { frame ||= requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", request, { passive: true });
    const onResize = new ResizeObserver(request); // the page grows as pictures and products load
    onResize.observe(thread);
    return () => { window.removeEventListener("scroll", request); onResize.disconnect(); cancelAnimationFrame(frame); };
  }, [pathname]);

  return <div ref={ref} className="thread" aria-hidden="true"><i /></div>;
}
