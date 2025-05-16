import { NextRequest, NextResponse } from "next/server";

export const config = {
	runtime: "nodejs",
};

const SECRET_KEY = process.env.DB_JWT_SECRET || "your_secret_key";

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();

		if (!email || !password) {
			return NextResponse.json({ error: "All fields are required" }, { status: 400 });
		}

		const bcrypt = await import("bcryptjs");
		const jwt = await import("jsonwebtoken");
		const { default: pool } = await import("@/lib/config/database");

		const postgres = `SELECT * FROM users WHERE email = $1`;
		const { rowCount, rows } = await pool.query(postgres, [email]);

		if (rowCount === 0) {
			return NextResponse.json({ error: "User does not exist" }, { status: 409 });
		}

		const user = rows[0];

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
		}

		const token = jwt.sign({ uuid: user.uuid, role: user.role }, SECRET_KEY, {
			expiresIn: "24h",
		});

		return NextResponse.json({ token }, { status: 202 });
	} catch (err) {
		console.error("Login error:", err);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
