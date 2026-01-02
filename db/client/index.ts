import { Database } from "bun:sqlite";
import { mkdirSync } from "fs";
import { join } from "path";

// Define database directory and ensure it exists
const DB_DIR = join(process.cwd(), "db/data");

mkdirSync(DB_DIR, { recursive: true });

const DB_PATH = join(DB_DIR, "venture-vow.db");

export const client = new Database(DB_PATH, { create: true });
