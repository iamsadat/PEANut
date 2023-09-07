import { prisma } from "@/lib/db";
import { endQuizSchema } from "@/schemas/questions";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { quizId } = endQuizSchema.parse(body);
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
    });
    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }
    await prisma.quiz.update({
      where: {
        id: quizId,
      },
      data: {
        timeEnded: new Date(),
      },
    });
    return NextResponse.json({ message: "Quiz ended" }, { status: 200 });
  } catch (error) {
    console.error("Error ending quiz:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
