"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { CheckSquareIcon } from "lucide-react";

type Props = {};

const CheckMarksCard = (props: Props) => {
  const router = useRouter();
  return (
    <Card
      className="hover:cursor-pointer hover:opacity-75 col-span-4"
      onClick={() => {
        router.push("/faculty/checkmarks");
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Check Marks</CardTitle>
        <CheckSquareIcon size={28} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Check the marks of a quiz.
        </p>
      </CardContent>
    </Card>
  );
};

export default CheckMarksCard;
