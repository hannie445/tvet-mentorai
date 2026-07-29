/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Cloudflare Workers has no persistent Node image-optimization server,
    // so next/image serves the original file as-is instead of routing
    // through Next's on-the-fly optimization API. Visual output (size,
    // object-contain, cropping) is unaffected - this only disables
    // server-side resizing/format conversion.
    unoptimized: true,
  },
};

export default nextConfig;
