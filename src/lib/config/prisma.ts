import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as {
	prisma: PrismaClient;
};

const connectionString = process.env.DB_CONNECTION_STRING;

if (!connectionString) {
	throw new Error("DB_CONNECTION_STRING is not configured");
}

console.log("Prisma SSL config:", {
	hasConnectionString: Boolean(connectionString),
	rejectUnauthorized: false,
});

const adapter = new PrismaPg({
	connectionString,
	ssl: {
		rejectUnauthorized: false,
	},
});

const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		adapter,
	});

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}

export default prisma;
