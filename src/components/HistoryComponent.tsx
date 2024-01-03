import { Clock, CopyCheck } from "lucide-react";
import Link from "next/link";
import React from "react";
import { prisma } from "@/lib/db";
import { user_id } from "@/helpers/getUser";

type Props = {
  limit: number;
  userId: string;
};

const HistoryComponent = async ({ limit, userId }: Props) => {
  const user = await user_id();
  console.log("User ID in history component but using the helper:", user);
  if (user !== null) {
    const quizzes = await prisma.quiz.findMany({
      where: {
        userId,
      },
      orderBy: {
        timeStarted: "desc",
      },
    });

    console.log("Quizzes: ", quizzes);
    console.log("User ID in history component:", user);

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
                    {}
                  </Link>
                  <p className="flex items-center px-2 text-white rounded w-fit bg-slate-800">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(quiz.timeEnded).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">MCQ</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else if (user === null || user === undefined) {
    return (
      <div className="space-y-8">
        <p className="text-base font-medium leading-none underline">
          No quizzes attempted yet.
        </p>
      </div>
    );
  }
};

export default HistoryComponent;
