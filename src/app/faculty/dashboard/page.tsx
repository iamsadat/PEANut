import AccountCard from "@/components/dashboard/AccountCard";
import CheckMarksCard from "@/components/dashboard/CheckMarksCard";
import QuizMeCard from "@/components/dashboard/QuizMeCard";
import React from "react";

type Props = {};

export const metadata = {
  title: "Faculty Dashboard | PEANut",
  description: "Quiz yourself on anything!",
};

const Dashboard = async (props: Props) => {
  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <QuizMeCard />
        <AccountCard />
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <CheckMarksCard />
      </div>
    </main>
  );
};

export default Dashboard;
