import { verifyJwtToken } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { endQuizSchema } from "@/schemas/questions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: Response) {
  try {
    const body = await req.json();
    const token = (await req.cookies.get("token").value) || "";
    const user = await verifyJwtToken(token);
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
        user: {
          connect: {
            id: user.id,
          },
        },
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
