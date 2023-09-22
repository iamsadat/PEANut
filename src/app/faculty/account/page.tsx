"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { LucideLayoutDashboard, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const AccountPage = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    name: "",
    password: "",
    department: "",
    designation: "",
    role: "",
  });

  useEffect(() => {
    axios.get("/api/getFaculty").then((response) => {
      const userData = response.data.data;
      setUser(userData);
    });
  }, []);

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[60vh]">
      <Card className="flex flex-col items-center justify-center">
        <CardHeader className="max-w-md w-full shadow-md rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Account</CardTitle>
            <User size={28} strokeWidth={2.5} />
          </div>
        </CardHeader>
        <CardContent className="max-w-md w-full shadow-md rounded-lg p-6 space-y-4">
          {user?.name && (
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="font-semibold">Name:</div>
                <div className="ml-4 font-semibold">{user.name}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-semibold">Email:</div>
                <div className="ml-4 font-semibold">{user.email}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-semibold">Department:</div>
                <div className="ml-4 font-semibold">{user.department}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-semibold">Designation:</div>
                <div className="ml-4 font-semibold">{user.designation}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-end mt-4 ml-6">
        <Link href="/student/dashboard" className={buttonVariants()}>
          <LucideLayoutDashboard className="mr-2" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AccountPage;
