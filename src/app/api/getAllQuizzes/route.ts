import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const quizzes = await prisma.quiz.findMany();
    return NextResponse.json(quizzes, { status: 200 });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
