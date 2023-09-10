import { prisma } from "@/lib/db";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";
import { verifyJwtToken } from "@/lib/auth";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { topic, type, amount } = quizCreationSchema.parse(body);
    const token = localStorage.getItem("token");
    let user;
    if (token) {
      user = await verifyJwtToken(token);
    }
    user = user as { id: string };

    const quiz = await prisma.quiz.create({
      data: {
        quizType: type,
        timeStarted: new Date(),
        userId: user.id,
        topic,
      },
    });

    const { data } = await axios.post(
      `${process.env.API_URL as string}/api/questions`,
      {
        amount,
        topic,
        type,
      }
    );

    if (type === "mcq") {
      type mcqQuestion = {
        question: string;
        answer: string;
        option1: string;
        option2: string;
        option3: string;
      };

      const manyData = data.questions.map((question: mcqQuestion) => {
        // mix up the options lol
        const options = [
          question.option1,
          question.option2,
          question.option3,
          question.answer,
        ].sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          quizId: quiz.id,
          questionType: "mcq",
        };
      });

      await prisma.question.createMany({
        data: manyData,
      });
    }

    return NextResponse.json({ quizId: quiz.id }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const url = new URL(req.url);
    const quizId = url.searchParams.get("quizId");
    if (!quizId) {
      return NextResponse.json(
        { error: "You must provide a quiz id." },
        {
          status: 400,
        }
      );
    }

    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      include: {
        questions: true,
      },
    });
    if (!quiz) {
      return NextResponse.json(
        { error: "quiz not found." },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      { quiz },
      {
        status: 400,
      }
    );
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
