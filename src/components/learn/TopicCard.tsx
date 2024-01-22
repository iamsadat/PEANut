"use client"
import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { BookOpen } from 'lucide-react';

const TopicCard = ({ topic }) => {
    const router = useRouter();

    const handleClick = () => {
        // Assuming your 'topic' object has a 'path' property containing the route path
        router.push(`/student/learn/${topic.path}`);
    };

    return (
        <>
            <Card
                className="hover:cursor-pointer hover:opacity-75"
                onClick={handleClick}
            >
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-lg font-bold">{topic.title}</CardTitle>
                    <BookOpen size={28} strokeWidth={2.5} />
                </CardHeader>
                <CardContent>
                    {/* <p className="text-sm text-muted-foreground">Learn about {topic.title}</p> */}
                </CardContent>
            </Card>
        </>
    );
};

export default TopicCard;
