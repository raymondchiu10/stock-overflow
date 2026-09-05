import { NextResponse } from "next/server";

export const runtime = "nodejs";

const shortenerApiUrl = process.env.URL_SHORTENER_API_URL;
const shortenerApiKey = process.env.URL_SHORTENER_API_KEY;

export async function GET(req: Request, { params }: { params: Promise<{ uuid: string }> }) {
	const { uuid } = await params;

	const { searchParams } = new URL(req.url);
	const path = searchParams.get("path");

	if (!path) {
		return NextResponse.json("Path is required", { status: 400 });
	}

	if (!shortenerApiUrl || !shortenerApiKey) {
		console.error("URL shortener environment variables are missing");

		return NextResponse.json("URL shortener configuration is missing", { status: 500 });
	}

	try {
		const originalUrl = `${path}/${uuid}`;

		const shortenerResponse = await fetch(shortenerApiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.URL_SHORTENER_API_KEY}`,
			},
			body: JSON.stringify({
				originalUrl,
			}),
		});

		if (!shortenerResponse.ok) {
			console.error("URL shortener error:", shortenerResponse.status, await shortenerResponse.text());

			return NextResponse.json("Failed to create short URL", { status: 502 });
		}

		const { shortUrl } = await shortenerResponse.json();

		const QRCode = await import("qrcode");

		const qrCodeImage = await QRCode.toDataURL(shortUrl);

		return NextResponse.json(qrCodeImage);
	} catch (error) {
		console.error("Error generating QR code:", error);

		return NextResponse.json("Failed to generate QR code", { status: 500 });
	}
}
