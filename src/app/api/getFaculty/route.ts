import jwt from "jsonwebtoken"; // Import the jwt library
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyJwtToken } from "@/lib/auth";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const token = request.cookies.get("token")?.value || "";

    const user = await verifyJwtToken(token);
    const userFromDb = await prisma.faculty.findFirst({
      where: {
        id: user?.id,
      },
    });

    return NextResponse.json(userFromDb, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
