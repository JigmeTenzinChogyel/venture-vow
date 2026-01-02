import { client } from "@/db/client";
import {
  CreateVisitInput,
  UpdateVisitInput,
  Visit,
  Visits,
} from "@/db/models/visits";

export const visitQueries = {
  getAll: () =>
    client
      .prepare("SELECT * FROM visits ORDER BY visit_date DESC")
      .all() as Visits,

  getById: (id: number) =>
    client.prepare("SELECT * FROM visits WHERE id = ?").get(id) as
    | Visit
    | undefined,

  getByVow: (vow_id: number) =>
    client
      .prepare("SELECT * FROM visits WHERE vow_id = ?")
      .all(vow_id) as Visit[],

  create: (input: CreateVisitInput) =>
    client
      .prepare(
        "INSERT INTO visits (vow_id, visit_date, notes, photos, rating) VALUES (?, ?, ?, ?, ?)",
      )
      .run(
        input.vow_id,
        input.visit_date,
        input.notes || null,
        input.photos || null,
        input.rating || null,
      ),

  update: (input: UpdateVisitInput) =>
    client
      .prepare(
        "UPDATE visits SET visit_date = ?, notes = ?, photos = ?, rating = ? WHERE id = ?",
      )
      .run(
        input.visit_date || null,
        input.notes || null,
        input.photos || null,
        input.rating || null,
        input.id,
      ),

  delete: (id: number) =>
    client.prepare("DELETE FROM visits WHERE id = ?").run(id),
};
