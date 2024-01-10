"use client";

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
import { user_id } from "@/helpers/getUser";
import { useRouter } from "next/navigation";
import { History, SearchCodeIcon } from "lucide-react";

type Props = {};

const RecentActivityCard = (props: Props) => {
  try {
    const router = useRouter();
    if (!router.prefetch) return <div>Error</div>;

    return (
      <Card
        className="col-span-4 hover:cursor-pointer hover:opacity-75"
        onClick={() => {
          router.push("/student/history");
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-2xl font-bold">
            <Link href="/student/history">Recent Activity</Link>
          </CardTitle>
          <History size={28} strokeWidth={2.5} />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Here are the quizzes that you have attempted.
          </p>
        </CardContent>
      </Card>
      // <Card className="col-span-4 lg:col-span-3">
      //   <CardHeader>
      //     <CardTitle className="text-2xl font-bold">
      //       <Link href="/student/history">Recent Activity</Link>
      //     </CardTitle>
      //     <CardDescription>
      //       Here are the quizzes that you have attempted.
      //     </CardDescription>
      //   </CardHeader>
      //   {userId !== null ? (
      //     <CardContent className="max-h-[580px] overflow-y-scroll">
      //       <HistoryComponent limit={10} userId={userId} />
      //     </CardContent>
      //   ) : (
      //     <CardContent>
      //       <>No quizzes attempted :(</>
      //     </CardContent>
      //   )}
      // </Card>
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export default RecentActivityCard;
