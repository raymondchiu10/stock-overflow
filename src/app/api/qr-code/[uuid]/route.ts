import { NextResponse } from "next/server";

export const config = {
	runtime: "nodejs",
};

export async function GET(req: Request, { params }: { params: Promise<{ uuid: string }> }) {
	const { uuid } = await params;

	const { searchParams } = new URL(req.url);
	const path = searchParams.get("path");

	try {
		const QRCode = await import("qrcode");

		const qrCodeImage = await QRCode.toDataURL(`${path}/${uuid}`);
		return NextResponse.json(qrCodeImage);
	} catch (err) {
		console.error("Error generating QR code:", err);
		return NextResponse.json("Failed to generate QR code", { status: 500 });
	}
}
