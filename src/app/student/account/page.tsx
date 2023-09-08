"use client";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Props = {
  rollNumber: string;
  email: string;
};

const Account = ({ rollNumber, email }: Props) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (rollNumber) {
          const user = await prisma.user.findUnique({
            where: {
              rollNumber: rollNumber,
            },
          });

          setProfile(user);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setProfile(null);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [rollNumber]);

  console.log(profile);

  return (
    <div>
      <Navbar />
      <Card className="m-12">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-2xl font-bold">Account</CardTitle>
          <User size={28} strokeWidth={2.5} />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center font-medium">
            <p>Name: {profile?.name}</p>
          </div>
          <div className="font-medium">
            <p>Roll Number: {profile?.rollNumber}</p>
          </div>
          <div className="font-medium">
            <p>Email: {profile?.email}</p>
          </div>
          <div className="font-medium">
            <p>Department: {profile?.department}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;
