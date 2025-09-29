// app/api/delete-cloudinary-image/route.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
	const { public_id } = await req.json();

	try {
		const result = await cloudinary.uploader.destroy(public_id);
		return Response.json({ result });
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
