import AccountCard from "@/components/dashboard/AccountCard";
import RecentActivities from "@/components/dashboard/RecentActivities";
import TopicsCard from "@/components/dashboard/TopicsCard";
import AttendanceCard from "@/components/dashboard/AttendanceCard";
import AvailableQuizzes from "@/components/dashboard/AvailableQuizzesComponent";
import LearnCard from "@/components/dashboard/LearnCard";
import React from "react";
import CodePlayGroundCard from "@/components/dashboard/CodePlayGroundCard";
import AssessmentsCard from "@/components/dashboard/AssessmentsCard";

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
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <AvailableQuizzes />
        <AssessmentsCard/>
        <CodePlayGroundCard/>
        <RecentActivities />
        <TopicsCard />
      </div>
    </main>
  );
};

export default DashboardPage;
