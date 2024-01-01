"use client"
import FilteredQuizzes from "@/components/quiz/FilteredQuizzes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Content() {
    const [topicsData, setTopicsData] = useState([]);
    const fullPath = usePathname();
    const path = fullPath.split('/').pop();

    useEffect(() => {
        const fetchTopicsData = async () => {
            try {
                const res = await fetch('/content.json');
                const data = await res.json();
                setTopicsData(data);
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        };

        fetchTopicsData();
    }, []);

    return (
        <div className="mx-auto max-w-3xl px-4">
            {topicsData[path] ? (
                <div>
                    <h2 className="text-center text-3xl font-bold underline mt-5 mb-5">{topicsData[path].topic}</h2>
                    <p className=" text-xl mt-4 mb-8">{topicsData[path].description}</p>
                    <div className="mt-4">
                        <h3 className=" text-2xl font-semibold underline mb-10">Formulas</h3>
                        <ul className="list-disc list-inside text-lg">
                            {topicsData[path].formulas.map((formula, index) => (
                                <li key={index}>{formula}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-10">
                        <h3 className=" text-2xl font-semibold underline mb-10">Take a mock test on {topicsData[path].topic}</h3>
                        <FilteredQuizzes topic={topicsData[path].topic} />
                    </div>
                </div>
            ) : (
                <p className="text-center text-xl mt-10">Loading...</p>
            )}
        </div>
    )
}
