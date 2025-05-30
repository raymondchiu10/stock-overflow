import jwt from "jsonwebtoken";
import pool from "@/lib/config/database";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.DB_JWT_SECRET || "your_secret_key";

export async function authenticateRequest(req: Request) {
	const authHeader = req.headers.get("Authorization");

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, SECRET_KEY) as { uuid: string };

		const { rows } = await pool.query(`SELECT * FROM "user" WHERE uuid = $1`, [decoded.uuid]);

		if (!rows.length) {
			throw new Error("Invalid token");
		}

		return rows[0]; // this is your `user`
	} catch (err) {
		console.error("Auth error:", err);
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
}
