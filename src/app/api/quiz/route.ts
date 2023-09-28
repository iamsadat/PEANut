import { prisma } from "@/lib/db";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";
import { verifyJwtToken } from "@/lib/auth";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { topic, type, amount } = quizCreationSchema.parse(body);
    const token = (await req.cookies.get("token").value) || "";
    const user = await verifyJwtToken(token);
    console.log(user);
    console.log(token);
    const name = user.name;
    console.log(name);

    const quiz = await prisma.quiz.create({
      data: {
        quizType: type,
        timeStarted: new Date(),
        userId: user.id,
        author: user.name,
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
    } else if (type === "open_ended") {
      type openQuestion = {
        question: string;
        answer: string;
      };
      await prisma.question.createMany({
        data: data.questions.map((question: openQuestion) => {
          return {
            question: question.question,
            answer: question.answer,
            quizId: quiz.id,
            questionType: "open_ended",
          };
        }),
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
        { error: error.message },
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
        { error: "Quiz not found." },
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
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}
