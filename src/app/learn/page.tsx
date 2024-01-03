"use client"

import TopicCard from "@/components/learn/TopicCard";
import { useEffect, useState } from "react";

function LearnPage() {
  const [topicsData, setTopicsData] = useState([]);

  useEffect(() => {
    const fetchTopicsData = async () => {
      try {
        const res = await fetch('/topics.json'); 
        const data = await res.json();
        setTopicsData(data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopicsData();
  }, []);

  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Aptitude and Reasoning</h2>
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        {topicsData.map((topic, index) => (
          <TopicCard key={index} topic={topic} />
        ))}
      </div>
    </main>
  );
}

export default LearnPage;
