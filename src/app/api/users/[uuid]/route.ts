import { NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth/auth";
import prisma from "@/lib/config/prisma";

export const runtime = "nodejs";

export async function GET(req: Request, { params }: { params: Promise<{ uuid: string }> }) {
	try {
		const user = await authenticateRequest(req);

		if (!user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		if (user.role !== "admin") {
			return NextResponse.json({ message: "Forbidden" }, { status: 403 });
		}

		const { uuid } = await params;

		const targetUser = await prisma.user.findUnique({
			where: {
				uuid,
			},
			select: {
				uuid: true,
				email: true,
				role: true,
				createdAt: true,
			},
		});

		if (!targetUser) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		return NextResponse.json({ user: targetUser });
	} catch (err) {
		console.error("User lookup error:", err);

		return NextResponse.json({ message: (err as Error).message }, { status: 500 });
	}
}
