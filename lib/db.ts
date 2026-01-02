import { Database } from "bun:sqlite";

const DB_NAME = "venture-vow.db";

export const db = new Database(DB_NAME, { create: true });
