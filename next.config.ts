import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // AVIF first (smallest), WebP for browsers without AVIF support.
    formats: ["image/avif", "image/webp"],
    // Source photos are at most 1200px wide, so larger variants would just repeat the original.
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [32, 64, 96, 128, 256, 384],
    // 70 for photos, 60 for small thumbnails (see BreedImage).
    qualities: [60, 70],
    // Local photos only change when their file changes; cache optimized versions for 31 days.
    minimumCacheTTL: 2_678_400,
    localPatterns: [{ pathname: "/images/**", search: "" }],
  },
};

export default nextConfig;
