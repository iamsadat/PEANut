import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Extract problem ID from request query parameters
    const reqBody = await request.json();
    const { id } = reqBody;

    // Find the problem by ID using Prisma
    const problem = await prisma.code.findUnique({
      where: {
        id: id as string, // Assuming id is a string
      },
    });

    // If problem is not found, return 404 status code
    if (!problem) {
      return NextResponse.json({ status: 404, message: "Problem not found" });
    }

    // Return the problem in the response
    return NextResponse.json(problem, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
