import { client } from "../client";

export function runMigrations() {
  // Enable foreign keys
  client.run("PRAGMA foreign_keys = ON");

  // Create destinations table
  client.run(`
    CREATE TABLE IF NOT EXISTS destinations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create vows table
  client.run(`
    CREATE TABLE IF NOT EXISTS vows (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      destination_id INTEGER NOT NULL,
      user_name TEXT NOT NULL,
      vow_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      target_visit_date DATE,
      status TEXT DEFAULT 'PENDING' CHECK(status IN ('PENDING', 'COMPLETED', 'CANCELLED')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE
    )
  `);

  // Create visits table
  client.run(`
    CREATE TABLE IF NOT EXISTS visits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vow_id INTEGER NOT NULL,
      visit_date DATE NOT NULL,
      notes TEXT,
      photos TEXT,
      rating INTEGER CHECK(rating >= 1 AND rating <= 5),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (vow_id) REFERENCES vows(id) ON DELETE CASCADE
    )
  `);

  // Create indexes for better query performance
  client.run(
    `CREATE INDEX IF NOT EXISTS idx_vows_destination ON vows(destination_id)`,
  );
  client.run(`CREATE INDEX IF NOT EXISTS idx_vows_status ON vows(status)`);
  client.run(`CREATE INDEX IF NOT EXISTS idx_visits_vow ON visits(vow_id)`);

  console.log("✅ Database migrations completed successfully!");

  client.close();
}

// Run migrations if this file is executed directly
if (import.meta.main) {
  runMigrations();
}
