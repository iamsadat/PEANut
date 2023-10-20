import AccountCard from "@/components/dashboard/AccountCard";
import RecentActivities from "@/components/dashboard/RecentActivities";
import TopicsCard from "@/components/dashboard/TopicsCard";
import AttendanceCard from "@/components/dashboard/AttendanceCard";
import AvailableQuizzes from "@/components/dashboard/AvailableQuizzesComponent";
import LearnCard from "@/components/dashboard/LearnCard"
import React from "react";

type Props = {};

const DashboardPage = async (props: Props) => {
  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <AccountCard />
        <LearnCard />
        <AttendanceCard />
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <AvailableQuizzes />
        <TopicsCard />
        <RecentActivities />
      </div>
    </main>
  );
};

export default DashboardPage;
