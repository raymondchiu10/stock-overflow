import { authenticateRequest } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const user = await authenticateRequest(req);
		if (user instanceof NextResponse) {
			// authenticateRequest already returned a 401 response
			return user;
		}

		const { v2: cloudinary } = await import("cloudinary");

		cloudinary.config({
			cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		});

		const folder = "stock-overflow";
		const timestamp = Math.round(Date.now() / 1000);

		const paramsToSign = { folder, timestamp };

		const apiSecret = process.env.CLOUDINARY_API_SECRET;
		if (!apiSecret) {
			throw new Error("Missing CLOUDINARY_API_SECRET environment variable");
		}
		const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

		return NextResponse.json({ signature, timestamp, folder });
	} catch (err) {
		console.error("Cloudinary signing error:", err);
		return NextResponse.json({ message: "Internal server error during Cloudinary signing" }, { status: 500 });
	}
}
