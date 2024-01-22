import MCQ from "@/components/MCQ";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    quizId: string;
  };
};

const MCQPage = async ({ params: { quizId } }: Props) => {
  // Ensure quizId is provided and not empty
  if (!quizId) {
    console.log("quizId:", quizId);
    return <div>Invalid quizId {quizId} </div>; // You can provide an error message or handle this case as needed
  }

  const startTiming = await prisma.quiz.update({
    where: {
      id: quizId,
    },
    data: {
      timeStarted: new Date(),
    },
  });

  const quiz = await prisma.quiz.findUnique({
    where: {
      id: quizId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          options: true,
        },
      },
    },
  });

  console.log("quiz:", quiz?.questions);

  if (!quiz) {
    return redirect("/quiz");
  }

  return <MCQ quiz={quiz} />;
};

export default MCQPage;
