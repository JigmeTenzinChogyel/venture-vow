import { db } from "./db";

// Enable foreign keys
db.run("PRAGMA foreign_keys = ON");

// Types
export type Destination = {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
};

export type Vow = {
  id: number;
  destination_id: number;
  user_name: string;
  vow_date: string;
  target_visit_date: string | null;
  status: "pending" | "completed" | "cancelled";
  created_at: string;
};

export type Visit = {
  id: number;
  vow_id: number;
  visit_date: string;
  notes: string | null;
  photos: string | null; // JSON string of array
  rating: number | null;
  created_at: string;
};

// Destination queries
export const destinationQueries = {
  getAll: db.query<Destination, []>(
    "SELECT * FROM destinations ORDER BY created_at DESC",
  ),
  getById: db.query<Destination, [number]>(
    "SELECT * FROM destinations WHERE id = ?",
  ),
  create: db.prepare(
    "INSERT INTO destinations (name, description, image_url) VALUES (?, ?, ?)",
  ),
  update: db.prepare(
    "UPDATE destinations SET name = ?, description = ?, image_url = ? WHERE id = ?",
  ),
  delete: db.prepare("DELETE FROM destinations WHERE id = ?"),
};

// Vow queries
export const vowQueries = {
  getAll: db.query<Vow, []>("SELECT * FROM vows ORDER BY created_at DESC"),
  getById: db.query<Vow, [number]>("SELECT * FROM vows WHERE id = ?"),
  getByDestination: db.query<Vow, [number]>(
    "SELECT * FROM vows WHERE destination_id = ?",
  ),
  getByStatus: db.query<Vow, [string]>("SELECT * FROM vows WHERE status = ?"),
  create: db.prepare(
    "INSERT INTO vows (destination_id, user_name, target_visit_date, status) VALUES (?, ?, ?, ?)",
  ),
  updateStatus: db.prepare("UPDATE vows SET status = ? WHERE id = ?"),
  delete: db.prepare("DELETE FROM vows WHERE id = ?"),
};

// Visit queries
export const visitQueries = {
  getAll: db.query<Visit, []>("SELECT * FROM visits ORDER BY visit_date DESC"),
  getById: db.query<Visit, [number]>("SELECT * FROM visits WHERE id = ?"),
  getByVow: db.query<Visit, [number]>("SELECT * FROM visits WHERE vow_id = ?"),
  create: db.prepare(
    "INSERT INTO visits (vow_id, visit_date, notes, photos, rating) VALUES (?, ?, ?, ?, ?)",
  ),
  update: db.prepare(
    "UPDATE visits SET visit_date = ?, notes = ?, photos = ?, rating = ? WHERE id = ?",
  ),
  delete: db.prepare("DELETE FROM visits WHERE id = ?"),
};

// Example usage functions
export function getAllDestinations(): Destination[] {
  return destinationQueries.getAll.all();
}

export function createDestination(
  name: string,
  description?: string,
  image_url?: string,
) {
  return destinationQueries.create.run(
    name,
    description || null,
    image_url || null,
  );
}

export function createVow(
  destination_id: number,
  user_name: string,
  target_visit_date?: string,
  status: "pending" | "completed" | "cancelled" = "pending",
) {
  return vowQueries.create.run(
    destination_id,
    user_name,
    target_visit_date || null,
    status,
  );
}

export function getVowsByDestination(destination_id: number): Vow[] {
  return vowQueries.getByDestination.all(destination_id);
}
