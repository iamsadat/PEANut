"use client"
import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation";
import { BookOpen } from 'lucide-react';

const TopicCard = ({topic}) => {
    const router = useRouter();
    return (
        <>
            <Card
                className="hover:cursor-pointer hover:opacity-75"
                onClick={() => {
                    router.push(`/learn/${topic}`);
                }}
            >                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-lg font-bold">{topic}</CardTitle>
                    <BookOpen size={28} strokeWidth={2.5} />
                </CardHeader>
                <CardContent>
                    {/* <p className="text-sm text-muted-foreground">Learn about {topic}</p> */}
                </CardContent>
            </Card>
        </>
    )
}

export default TopicCard;