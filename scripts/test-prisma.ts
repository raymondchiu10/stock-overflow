import "dotenv/config";

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
	connectionString: process.env.DB_CONNECTION_STRING!,
	ssl: {
		rejectUnauthorized: false,
	},
});

const prisma = new PrismaClient({
	adapter,
});

async function main() {
	// const users = await prisma.user.findMany({
	// 	select: {
	// 		uuid: true,
	// 		email: true,
	// 		role: true,
	// 	},
	// });

	// console.log(users);

	const result = await prisma.$queryRaw<
		{ email: string; role: string }[]
	>`SELECT email, role FROM "user" ORDER BY email`;

	console.table(result);
}

main()
	.catch(console.error)
	.finally(async () => {
		await prisma.$disconnect();
	});
