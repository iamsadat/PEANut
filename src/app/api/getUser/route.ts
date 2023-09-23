import { getUser } from "@/helpers/getUser";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const userId = await getUser(request);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
