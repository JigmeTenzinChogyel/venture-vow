import { DateTime } from "./date";
import { ID } from "./id";

export type Visit = {
  id: ID;
  vow_id: ID;
  visit_date: DateTime;
  Notes?: string;
  photos?: string;
  rating?: number;
  created_at: DateTime;
};

export type Visits = Visit[];

export type CreateVisitInput = {
  vow_id: number;
  visit_date: string;
  notes?: string;
  photos?: string;
  rating?: number;
};

export type UpdateVisitInput = {
  id: number;
  visit_date?: string;
  notes?: string;
  photos?: string;
  rating?: number;
};
