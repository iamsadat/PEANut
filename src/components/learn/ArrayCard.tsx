"use client"
import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Brackets } from 'lucide-react';
import { useRouter } from "next/navigation";

const ArrayCard = () => {
    const router = useRouter();
    return (
        <>
            <Card
                className="hover:cursor-pointer hover:opacity-75"
                onClick={() => {
                    router.push("/learn/arrays");
                }}
            >                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-2xl font-bold">Arrays</CardTitle>
                    <Brackets size={28} strokeWidth={2.5} />
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Learn about Arrays</p>
                </CardContent>
            </Card>
        </>
    )
}

export default ArrayCard;