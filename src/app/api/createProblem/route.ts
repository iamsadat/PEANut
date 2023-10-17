import { languageOptions } from "./../../../lib/languageOptions";
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
      language_id,
    } = reqBody;

    const problem = await prisma.code.create({
      data: {
        problemName: problemName, // Use the correct key for problemName
        problemStatement: problemStatement,
        testCases: testCases,
        expectedOutput: expectedOutput,
        difficulty: difficulty,
        language: {
          language: language,
          id: language_id,
          defaultCode:
            "class Solution {\r\n    public int[] runningSum(int[] nums) {\r\n        \r\n    }\r\n}",
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
