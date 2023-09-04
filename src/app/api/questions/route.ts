import { getAuthSession } from "@/lib/nextauth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
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

    const reqBody = await request.json();
    const { quizName, question, correctAnswer, option1, option2, option3 } =
      reqBody;

    const quizTopic = await prisma.quiz.findFirst({
      where: {
        topic: quizName,
      },
    });

    if (!quizTopic) {
      return NextResponse.json(
        {
          error: "Quiz not found.", // Handle this case as needed
        },
        { status: 404 }
      );
    }

    const quiz = await prisma.question.create({
      data: {
        question: question,
        answer: correctAnswer,
        quizId: quizTopic.id,
        quizName: quizName,
        options: {
          answer: correctAnswer,
          option1: option1,
          option2: option2,
          option3: option3,
        },
        questionType: "mcq",
      },
    });
    NextResponse.json(quiz);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
