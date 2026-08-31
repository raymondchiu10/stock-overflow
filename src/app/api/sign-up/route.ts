import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Prisma } from "@/generated/prisma/client";

import prisma from "@/lib/config/prisma";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();

		if (!email || !password) {
			return NextResponse.json({ error: "All fields are required" }, { status: 400 });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				role: "client",
			},
		});

		return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
			return NextResponse.json({ error: "User already exists" }, { status: 409 });
		}

		console.error("Registration error:", error);

		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
