"use client"
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
            {topicsData[path] ? (
                <div>
                    <h2 className="text-center text-3xl font-bold underline mt-3">{topicsData[path].topic}</h2>
                    <p className="text-center text-xl mt-10">{topicsData[path].description}</p>
                </div>
            ) : (
                <p className="text-center text-xl mt-10">No data found for the specified path: {path}</p>
            )}
        </div>
    )
}
