// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      // Kamu bisa tambahkan domain lain jika nanti pakai R2 atau CDN
      // {
      //   protocol: "https",
      //   hostname: "your-r2-bucket-name.cloudflare.r2.com",
      // },
    ],
  },
};

export default nextConfig;
