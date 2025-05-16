import { NextResponse } from "next/server";

export const config = {
	runtime: "nodejs",
};

export async function GET(_req: Request, { params }: { params: Promise<{ uuid: string }> }) {
	const { uuid } = await params;

	try {
		const QRCode = await import("qrcode");

		const qrCodeImage = await QRCode.toDataURL(uuid);
		return NextResponse.json(qrCodeImage);
	} catch (err) {
		console.error("Error generating QR code:", err);
		return NextResponse.json("Failed to generate QR code", { status: 500 });
	}
}
