import { NextResponse } from "next/server";

export const config = {
	runtime: "nodejs",
};

export async function GET() {
	return new NextResponse(null, { status: 200 });
}
