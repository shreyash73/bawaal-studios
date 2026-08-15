/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    // Modern formats only. Explicit dimensions everywhere — zero layout shift.
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
