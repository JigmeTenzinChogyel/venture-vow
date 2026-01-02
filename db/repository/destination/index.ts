import { client } from "@/db/client";
import {
  CreateDestinationInput,
  Destination,
  Destinations,
  UpdateDestinationInput,
} from "@/db/models/destinations";

// Destination queries
export const destinationQueries = {
  getAll: () =>
    client
      .prepare("SELECT * FROM destinations ORDER BY created_at DESC")
      .all() as Destinations,

  getById: (id: number) =>
    client.prepare("SELECT * FROM destinations WHERE id = ?").get(id) as
    | Destination
    | undefined,

  create: (input: CreateDestinationInput) =>
    client
      .prepare(
        "INSERT INTO destinations (name, description, image_url) VALUES (?, ?, ?)",
      )
      .run(input.name, input.description || null, input.image_url || null),

  update: (input: UpdateDestinationInput) =>
    client
      .prepare(
        "UPDATE destinations SET name = ?, description = ?, image_url = ? WHERE id = ?",
      )
      .run(
        input.name || null,
        input.description || null,
        input.image_url || null,
        input.id,
      ),

  delete: (id: number) =>
    client.prepare("DELETE FROM destinations WHERE id = ?").run(id),
};
