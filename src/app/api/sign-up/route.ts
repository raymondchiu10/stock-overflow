import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/config/database";

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();

		if (!email || !password) {
			return NextResponse.json({ error: "All fields are required" }, { status: 400 });
		}

		const postgres = `INSERT INTO users (email, password, role)
			VALUES ($1, $2, $3)
			ON CONFLICT (email) DO NOTHING;`;

		const hashedPassword = await bcrypt.hash(password, 10);
		const { rowCount } = await pool.query(postgres, [email, hashedPassword, "client"]);

		if (rowCount === 0) {
			return NextResponse.json({ error: "User already exists" }, { status: 409 });
		}

		return NextResponse.json({ message: "User registered successfully!" });
	} catch (error) {
		console.error("Registration error:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
