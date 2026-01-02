// import { NextRequest, NextResponse } from "next/server";
// import { updateService, vowService } from "@/lib/db";

// // POST /api/vows/[id]/updates - Create update for a vow
// export async function POST(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     const { id } = await params;
//     const body = await request.json();
//     const { content } = body;

//     if (!content) {
//       return NextResponse.json(
//         { error: "Content is required" },
//         { status: 400 },
//       );
//     }

//     // Verify vow exists
//     const vow = vowService.getById(Number(id));
//     if (!vow) {
//       return NextResponse.json({ error: "Vow not found" }, { status: 404 });
//     }

//     const updateId = updateService.create(Number(id), content);
//     const updates = updateService.getByVowId(Number(id));
//     const newUpdate = updates.find((u) => u.id === Number(updateId));

//     return NextResponse.json(newUpdate, { status: 201 });
//   } catch (error) {
//     console.error("Error creating update:", error);
//     return NextResponse.json(
//       { error: "Failed to create update" },
//       { status: 500 },
//     );
//   }
// }
