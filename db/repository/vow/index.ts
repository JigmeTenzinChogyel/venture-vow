import { client } from "@/db/client";
import { CreateVowInput, Vow, Vows, VowStatus } from "@/db/models/vows";

export const vowQueries = {
  getAll: () =>
    client.prepare("SELECT * FROM vows ORDER BY created_at DESC").all() as Vows,

  getById: (id: number) =>
    client.prepare("SELECT * FROM vows WHERE id = ?").get(id) as
    | Vow
    | undefined,

  getByDestination: (destination_id: number) =>
    client
      .prepare("SELECT * FROM vows WHERE destination_id = ?")
      .all(destination_id) as Vow[],

  getByStatus: (status: string) =>
    client.prepare("SELECT * FROM vows WHERE status = ?").all(status) as Vow[],

  create: (input: CreateVowInput) =>
    client
      .prepare(
        "INSERT INTO vows (destination_id, user_name, target_visit_date, status) VALUES (?, ?, ?, ?)",
      )
      .run(
        input.destination_id,
        input.user_name,
        input.target_visit_date || null,
        input.status || VowStatus.Pending,
      ),

  updateStatus: (id: number, status: VowStatus) =>
    client.prepare("UPDATE vows SET status = ? WHERE id = ?").run(status, id),

  delete: (id: number) =>
    client.prepare("DELETE FROM vows WHERE id = ?").run(id),
};
