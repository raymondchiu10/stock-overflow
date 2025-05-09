import { NextResponse } from "next/server";
import pool from "@/lib/config/database";
import { authenticateRequest } from "@/lib/auth/auth";

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

export async function DELETE(req: Request, { params }: { params: { uuid: string } }) {
	const { uuid } = params;

	const user = await authenticateRequest(req);

	if (user.role !== "admin") {
		return NextResponse.json({ message: "User not authenticated for this route." }, { status: 401 });
	}

	try {
		const result = await pool.query("SELECT * FROM inventory WHERE uuid = $1", [uuid]);
		console.log(result);

		if (result.rowCount === 0) {
			return NextResponse.json({ message: "Inventory item not found" }, { status: 404 });
		}

		await pool.query("DELETE FROM inventory WHERE uuid = $1", [uuid]);

		return NextResponse.json(
			{ message: `Inventory item ${result.rows[0].name} deleted successfully` },
			{ status: 200 }
		);
	} catch (err) {
		console.error("DB Error:", err);
		return NextResponse.json({ error: "Failed to delete inventory item." }, { status: 500 });
	}
}
