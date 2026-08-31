import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/config/prisma";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();

		if (!email || !password) {
			return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
		}

		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
		}
		const SECRET_KEY = process.env.DB_JWT_SECRET;

		if (!SECRET_KEY) {
			throw new Error("DB_JWT_SECRET is not configured");
		}

		const token = jwt.sign(
			{
				uuid: user.uuid,
				role: user.role,
			},
			SECRET_KEY,
			{
				expiresIn: "24h",
			},
		);

		return NextResponse.json({ token });
	} catch (err) {
		console.error("Login error:", err);

		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
