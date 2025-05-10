import { NextResponse } from "next/server";
import pool from "@/lib/config/database";
import { authenticateRequest } from "@/lib/auth/auth";

export async function GET(req: Request, { params }: { params: Promise<{ uuid: string }> }) {
	try {
		const user = await authenticateRequest(req);

		if (user.role !== "admin") {
			return NextResponse.json({ message: "User not authenticated for this route." }, { status: 401 });
		}

		const { uuid } = await params;
		const { rows } = await pool.query("SELECT * FROM users WHERE uuid = $1", [uuid]);

		if (!rows.length) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		return NextResponse.json({ user: rows[0] });
	} catch (err) {
		return NextResponse.json({ message: (err as Error).message }, { status: 401 });
	}
}
