// app/api/visits/[id]/route.ts
import { visitQueries } from "@/db/repository/visit";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const visit = visitQueries.getById(numericId);

    if (!visit) {
      return NextResponse.json({ error: "Visit not found" }, { status: 404 });
    }

    return NextResponse.json(visit);
  } catch (error) {
    console.error("Error fetching visit:", error);
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

    const existing = visitQueries.getById(Number(id));
    if (!existing) {
      return NextResponse.json({ error: "Visit not found" }, { status: 404 });
    }

    visitQueries.update({
      id: Number(id),
      visit_date: body.visit_date || existing.visit_date,
      photos: body.photos !== undefined ? body.photos : existing.photos,
      rating: body.rating !== undefined ? body.rating : existing.rating,
    });

    const updated = visitQueries.getById(Number(id));
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating visit:", error);
    return NextResponse.json(
      { error: "Failed to update visit" },
      { status: 500 },
    );
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const existing = visitQueries.getById(Number(id));
    if (!existing) {
      return NextResponse.json({ error: "Visit not found" }, { status: 404 });
    }

    visitQueries.delete(Number(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting visit:", error);
    return NextResponse.json(
      { error: "Failed to delete visit" },
      { status: 500 },
    );
  }
}
