import path from "path";
import fs from "fs";
import pg from "pg";
import "dotenv/config";

const certPath = path.resolve(process.cwd(), "src/lib/certs/ca.pem");

const base64 = process.env.DB_CA_PEM_BASE64;

if (base64 && !fs.existsSync(certPath)) {
	fs.mkdirSync(path.dirname(certPath), { recursive: true });
	fs.writeFileSync(certPath, Buffer.from(base64, "base64"));
}

console.log("Using cert at:", certPath);

const pool = new pg.Pool({
	connectionString: process.env.DB_CONNECTION_STRING,
	ssl: {
		rejectUnauthorized: false,
		ca: fs.readFileSync(certPath).toString(),
	},
});

export default pool;
