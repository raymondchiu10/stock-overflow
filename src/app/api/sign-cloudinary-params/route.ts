import { authenticateRequest } from "@/lib/auth/auth";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
	try {
		const user = await authenticateRequest(req);
		if (user instanceof NextResponse) {
			// authenticateRequest already returned a 401 response
			return user;
		}

		const folder = "stock-overflow";
		const timestamp = Math.round(Date.now() / 1000);

		const paramsToSign = { folder, timestamp };

		const signature = cloudinary.utils.api_sign_request(
			paramsToSign,
			process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string
		);

		return NextResponse.json({ signature, timestamp, folder });
	} catch (err) {
		console.error("Cloudinary signing error:", err);
		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	}
}
