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
        <div>
            <div>
                <div
                    className="banner pt-4 sm:pt-navbar px-16 relative flex flex-col justify-center items-center sm:px-0 sm:justify-between sm:flex-row"
                >
                    <div className="hidden sm:flex w-88 h-full items-center justify-center">
                        <img className="w-full pb-20" src="/home1.svg" />
                    </div>

                    <div className="mx-auto max-w-4xl px-3">
                        {topicsData[path] ? (
                            <div>
                                <h2 className="text-center text-3xl font-bold underline mt-2 mb-4">{topicsData[path].topic}</h2>
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
                                    <h3 className=" text-2xl font-semibold underline mb-5">Take a mock test on {topicsData[path].topic}</h3>
                                    <FilteredQuizzes topic={topicsData[path].topic} />
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-xl mt-10">Loading...</p>
                        )}
                    </div>
                    <div
                        className=" sm:w-88 flex flex-row-reverse justify-between sm:h-full sm:items-center sm:justify-center"
                    >
                        <div>
                            <img
                                className="w-60 sm:w-88 pt-8 sm:pt-20"
                                src="/home2.svg"
                            />
                        </div>
                        <div>
                            <img
                                className="w-60 sm:hidden sm:w-full pt-8"
                                src="/home4.svg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
