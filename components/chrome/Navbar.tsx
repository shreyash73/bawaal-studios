"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Wordmark from "./Wordmark";
import { SITE } from "@/content/site";

/**
 * Section 14 · "NAVIGATION: Transparent with white text on hero. Solid dark
 * on scroll." Five words at 10px. It stays visually quiet because the hero
 * spec is explicit that nothing competes with the work.
 *
 * Mobile does not get a hamburger. It gets the word MENU, and the overlay
 * arrives through an aperture — opening the menu is opening a lens.
 */
export default function Navbar() {
  const [mode, setMode] = useState<"transparent" | "solid" | "day">(
    "transparent",
  );
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const day = mode === "day";

  /**
   * Solid after the hero, with two exceptions the scene declares itself:
   *
   * data-mode="alert" — full-bleed Crimson. A black bar would cut the top
   * off the one moment whose entire argument is that the colour fills the
   * screen, so the bar yields.
   *
   * data-mode="day" — the cream process block. Section 06's approved
   * treatments put a black wordmark on light grounds, so the bar inverts
   * rather than sitting on the page as a dark slab.
   */
  useEffect(() => {
    let raf = 0;
    const probe = 96; // just below the bar

    const at = (attr: string) =>
      Array.from(
        document.querySelectorAll<HTMLElement>(`[data-mode='${attr}']`),
      ).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= probe && r.bottom >= probe;
      });

    const update = () => {
      if (window.scrollY <= window.innerHeight * 0.6) {
        setMode("transparent");
        return;
      }
      if (at("alert")) setMode("transparent");
      else if (at("day")) setMode("day");
      else setMode("solid");
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    trigger.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          mode === "solid" ? "bg-black/95 backdrop-blur-[2px]" : "",
          day ? "bg-white/95 backdrop-blur-[2px]" : "",
          mode === "transparent" ? "bg-transparent" : "",
        ].join(" ")}
        style={{ transitionTimingFunction: "var(--ease-cut)" }}
      >
        <nav
          aria-label="Primary"
          className="flex items-center justify-between px-5 py-5 md:px-8 md:py-6"
        >
          <Link
            href="/"
            className="text-[15px] md:text-[17px]"
            aria-label="Bawaal Studios — home"
          >
            <Wordmark variant="horizontal" tone={day ? "black" : "white"} />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {SITE.nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={[
                    "text-label uppercase transition-colors duration-200",
                    day
                      ? "text-navy/70 hover:text-navy"
                      : "text-white/70 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            ref={trigger}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="menu-overlay"
            className={`text-label uppercase md:hidden ${day ? "text-navy" : "text-white"}`}
          >
            Menu
          </button>
        </nav>
      </header>

      {open && (
        <div
          id="menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="aperture-open fixed inset-0 z-[60] flex flex-col justify-between bg-black px-5 py-5 md:hidden"
        >
          <div className="flex items-center justify-between">
            <Wordmark variant="horizontal" className="text-[15px]" />
            <button
              type="button"
              onClick={close}
              autoFocus
              className="text-label uppercase text-crimson"
            >
              Close
            </button>
          </div>

          <ul className="flex flex-col gap-1 pb-24">
            {SITE.nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="block py-3 text-display-m font-black uppercase text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-label uppercase text-white/40">
            {SITE.location} · {SITE.instagram}
          </p>
        </div>
      )}
    </>
  );
}
