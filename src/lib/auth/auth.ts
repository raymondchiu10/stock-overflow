import jwt from "jsonwebtoken";
import prisma from "@/lib/config/prisma";

const SECRET_KEY = process.env.DB_JWT_SECRET;

if (!SECRET_KEY) {
	throw new Error("DB_JWT_SECRET is not configured");
}

export async function authenticateRequest(req: Request) {
	const authHeader = req.headers.get("Authorization");

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return null;
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, SECRET_KEY!) as {
			uuid: string;
		};

		const user = await prisma.user.findUnique({
			where: {
				uuid: decoded.uuid,
			},
			select: {
				uuid: true,
				email: true,
				role: true,
			},
		});

		return user;
	} catch (err) {
		console.error("Auth error:", err);
		return null;
	}
}
