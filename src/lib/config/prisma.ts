import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as {
	prisma: PrismaClient;
};

const connectionString = process.env.DB_CONNECTION_STRING;

if (!connectionString) {
	throw new Error("DB_CONNECTION_STRING is not configured");
}

const adapter = new PrismaPg({
	connectionString,
	ssl: {
		ca: process.env.DB_CA_PEM_BASE64,
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
