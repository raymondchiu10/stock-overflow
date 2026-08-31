import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth/auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
	const user = await authenticateRequest(req);

	if (!user) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	return NextResponse.json(user);
}
