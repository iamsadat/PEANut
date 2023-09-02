import { getAuthSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import axios from "axios";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "You must be logged in.",
        },
        { status: 401 }
      );
    }
    const body = await req.json();
    const { question, answer, option1, option2, option3 } = body;
    const game = await prisma.question.create({
      data: {
        question: question,
        answer: answer,
        gameId: session.user.id,
        options: {
          option1: option1,
          option2: option2,
          option3: option3,
        },
        questionType: "mcq",
      },
    });
    NextResponse.json(game);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
