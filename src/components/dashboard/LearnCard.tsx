"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {useRouter} from "next/navigation";
import { Code2 } from 'lucide-react';

type Props = {};

const LearnCard = (props: Props) => {
    const router = useRouter();
    if (!router.prefetch) {
        return <div>Error</div>;
      }
    return (
        <Card
            className="hover:cursor-pointer hover:opacity-75"
            onClick={() => {
                router.push("/learn");
            }}
        >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-2xl font-bold">Learn</CardTitle>
                <Code2 size={28} strokeWidth={2.5} />
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Learn Data Structures</p>
            </CardContent>
        </Card>
    )
}

export default LearnCard;