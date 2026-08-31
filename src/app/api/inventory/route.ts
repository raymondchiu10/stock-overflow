import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/config/prisma";
import { authenticateRequest } from "@/lib/auth/auth";

export async function GET() {
	try {
		const inventory = await prisma.inventory.findMany();

		return NextResponse.json({ inventory });
	} catch (err) {
		console.error("DB Error:", err);

		return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const user = await authenticateRequest(req);

		if (!user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		if (user.role !== "admin") {
			return NextResponse.json({ message: "Forbidden" }, { status: 403 });
		}

		const body = await req.json();

		const { name, description, quantity, basePrice, suggestedPrice, imageBase64 } = body;

		if (!name || quantity == null || basePrice == null || suggestedPrice == null) {
			return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
		}

		const existing = await prisma.inventory.findUnique({
			where: {
				name,
			},
		});

		if (existing) {
			return NextResponse.json({ message: "Inventory item with this name already exists" }, { status: 409 });
		}

		let image_public_id: string | null = null;
		let image_url: string | null = null;

		if (imageBase64) {
			const { v2: cloudinary } = await import("cloudinary");

			cloudinary.config({
				cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
				api_key: process.env.CLOUDINARY_API_KEY,
				api_secret: process.env.CLOUDINARY_API_SECRET,
			});

			const uploadResult = await cloudinary.uploader.upload(imageBase64, {
				folder: "stock-overflow",
				overwrite: false,
			});

			image_public_id = uploadResult.public_id;
			image_url = uploadResult.secure_url;
		}

		const inventory = await prisma.inventory.create({
			data: {
				name,
				description,
				quantity,
				basePrice,
				suggestedPrice,
				image_public_id,
				image_url,
			},
		});

		return NextResponse.json(inventory, { status: 201 });
	} catch (err) {
		console.error("Error creating inventory item:", err);

		return NextResponse.json({ message: "Failed to create inventory item" }, { status: 500 });
	}
}
