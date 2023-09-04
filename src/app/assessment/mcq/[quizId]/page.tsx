import MCQ from "@/components/MCQ";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect, useRouter } from "next/navigation";
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

  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

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

  if (!quiz) {
    return redirect("/quiz");
  }

  return <MCQ quiz={quiz} />;
};

export default MCQPage;
