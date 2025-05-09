import { NextResponse } from "next/server";
import pool from "@/lib/config/database";

export async function GET(_req: Request, { params }: { params: { uuid: string } }) {
	const { uuid } = await params;

	try {
		const { rows } = await pool.query(`SELECT * FROM inventory WHERE uuid = $1`, [uuid]);
		return NextResponse.json(rows);
	} catch (err) {
		console.error("DB Error:", err);
		return NextResponse.json({ error: "Failed to fetch inventory item." }, { status: 500 });
	}
}
