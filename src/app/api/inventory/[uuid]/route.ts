import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth/auth";
import prisma from "@/lib/config/prisma";
import { User } from "@/generated/prisma/client";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: Promise<{ uuid: string }> }) {
	const { uuid } = await params;

	try {
		const inventoryItem = await prisma.inventory.findUnique({
			where: {
				uuid,
			},
		});

		if (!inventoryItem) {
			return NextResponse.json({ message: "Inventory item not found" }, { status: 404 });
		}

		return NextResponse.json([inventoryItem]);
	} catch (err) {
		console.error("DB Error:", err);

		return NextResponse.json({ error: "Failed to fetch inventory item." }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ uuid: string }> }) {
	try {
		const user = await authenticateRequest(req);

		if (!user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		if (user.role !== "admin") {
			return NextResponse.json({ message: "Forbidden" }, { status: 403 });
		}

		const { uuid } = await params;

		const { name, quantity, basePrice, suggestedPrice, description } = await req.json();

		const data: {
			name?: string;
			quantity?: number;
			basePrice?: string;
			suggestedPrice?: string;
			description?: string;
		} = {};

		if (name !== undefined && name !== "") {
			data.name = name;
		}

		if (quantity !== undefined && quantity !== "") {
			data.quantity = quantity;
		}

		if (basePrice !== undefined && basePrice !== "") {
			data.basePrice = basePrice;
		}

		if (suggestedPrice !== undefined && suggestedPrice !== "") {
			data.suggestedPrice = suggestedPrice;
		}

		if (description !== undefined && description !== "") {
			data.description = description;
		}

		if (Object.keys(data).length === 0) {
			return NextResponse.json({ message: "No valid fields provided for update" }, { status: 400 });
		}

		const inventoryItem = await prisma.inventory.update({
			where: {
				uuid,
			},
			data,
		});

		return NextResponse.json({
			message: "Inventory item updated successfully.",
			inventoryItem,
		});
	} catch (err) {
		console.error("DB Error:", err);

		return NextResponse.json({ error: "Failed to update inventory item." }, { status: 500 });
	}
}

export async function DELETE(req: Request, { params }: { params: Promise<{ uuid: string }> }) {
	const { uuid } = await params;

	try {
		const user = await authenticateRequest(req);

		if (!user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		if (user.role !== "admin") {
			return NextResponse.json({ message: "Forbidden" }, { status: 403 });
		}

		const inventoryItem = await prisma.inventory.findUnique({
			where: {
				uuid,
			},
			select: {
				name: true,
			},
		});

		if (!inventoryItem) {
			return NextResponse.json({ message: "Inventory item not found" }, { status: 404 });
		}

		await prisma.inventory.delete({
			where: {
				uuid,
			},
		});

		return NextResponse.json(
			{
				message: `Inventory item ${inventoryItem.name} deleted successfully`,
			},
			{ status: 200 },
		);
	} catch (err) {
		console.error("DB Error:", err);

		return NextResponse.json({ error: "Failed to delete inventory item." }, { status: 500 });
	}
}
