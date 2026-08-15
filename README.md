# Bawaal Studios — Website

One film, cut into thirteen scenes. Built from the Brand Book v2.0 as a strict
design system.

Creative direction: [`creative-direction.html`](./creative-direction.html) —
open it in a browser. It is the reference for every decision in this codebase.

```bash
npm install
npm run dev     # http://localhost:4100
npm run build
```

Next.js 16 · React 19 · TypeScript · Tailwind v4 · GSAP ScrollTrigger · Lenis.

---

## The state this ships in

**Every asset is a placeholder.** That is deliberate — the placeholder is a
designed state (crop marks, slate marking, the exact path the file should land
at), so the site reads as a studio holding its frames back rather than as a
broken template. Nothing needs redesigning when real media arrives.

Nothing here invents a client, a credit, or the logo.

## Dropping in real assets

All content is data. **You never touch markup.**

| What | Edit | Drop files at |
| --- | --- | --- |
| Showreel | `content/site.ts` → `REEL.src`, `.poster`, `.chapters` | `public/assets/reel/` |
| Projects | `content/projects.ts` | `public/assets/work/` |
| Microdramas | `content/microdramas.ts` | `public/assets/microdramas/` |
| Founders | `content/team.ts` | `public/assets/team/` |
| BTS stills | `content/process.ts` | `public/assets/bts/` |
| Clients | `content/clients.ts` | `public/assets/clients/` |
| Contact, nav, hero copy | `content/site.ts` | — |

A field left `null` renders its pending state. Fill it and the pending state
disappears. Example — publishing the first project:

```ts
{
  slug: "project-01",
  slate: "Project 01",
  title: "The Long Way Home",     // was null
  client: "Client Name",           // was null
  runtime: "1:48",                 // was null
  video: "/assets/work/project-01.mp4",
  poster: "/assets/work/project-01.jpg",
  description: "Two or three sentences. No more.",
  ...
}
```

### The logo

Section 06 forbids recreating the mark from memory or a scan, so it is **not
drawn in code**. `components/chrome/Wordmark.tsx` renders honest placeholder
typography with a small Crimson pending dot.

To go live, put the master SVGs in `public/assets/brand/` and set the paths in
`content/site.ts` → `BRAND`. The placeholder and its marker disappear
automatically.

### The typeface

Inter is loaded as the brand book's approved fallback. To use the real face,
add the licensed Neue Haas Grotesk `woff2` files via `next/font/local` in
`app/layout.tsx`. The stack in `app/globals.css` already lists Neue Haas Grotesk
first, so it takes over the moment it exists.

### Video hosting

`VideoFrame` takes any URL, so pointing `src` at Mux or Cloudflare Stream works
with no code change. Recommended before launch — progressive MP4s over `/public`
will hurt on Indian mobile networks past ~15 MB.

---

## How it is put together

```
app/           routes — / (the film), /work, /work/[slug], /microdramas, 404
components/
  chrome/      grain, nav, cursor, scene meter, wordmark, smooth scroll
  motion/      Reveal, WhipPan
  primitives/  AssetPlaceholder, VideoFrame, SceneLabel, RuledLine
  scenes/      one file per scene, in scroll order
  work/        index, filter, project frame
content/       all copy and media references — the only files most edits touch
lib/           motion tokens, the five approved colour modes, media policy
```

**`lib/motion.ts`** and **`lib/colour.ts`** are the single sources of truth. If a
duration, easing or colour pairing is not in those files, it does not exist on
this site. `app/globals.css` clears Tailwind's default palette and radius scale,
so an off-system colour or a rounded corner is not a mistake you can make.

## Rules the code enforces

- **No gradients.** Verified: zero gradient backgrounds in the rendered page.
- **No border radius**, except the aperture — which is the mark.
- **Five colour pairings.** `lib/colour.ts`. There is no sixth.
- **One video decodes at a time** (`lib/media.ts`); sources attach only within
  one viewport of the fold.
- **Nothing bounces.** Two easing curves, both weighted ease-in-out.
- **Reduced motion is a second design**, not a kill switch: pins release, the
  iris becomes a fade, the whip pan becomes a cut, grain freezes, videos hold on
  posters with real controls.

## Known placeholder behaviours

- `content/clients.ts` is empty on purpose. Scene 11 falls back to the crafts
  the studio works in, under an explicit "client roster pending" label. Add real
  entries and the fallback disappears.
- Scene 04 (Post) shows a reference chart built from the brand palette so the
  grade transition is legible without a real frame. Set a still and it goes.
- The cold open runs once per session, is skippable on any input, and is skipped
  entirely under reduced motion.
- The contact form has no backend — it opens a real addressed message rather
  than pretending to submit.
