import pool from "@/lib/config/database";

interface Table {
	name: string;
	schema: string;
	seed?: string;
}

const tables: Table[] = [
	{
		name: "users",
		schema: `
      CREATE TABLE IF NOT EXISTS users (
        uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(100) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );`,
		seed: `
      INSERT INTO users (uuid, email, password, role) VALUES
        ('550e8400-e29b-41d4-a716-446655440000', 'admin@test.test', '$2b$10$0hkUO0Whbejoetr/gYsV0urTCxTdQG9fEe0r.tN8cwE1sKHRW1MIy', 'admin'),
        ('550e8400-e29b-41d4-a716-446655440001', 'client@test.test', '$2b$10$0hkUO0Whbejoetr/gYsV0urTCxTdQG9fEe0r.tN8cwE1sKHRW1MIy', 'client')
      ON CONFLICT (uuid) DO NOTHING;`,
	},
	{
		name: "inventory",
		schema: `
      CREATE TABLE IF NOT EXISTS inventory (
        uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) UNIQUE NOT NULL,
        description VARCHAR(255),
        quantity INT NOT NULL,
        base_price DECIMAL(10, 2) NOT NULL,
        suggested_price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- Add optional image columns if they don't exist
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 
          FROM information_schema.columns 
          WHERE table_name='inventory' AND column_name='image_public_id'
        ) THEN
          ALTER TABLE inventory ADD COLUMN image_public_id VARCHAR(255);
        END IF;

        IF NOT EXISTS (
          SELECT 1 
          FROM information_schema.columns 
          WHERE table_name='inventory' AND column_name='image_url'
        ) THEN
          ALTER TABLE inventory ADD COLUMN image_url VARCHAR(500);
        END IF;
      END
      $$;`,
		seed: `
			INSERT INTO inventory (uuid, name, description, quantity, base_price, suggested_price, created_at, updated_at) VALUES
				('550e8400-e29b-41d4-a716-446655440004', 'Cactus', 'It is spikey and drought resistant', 12, 9.99, 12.99, NOW(), NOW()),
				('550e8400-e29b-41d4-a716-446655440005', 'Pants', 'They are to keep the lower half of your body warm', 8, 29.99, 49.99, NOW(), NOW())
			ON CONFLICT (name) DO NOTHING;
			`,
	},
];

const migrate = async () => {
	await pool.query("BEGIN");

	try {
		console.log("🚀 Running database migration...");

		for (const table of tables) {
			console.log(`🔹 Creating table if not exists: ${table.name}`);
			await pool.query(table.schema);

			if (table.seed) {
				console.log(`🌱 Seeding table: ${table.name}`);
				await pool.query(table.seed);
			}
		}

		await pool.query("COMMIT");
		console.log("✅ Migration completed successfully!");
	} catch (err) {
		await pool.query("ROLLBACK");
		console.error("❌ Migration failed!", err);
		throw err;
	} finally {
		pool.end();
	}
};

migrate();
