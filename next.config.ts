import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'ec9e-2405-201-a014-5885-c9d0-f15c-2917-cb4f.ngrok-free.app'
  ],
  // Force Turbopack to resolve node_modules from this project, not from the
  // stray lockfile Next.js finds at /home/anshuman/package-lock.json.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
