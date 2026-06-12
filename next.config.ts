import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/portfolio-pro" : "";

const nextConfig: NextConfig = {
  ...(isProd && { output: "export" }),
  basePath,
  assetPrefix: isProd ? "/portfolio-pro/" : "",
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
