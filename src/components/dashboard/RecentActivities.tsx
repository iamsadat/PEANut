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

type Props = {};

const RecentActivityCard = async (props: Props) => {
  try {
    const userId = await user_id();
    console.log("User ID in the dashboard:", userId);

    return (
      <Card className="col-span-4 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            <Link href="/student/history">Recent Activity</Link>
          </CardTitle>
          <CardDescription>
            Here are the quizzes that you have attempted.
          </CardDescription>
        </CardHeader>
        <CardContent className="max-h-[580px] overflow-y-scroll">
          {userId !== null ? (
            <HistoryComponent limit={10} userId={userId} />
          ) : (
            <>No quizzes attempted</>
          )}
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle errors as needed
    return null; // Return null or an error message if necessary
  }
};

export default RecentActivityCard;
