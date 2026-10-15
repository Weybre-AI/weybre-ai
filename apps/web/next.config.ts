import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_URL}/api/:path*`
      },
      {
        source: "/error",
        destination: "/auth/error"
      }
    ]
  },
}

export default nextConfig
