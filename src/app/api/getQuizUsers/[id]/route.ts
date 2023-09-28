import { getUser } from "@/helpers/getUser";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { quizId } = await reqBody;

    const quizUsers = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      include: {
        user: true,
      },
    });

    if (!quizUsers) {
      // Log a message or return an error response to indicate that the quiz was not found.
      console.error("Quiz not found.");
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Users who have attempted the quiz",
      data: quizUsers,
    });
  } catch (error) {
    console.error("Error fetching quiz users:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// const quizUsers = await prisma.quiz.findUnique({
//   where: {
//     id: quizId, // Use 'quizId' here
//   },
//   include: {
//     user: true,
//   },
// });

// if (!quizUsers) {
//   // Log a message or return an error response to indicate that the quiz was not found.
//   console.error("Quiz not found.");
//   return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
// }

// console.log("quizUsers API: ", quizUsers);
