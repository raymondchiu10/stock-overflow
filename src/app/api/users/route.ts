import { NextResponse } from "next/server";

export const config = {
	runtime: "nodejs",
};

export async function GET() {
	try {
		const { default: pool } = await import("@/lib/config/database");

		const result = await pool.query("SELECT * FROM users");
		return NextResponse.json({ users: result.rows });
	} catch (err) {
		console.error("DB Error:", err);
		return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
	}
}
