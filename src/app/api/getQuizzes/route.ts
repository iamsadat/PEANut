import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyJwtToken } from "@/lib/auth";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const token = request.cookies.get("token")?.value || "";

    const userRole = await verifyJwtToken(token);
    const quizzesFromDb = await prisma.quiz.findMany({
      where: {
        id: userRole?.id,
      },
    });

    return NextResponse.json(quizzesFromDb, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
