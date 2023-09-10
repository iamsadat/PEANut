import AccountCard from "@/components/dashboard/AccountCard";
import HistoryCard from "@/components/dashboard/HistoryCard";
import RecentActivities from "@/components/dashboard/RecentActivities";
import TopicsCard from "@/components/dashboard/TopicsCard";
import React from "react";

type Props = {};

export const metadata = {
  title: "Student Dashboard | PEANut",
  description: "Quiz yourself on anything!",
};

const page = (props: Props) => {
  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <AccountCard />
        <HistoryCard />
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <TopicsCard />
        <RecentActivities />
      </div>
    </main>
  );
};

export default page;
