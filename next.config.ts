import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'ec9e-2405-201-a014-5885-c9d0-f15c-2917-cb4f.ngrok-free.app'
  ],
  // Force Turbopack to use this project as the workspace root.
  // Without this, Next.js picks up a stray lockfile at /home/anshuman and
  // resolves node_modules from the wrong directory, breaking mongoose/jose.
  experimental: {
    turbo: {
      root: path.resolve(__dirname),
    },
  },
};

export default nextConfig;
