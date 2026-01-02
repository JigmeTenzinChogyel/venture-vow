import { client } from "../client";
import { CreateDestinationInput } from "../models/destinations";
import { CreateVowInput, VowStatus } from "../models/vows";
import { destinationQueries } from "../repository/destination";
import { vowQueries } from "../repository/vow";

export function seedDatabase() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  client.run("DELETE FROM visits");
  client.run("DELETE FROM vows");
  client.run("DELETE FROM destinations");

  // Reset autoincrement counters
  client.run(
    "DELETE FROM sqlite_sequence WHERE name IN ('destinations', 'vows', 'visits')",
  );

  // Add sample destinations
  const destinations: CreateDestinationInput[] = [
    {
      name: "Tokyo, Japan",
      description:
        "Experience the perfect blend of ancient traditions and cutting-edge technology in Japan's vibrant capital.",
      image_url:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    },
    {
      name: "Santorini, Greece",
      description:
        "Witness breathtaking sunsets over white-washed buildings and blue-domed churches on this stunning Greek island.",
      image_url:
        "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800",
    },
    {
      name: "Machu Picchu, Peru",
      description:
        "Explore the ancient Incan citadel nestled high in the Andes Mountains.",
      image_url:
        "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800",
    },
    {
      name: "Iceland",
      description:
        "Discover otherworldly landscapes with glaciers, geysers, hot springs, and the Northern Lights.",
      image_url:
        "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800",
    },
    {
      name: "Bali, Indonesia",
      description:
        "Find paradise in this Indonesian island known for its forested volcanic mountains, beaches, and coral reefs.",
      image_url:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
    },
  ];

  const destinationIds: number[] = [];
  for (const dest of destinations) {
    const result = destinationQueries.create(dest);
    destinationIds.push(Number(result.lastInsertRowid));
    console.log(`  ✓ Added destination: ${dest.name}`);
  }

  // Add sample vows
  const vows: CreateVowInput[] = [
    {
      destination_id: destinationIds[0],
      user_name: "Alice Chen",
      target_visit_date: "2025-06-15",
      status: VowStatus.Pending,
    },
    {
      destination_id: destinationIds[1],
      user_name: "Bob Johnson",
      target_visit_date: "2025-08-20",
      status: VowStatus.Pending,
    },
    {
      destination_id: destinationIds[0],
      user_name: "Charlie Smith",
      target_visit_date: "2025-04-10",
      status: VowStatus.Completed,
    },
    {
      destination_id: destinationIds[2],
      user_name: "Diana Martinez",
      target_visit_date: "2025-09-05",
      status: VowStatus.Pending,
    },
    {
      destination_id: destinationIds[3],
      user_name: "Alice Chen",
      target_visit_date: "2025-12-15",
      status: VowStatus.Pending,
    },
  ];

  for (const vow of vows) {
    vowQueries.create(vow);
    console.log(
      `  ✓ Added vow: ${vow.user_name} → Destination #${vow.destination_id}`,
    );
  }

  console.log("✅ Database seeded successfully!");
}

// Run seed if this file is executed directly
if (import.meta.main) {
  seedDatabase();
}
