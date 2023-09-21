import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import HistoryComponent from "../HistoryComponent";
import { prisma } from "@/lib/db";
import { getUser } from "@/helpers/getUser";

type Props = {};

const RecentActivityCard = async (props: Props) => {
  let id;
  const fetchData = async () => {
    try {
      const response = fetch("http://localhost:3000/api/getUser", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          id = data.userId;
          console.log(data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
  const games_count = await prisma.quiz.count({
    where: {
      userId: id,
    },
  });
  console.log(games_count);

  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Link href="/student/history">Recent Activity</Link>
        </CardTitle>
        <CardDescription>
          You have completed a total of {games_count} quizzes.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[580px] overflow-y-scroll">
        <HistoryComponent limit={10} userId={id} />
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
