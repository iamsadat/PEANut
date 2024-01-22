import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyJwtToken } from "@/lib/auth";
import { endQuizSchema } from "@/schemas/questions";

export async function POST(request: NextRequest) {
  try {
    // const body = await request.json();
    // const token = (await request.cookies.get("token").value) || "";
    // const user = await verifyJwtToken(token);
    // console.log("Req:", body);

    // // const quiz = await prisma.quiz.findUnique({
    // //   where: {
    // //     id: quizId,
    // //   },
    // // });
    // // if (!quiz) {
    // //   return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    // // }
    // // await prisma.quiz.update({
    // //   where: {
    // //     id: quizId,
    // //   },
    // //   data: {
    // //     timeStarted: new Date(),
    // //     user: {
    // //       connect: {
    // //         id: user.id,
    // //       },
    // //     },
    // //   },
    // // });
    const tokenData = {
      quizStart: "yes",
    };

    const qt = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "quiz started",
      success: true,
    });

    response.cookies.set("qt", qt, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    console.error("Unexpected error:", error.message);
    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
