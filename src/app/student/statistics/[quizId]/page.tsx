import AccuracyCard from "@/components/statistics/AccuracyCard";
import QuestionsList from "@/components/statistics/QuestionsList";
import ResultsCard from "@/components/statistics/ResultsCard";
import TimeTakenCard from "@/components/statistics/TimeTakenCard";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    quizId: string;
  };
};

const StatisticsPage = async ({ params: { quizId } }: Props) => {
  const quiz = await prisma.quiz.findUnique({
    where: {
      id: quizId,
    },
    include: {
      questions: true,
    },
  });

  if (!quiz) {
    return redirect("/");
  }

  let accuracy: number = 0;
  if (quiz.quizType == "mcq") {
    let totalCorrect = quiz.questions.reduce((acc, question) => {
      if (question.isCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);
    accuracy = (totalCorrect / quiz.questions.length) * 100;
  }

  accuracy = (accuracy * 100) / 100;

  return (
    <div className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Statistics</h2>
        <div className="flex items-center space-x-2">
          <Link href="/student/dashboard" className={buttonVariants()}>
            <LucideLayoutDashboard className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-7">
        <ResultsCard accuracy={accuracy} />
        <AccuracyCard accuracy={accuracy} />
        <TimeTakenCard timeEnded={new Date()} timeStarted={quiz.timeStarted} />
      </div>
      <QuestionsList questions={quiz.questions} />
    </div>
  );
};

export default StatisticsPage;
