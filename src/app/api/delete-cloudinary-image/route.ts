// app/api/delete-cloudinary-image/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { public_id } = await req.json();

		if (!public_id) {
			return NextResponse.json({ error: "Missing required field: public_id" }, { status: 400 });
		}

		const { v2: cloudinary } = await import("cloudinary");

		cloudinary.config({
			cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		});

		const result = await cloudinary.uploader.destroy(public_id);
		return Response.json({ result });
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
