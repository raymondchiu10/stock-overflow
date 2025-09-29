import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/config/database";
import { authenticateRequest } from "@/lib/auth/auth";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
	api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function GET() {
	try {
		const result = await client.query("SELECT * FROM inventory");
		return NextResponse.json({ inventory: result.rows });
	} catch (err) {
		console.error("DB Error:", err);
		return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const user = await authenticateRequest(req);

		if (user.role !== "admin") {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}
		const body = await req.json();

		const { name, description, quantity, base_price, suggested_price, imageBase64 } = body;

		if (!name || quantity == null || base_price == null || suggested_price == null) {
			return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
		}

		const existing = await client.query("SELECT * FROM inventory WHERE name = $1", [name]);

		if (existing.rows.length > 0) {
			return NextResponse.json({ message: "Inventory item with this name already exists" }, { status: 409 });
		}

		let image_public_id: string | null = null;
		let image_url: string | null = null;

		// Optional image upload
		if (imageBase64) {
			const uploadResult = await cloudinary.uploader.upload(imageBase64, {
				folder: "stock-overflow",
				overwrite: false,
			});
			image_public_id = uploadResult.public_id;
			image_url = uploadResult.secure_url;
		}

		const now = new Date();

		const result = await client.query(
			`INSERT INTO inventory (name, description, quantity, base_price, suggested_price, image_public_id, image_url, uuid, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, gen_random_uuid(), $8, $9)
             RETURNING *`,
			[name, description, quantity, base_price, suggested_price, image_public_id, image_url, now, now]
		);

		return NextResponse.json(result.rows[0], { status: 201 });
	} catch (err) {
		console.error("Error creating inventory item:", err);
		return NextResponse.json({ message: "Failed to create inventory item" }, { status: 500 });
	}
}
