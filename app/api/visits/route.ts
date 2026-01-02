// app/api/visits/route.ts
import { visitQueries } from "@/db/repository/visit";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const vow_id = searchParams.get("vow_id");

    let visits;
    if (vow_id) {
      visits = visitQueries.getByVow(Number(vow_id));
    } else {
      visits = visitQueries.getAll();
    }

    return NextResponse.json(visits);
  } catch (error) {
    console.error("Error fetching visits:", error);
    return NextResponse.json(
      { error: "Failed to fetch visits" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.vow_id || !body.visit_date) {
      return NextResponse.json(
        { error: "vow_id and visit_date are required" },
        { status: 400 },
      );
    }

    const result = visitQueries.create({
      vow_id: body.vow_id,
      visit_date: body.visit_date,
      notes: body.notes,
      photos: body.photos,
      rating: body.rating,
    });

    const newVisit = visitQueries.getById(result.lastInsertRowid as number);
    return NextResponse.json(newVisit, { status: 201 });
  } catch (error) {
    console.error("Error creating visit:", error);
    return NextResponse.json(
      { error: "Failed to create visit" },
      { status: 500 },
    );
  }
}
