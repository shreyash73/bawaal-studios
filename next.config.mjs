/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Modern formats only. Explicit dimensions everywhere — zero layout shift.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
