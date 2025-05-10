import { Pool } from "pg";
import "dotenv/config";

declare global {
	let pgPool: Pool | undefined;
}

const pool =
	global.pgPool ||
	new Pool({
		connectionString: process.env.DB_CONNECTION_STRING,
		ssl: false,
	});

if (process.env.NODE_ENV !== "production") global.pgPool = pool;

export default pool;
