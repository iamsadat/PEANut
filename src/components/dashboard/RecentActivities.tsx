import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import HistoryComponent from "../HistoryComponent";

type Props = {};

const RecentActivityCard = async (props: Props) => {
  const quizCount = await prisma.quiz.count({
    where: {
      id: "",
    },
  });

  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Link href="/student/history">Recent Activity</Link>
        </CardTitle>
        <CardDescription>
          You have completed a total of {quizCount} quizzes.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[580px] overflow-y-scroll">
        <HistoryComponent limit={10} userId={""} />
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
