import { destinationQueries } from "@/db/repository/destination";
import { NextResponse } from "next/server";

// Defining the shape of the dynamic route params
type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    // Validate if ID is a valid number to prevent unnecessary DB queries
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const destination = destinationQueries.getById(numericId);

    if (!destination) {
      return NextResponse.json(
        { error: "Destination not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(destination);
  } catch (error) {
    console.error("Error fetching destination:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const existing = destinationQueries.getById(Number(id));
    if (!existing) {
      return NextResponse.json(
        { error: "Destination not found" },
        { status: 404 },
      );
    }

    destinationQueries.update({
      id: Number(id),
      name: body.name || existing.name,
      description: body.description || existing.description,
      image_url: body.image_url || existing.image_url,
    });

    const updated = destinationQueries.getById(Number(id));
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating destination:", error);
    return NextResponse.json(
      { error: "Failed to update destination" },
      { status: 500 },
    );
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const existing = destinationQueries.getById(Number(id));
    if (!existing) {
      return NextResponse.json(
        { error: "Destination not found" },
        { status: 404 },
      );
    }

    destinationQueries.delete(Number(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting destination:", error);
    return NextResponse.json(
      { error: "Failed to delete destination" },
      { status: 500 },
    );
  }
}
