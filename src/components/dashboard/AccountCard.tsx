"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";

type Props = {};

const AccountCard = (props: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  if (!router.prefetch) {
    return <div>Error</div>;
  }
  return (
    <Card
      className="hover:cursor-pointer hover:opacity-75"
      onClick={() => {
        if (pathName.includes("/student")) {
          router.push("/student/account");
        } else {
          router.push("/faculty/account");
        }
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Account</CardTitle>
        <User size={28} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Go to your Account.</p>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
