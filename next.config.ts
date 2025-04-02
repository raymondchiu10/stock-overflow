/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
			issuer: /\.[jt]sx?$/,
		});
		return config;
	},
	images: {
		domains: ["res.cloudinary.com"],
	},
	async rewrites() {
		return [
			{
				source: "/api/:path*", // Proxy all requests from /api/* to your backend
				destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`, // Change this to your backend URL
			},
		];
	},
};

export default nextConfig;
