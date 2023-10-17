import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const problems = await prisma.code.findMany();

    // Return the problem in the response
    return NextResponse.json(problems, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
