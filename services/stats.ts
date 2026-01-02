import { destinationQueries } from "@/db/repository/destination";
import { visitQueries } from "@/db/repository/visit";
import { vowQueries } from "@/db/repository/vow";

export type StatsData = {
  vowsMade: number;
  destinations: number;
  completed: number;
};

export function getStats(): StatsData {
  try {
    const vows = vowQueries.getAll();
    const destinations = destinationQueries.getAll();
    const visits = visitQueries.getAll();

    return {
      vowsMade: vows.length,
      destinations: destinations.length,
      completed: visits.length,
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    // Return default values if query fails
    return {
      vowsMade: 0,
      destinations: 0,
      completed: 0,
    };
  }
}
