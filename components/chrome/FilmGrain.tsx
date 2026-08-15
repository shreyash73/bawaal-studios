/**
 * Section 09 · "8–15% fine grain overlay on all hero images and video
 * frames. This is our textural signature."
 *
 * One fixed layer for the whole document, composited on the GPU. Per
 * section grain would multiply paint cost for identical output.
 */

export default function FilmGrain() {
  return <div className="grain" aria-hidden="true" />;
}
