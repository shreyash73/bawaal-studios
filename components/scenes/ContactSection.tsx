"use client";

import { useState } from "react";
import SceneLabel from "@/components/primitives/SceneLabel";
import RuledLine from "@/components/primitives/RuledLine";
import Reveal from "@/components/motion/Reveal";
import { SITE } from "@/content/site";

/**
 * SCENE 12 · CONTACT
 *
 * Section 14 · "Single CTA. Black background. Crimson button. One email
 * field. Maximum restraint."
 *
 * There is no backend, so the form does the honest thing: it opens a real
 * message addressed to the studio. Nothing pretends to have been sent.
 */
export default function ContactSection() {
  const [email, setEmail] = useState("");

  return (
    <section
      id="contact"
      data-scene="12"
      data-scene-name="Contact"
      className="relative bg-black px-5 py-28 md:px-8 md:py-36"
    >
      <h2 className="-mr-[6vw] text-display-xl font-black uppercase text-white">
        <Reveal as="span" className="block">
          Got something
        </Reveal>
        <Reveal as="span" index={1} className="block">
          worth making?
        </Reveal>
      </h2>

      <RuledLine className="mt-12" />

      <form
        className="mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          const subject = encodeURIComponent("Something worth making");
          const body = encodeURIComponent(`Reply to: ${email}\n\n`);
          window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
        }}
      >
        <label htmlFor="email" className="sr-only">
          Your email address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full border-b border-white/25 bg-transparent pb-3 text-lead text-white placeholder:text-white/30 focus:border-crimson focus:outline-none"
        />
        <button
          type="submit"
          data-cursor="Send"
          className="shrink-0 bg-crimson px-8 py-4 text-label uppercase text-white transition-opacity duration-200 hover:opacity-85"
        >
          Let&rsquo;s make Bawaal →
        </button>
      </form>

      <ul className="mt-20 flex flex-col gap-3 md:flex-row md:gap-12">
        <li>
          <a
            href={`mailto:${SITE.email}`}
            className="text-label uppercase text-white/70 transition-colors duration-200 hover:text-crimson"
          >
            {SITE.email}
          </a>
        </li>
        <li>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-label uppercase text-white/70 transition-colors duration-200 hover:text-crimson"
          >
            {SITE.instagram}
          </a>
        </li>
        {/* Split so the coordinates never orphan a character on a phone. */}
        <li>
          <SceneLabel>{SITE.location}</SceneLabel>
        </li>
        <li>
          <SceneLabel className="whitespace-nowrap">
            {SITE.coordinates}
          </SceneLabel>
        </li>
      </ul>
    </section>
  );
}
