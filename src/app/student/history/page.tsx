import HistoryComponent from "@/components/HistoryComponent";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import React from "react";
import { user_id } from "@/helpers/getUser";

type Props = {};

const HistoryPage = (props: Props) => {
  let id;
  const fetchData = async () => {
    try {
      const response = fetch("/api/getUser")
        .then((res) => res.json())
        .then((data) => {
          id = data.userId;
          console.log(data.userId);
        });
      const user = await user_id();
      id = user;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px]">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">History</CardTitle>
            <Link href="/student/dashboard" className={buttonVariants()}>
              <LucideLayoutDashboard className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </CardHeader>
        <CardContent className="max-h-[60vh] overflow-scroll">
          <HistoryComponent limit={10} userId={id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryPage;
