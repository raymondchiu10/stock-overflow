import { PrismaClient, Prisma } from "@/prisma";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
	{
		uuid: uuidv4(),
		email: "admin@test.test",
		password: "$2b$10$0hkUO0Whbejoetr/gYsV0urTCxTdQG9fEe0r.tN8cwE1sKHRW1MIy",
		role: "admin",
	},
	{
		uuid: uuidv4(),
		email: "client@test.test",
		password: "$2b$10$0hkUO0Whbejoetr/gYsV0urTCxTdQG9fEe0r.tN8cwE1sKHRW1MIy",
		role: "client",
	},
];

const inventoryData: Prisma.InventoryCreateInput[] = [
	{
		uuid: uuidv4(),
		name: "Cactus",
		description: "It is spikey and drought resistant",
		quantity: 12,
		basePrice: new Prisma.Decimal(9.99),
		suggestedPrice: new Prisma.Decimal(12.99),
	},
	{
		uuid: uuidv4(),
		name: "Pants",
		description: "They are to keep the lower half of your body warm",
		quantity: 8,
		basePrice: new Prisma.Decimal(29.99),
		suggestedPrice: new Prisma.Decimal(49.99),
	},
];

export async function main() {
	for (const u of userData) {
		console.log("Seeding user:", u.email);
		await prisma.user.upsert({
			where: { email: u.email },
			update: {},
			create: u,
		});
	}

	for (const i of inventoryData) {
		console.log("Seeding inventory:", i.name);
		await prisma.inventory.upsert({
			where: { name: i.name },
			update: {},
			create: i,
		});
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
