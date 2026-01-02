// app/api/vows/[id]/route.ts
import { vowQueries } from "@/db/repository/vow";
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

    const vow = vowQueries.getById(numericId);

    if (!vow) {
      return NextResponse.json({ error: "Vow not found" }, { status: 404 });
    }

    return NextResponse.json(vow);
  } catch (error) {
    console.error("Error fetching vow:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const existing = vowQueries.getById(Number(id));
    if (!existing) {
      return NextResponse.json({ error: "Vow not found" }, { status: 404 });
    }

    if (body.status) {
      vowQueries.updateStatus(Number(id), body.status);
    }

    const updated = vowQueries.getById(Number(id));
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating vow:", error);
    return NextResponse.json(
      { error: "Failed to update vow" },
      { status: 500 },
    );
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const existing = vowQueries.getById(Number(id));
    if (!existing) {
      return NextResponse.json({ error: "Vow not found" }, { status: 404 });
    }

    vowQueries.delete(Number(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting vow:", error);
    return NextResponse.json(
      { error: "Failed to delete vow" },
      { status: 500 },
    );
  }
}
