import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/config/database";
import { authenticateRequest } from "@/lib/auth/auth";

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

		const { name, description, quantity, base_price, suggested_price } = body;

		if (!name || quantity == null || base_price == null || suggested_price == null) {
			return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
		}

		const now = new Date();

		const result = await client.query(
			`INSERT INTO inventory (name, description, quantity, base_price, suggested_price, uuid, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, gen_random_uuid(), $6, $7)
             RETURNING *`,
			[name, description, quantity, base_price, suggested_price, now, now]
		);

		return NextResponse.json(result.rows[0], { status: 201 });
	} catch (err) {
		console.error("Error creating inventory item:", err);
		return NextResponse.json({ message: "Failed to create inventory item" }, { status: 500 });
	}
}
