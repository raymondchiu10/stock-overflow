import "dotenv/config";
import prisma from "@/lib/config/prisma";

async function main() {
	const result = await prisma.$queryRaw`
		SELECT
			nspname
		FROM pg_catalog.pg_namespace
		ORDER BY nspname;
	`;

	console.log(result);

	const result2 = await prisma.$queryRaw`SELECT current_database(), current_user`;
	console.log("\n\nresult2\n\n", result2);
}

main()
	.catch(console.error)
	.finally(async () => {
		await prisma.$disconnect();
	});
