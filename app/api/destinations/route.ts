import { destinationQueries } from "@/db/repository/destination";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const destinations = destinationQueries.getAll();
    return NextResponse.json(destinations);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return NextResponse.json(
      { error: "Failed to fetch destinations" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const result = destinationQueries.create({
      name: body.name,
      description: body.description,
      image_url: body.image_url,
    });

    const newDestination = destinationQueries.getById(
      result.lastInsertRowid as number,
    );

    return NextResponse.json(newDestination, { status: 201 });
  } catch (error) {
    console.error("Error creating destination:", error);
    return NextResponse.json(
      { error: "Failed to create destination" },
      { status: 500 },
    );
  }
}
