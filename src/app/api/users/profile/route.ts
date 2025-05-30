// app/api/users/profile/route.ts
import { NextRequest, NextResponse } from "next/server";

export const config = {
	runtime: "nodejs",
};

const SECRET_KEY = process.env.DB_JWT_SECRET || "your_secret_key";

export async function GET(req: NextRequest) {
	const authHeader = req.headers.get("authorization");

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const token = authHeader.split(" ")[1];

	try {
		const jwt = await import("jsonwebtoken");
		const { default: pool } = await import("@/lib/config/database");

		const decoded = jwt.verify(token, SECRET_KEY) as { uuid: string };
		const { rows } = await pool.query(`SELECT * FROM "user" WHERE uuid = $1`, [decoded.uuid]);

		if (rows.length === 0) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		return NextResponse.json(rows[0]);
	} catch (err) {
		console.error("JWT error:", err);
		return NextResponse.json({ message: "Invalid or expired token" }, { status: 403 });
	}
}
