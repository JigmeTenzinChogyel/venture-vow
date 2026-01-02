import { vowQueries } from "@/db/repository/vow";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const destination_id = searchParams.get("destination_id");
    const status = searchParams.get("status");

    let vows;
    if (destination_id) {
      vows = vowQueries.getByDestination(Number(destination_id));
    } else if (status) {
      vows = vowQueries.getByStatus(status);
    } else {
      vows = vowQueries.getAll();
    }

    return NextResponse.json(vows);
  } catch (error) {
    console.error("Error fetching vows:", error);
    return NextResponse.json(
      { error: "Failed to fetch vows" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.destination_id || !body.user_name) {
      return NextResponse.json(
        { error: "destination_id and user_name are required" },
        { status: 400 },
      );
    }

    const result = vowQueries.create({
      destination_id: body.destination_id,
      user_name: body.user_name,
      target_visit_date: body.target_visit_date,
      status: body.status,
    });

    const newVow = vowQueries.getById(result.lastInsertRowid as number);
    return NextResponse.json(newVow, { status: 201 });
  } catch (error) {
    console.error("Error creating vow:", error);
    return NextResponse.json(
      { error: "Failed to create vow" },
      { status: 500 },
    );
  }
}
