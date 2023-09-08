import { prisma } from "@/lib/db";
import { Clock, CopyCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  limit: number;
  userId: string;
};

const HistoryComponent = async ({ limit, userId }: Props) => {
  const quizzes = await prisma.quiz.findMany({
    where: {
      userId,
    },
    take: limit,
    orderBy: {
      timeStarted: "desc",
    },
  });

  return (
    <div className="space-y-8">
      {quizzes.map((quiz) => {
        return (
          <div className="flex items-center justify-between" key={quiz.id}>
            <div className="flex items-center">
              <CopyCheck className="mr-3" />
              <div className="ml-4 space-y-1">
                <Link
                  href={`/statistics/${quiz.id}`}
                  className="text-base font-medium leading-none underline"
                >
                  {quiz.topic}
                </Link>
                <p className="flex items-center px-2 text-white rounded w-fit bg-slate-800">
                  <Clock className="w-4 h-4 mr-1" />
                  {new Date(quiz.timeStarted).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">MCQ</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryComponent;
