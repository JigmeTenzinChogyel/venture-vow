import { DateTime } from "./date";
import { ID } from "./id";

export type Destination = {
  id: ID;
  name: string;
  description?: string;
  image_url?: string;
  created_at: DateTime;
};

export type Destinations = [Destination];

export type CreateDestinationInput = {
  name: string;
  description?: string;
  image_url?: string;
};

export type UpdateDestinationInput = {
  id: ID;
  name?: string;
  description?: string;
  image_url?: string;
};
