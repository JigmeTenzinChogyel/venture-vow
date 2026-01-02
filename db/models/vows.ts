import { DateTime } from "./date";
import { ID } from "./id";

export enum VowStatus {
  Pending = "PENDING",
  Completed = "COMPLETED",
  Cancelled = "CANCELLED",
}

export type Vow = {
  id: ID;
  destination_id: ID;
  user_name: string;
  vow_date: DateTime;
  status: VowStatus;
  target_visit_date?: DateTime;
  created_at: DateTime;
};

export type Vows = Vow[];

export type CreateVowInput = {
  destination_id: number;
  user_name: string;
  status?: VowStatus;
  target_visit_date?: string;
};
