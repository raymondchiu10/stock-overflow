import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/config/database";
import { authenticateRequest } from "@/lib/auth/auth";
import { AddInventoryFormData } from "@/components/EditInventory/actions";

export async function GET(_req: Request, { params }: { params: Promise<{ uuid: string }> }) {
	const { uuid } = await params;

	try {
		const { rows } = await pool.query(`SELECT * FROM inventory WHERE uuid = $1`, [uuid]);
		return NextResponse.json(rows);
	} catch (err) {
		console.error("DB Error:", err);
		return NextResponse.json({ error: "Failed to fetch inventory item." }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ uuid: string }> }) {
	try {
		const user = await authenticateRequest(req);

		if (user.role !== "admin") {
			return NextResponse.json({ message: "User not authenticated for this route." }, { status: 401 });
		}
		const { uuid } = await params;
		const { name, quantity, base_price, suggested_price, description } = await req.json();

		const fields: AddInventoryFormData = {
			name,
			quantity,
			base_price,
			suggested_price,
			description,
		};

		const setClauses: string[] = [];
		const values: Array<string | number> = [];

		let i = 1;

		for (const [key, value] of Object.entries(fields)) {
			if (value !== undefined && value !== "") {
				setClauses.push(`${key} = $${i}`);
				values.push(value);
				i++;
			}
		}

		if (setClauses.length === 0) {
			return NextResponse.json({ message: "No valid fields provided for update" }, { status: 400 });
		}

		setClauses.push(`updated_at = NOW()`);
		values.push(uuid as string);

		const query = `
			UPDATE inventory
			SET ${setClauses.join(", ")}
			WHERE uuid = $${values.length}
		`;

		const result = await pool.query(query, values);

		if (result.rowCount === 0) {
			return NextResponse.json({ message: "Inventory item not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Inventory item updated successfully." });
	} catch (err) {
		console.error("DB Error:", err);
		return NextResponse.json({ error: "Failed to update inventory item." }, { status: 500 });
	}
}

export async function DELETE(req: Request, { params }: { params: Promise<{ uuid: string }> }) {
	const { uuid } = await params;

	const user = await authenticateRequest(req);

	if (user.role !== "admin") {
		return NextResponse.json({ message: "User not authenticated for this route." }, { status: 401 });
	}

	try {
		const result = await pool.query("SELECT * FROM inventory WHERE uuid = $1", [uuid]);

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
