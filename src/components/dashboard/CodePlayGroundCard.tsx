"use client"

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";
import { Code2 } from 'lucide-react';

const CodePlayGroundCard = () => {
    const router = useRouter();

    return (
            <Card
                className="col-span-4 hover:cursor-pointer hover:opacity-75"
                onClick={() => {
                    router.push("/student/playground")
                }}>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-2xl font-bold">Code Play Ground</CardTitle>
                    <Code2 size={28} strokeWidth={2.5}/>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Try our online code editor and compiler.</p>
                </CardContent>
            </Card>
    )
}

export default CodePlayGroundCard;