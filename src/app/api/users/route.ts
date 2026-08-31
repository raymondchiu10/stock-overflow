import { NextResponse } from "next/server";
import prisma from "@/lib/config/prisma";

export const runtime = "nodejs";

export async function GET() {
	try {
		const users = await prisma.user.findMany({
			select: {
				uuid: true,
				role: true,
			},
		});

		return NextResponse.json({ user: users });
	} catch (err) {
		console.error("DB Error:", err);

		return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
	}
}
