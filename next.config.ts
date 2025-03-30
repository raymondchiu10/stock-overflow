import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	async rewrites() {
		return [
			{
				source: "/api/:path*", // Proxy all requests from /api/* to your backend
				destination: `${process.env.NEXT_BACKEND_URL}/:path*`, // Change this to your backend URL
			},
		];
	},
};

export default nextConfig;
