import jwt from "jsonwebtoken"; // Import the jwt library
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyJwtToken } from "@/lib/auth";
import { getUser } from "@/helpers/getUser";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const user = await getUser(request);

    console.log(user?.id);

    const userFromDb = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    return NextResponse.json(userFromDb, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
