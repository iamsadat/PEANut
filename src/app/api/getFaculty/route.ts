import { getUser } from "@/helpers/getUser";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const facultyId = await getUser(request);
    const faculty = await prisma.faculty.findUnique({
      where: { id: facultyId }
      
    });
    return NextResponse.json({
      message: "User found",
      data: faculty,
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
