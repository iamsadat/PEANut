import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      problemName,
      problemStatement,
      testCases,
      expectedOutput,
      difficulty,
      language,
      quizId,
    } = reqBody;

    const quizFromDB = await prisma.quiz.findFirst({
      where: {
        id: quizId,
      },
    });

    const problem = await prisma.code.create({
      data: {
        problemName: problemName, // Use the correct key for problemName
        problemStatement: problemStatement,
        testCases: testCases,
        expectedOutput: expectedOutput,
        difficulty: difficulty,
        language: {
          create: {
            language: language,
          },
        },
        createdAt: new Date(),
      },
    });

    return NextResponse.json(problem, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
