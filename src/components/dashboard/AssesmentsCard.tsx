"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { PencilLine } from "lucide-react";

type Props = {};

const AssesmentsCard = (props: Props) => {
    const router = useRouter();
    if (!router.prefetch) return <div>Error</div>;
    return (
        <Card
            className="col-span-4 hover:cursor-pointer hover:opacity-75"
            onClick={() => {
                router.push("/student/assesments");
            }}
        >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-2xl font-bold">Assesments</CardTitle>
                <PencilLine size={28} strokeWidth={2.5} />

            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">View available Assesments.</p>
            </CardContent>
        </Card>
    );
};

export default AssesmentsCard;
