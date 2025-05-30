import path from "path";
import fs from "fs";
import pg from "pg";
import "dotenv/config";

const certPath = path.join("/tmp", "ca.pem");

const base64 = process.env.DB_CA_PEM_BASE64;

if (base64 && !fs.existsSync(certPath)) {
	fs.writeFileSync(certPath, Buffer.from(base64, "base64"));
}
const pool = new pg.Pool({
	connectionString: process.env.DB_CONNECTION_STRING,
	ssl: {
		rejectUnauthorized: false,
		ca: fs.readFileSync(certPath).toString(),
	},
});

export default pool;
