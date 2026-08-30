import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/config/prisma";

export const runtime = "nodejs";

const SECRET_KEY = process.env.DB_JWT_SECRET || "your_secret_key";

export async function GET(req: NextRequest) {
	const authHeader = req.headers.get("authorization");

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, SECRET_KEY) as { uuid: string };

		const user = await prisma.user.findUnique({
			where: {
				uuid: decoded.uuid,
			},
			select: {
				uuid: true,
				email: true,
				role: true,
				createdAt: true,
			},
		});

		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		return NextResponse.json(user);
	} catch (err) {
		console.error("JWT error:", err);

		return NextResponse.json({ message: "Invalid or expired token" }, { status: 403 });
	}
}
