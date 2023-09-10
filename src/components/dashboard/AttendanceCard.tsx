"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Attendance from "@/app/student/attendance/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type Props = {};

const AttendanceCard = (props: Props) => {
  const [attendance, setAttendance] = useState<string | null>(null);
  const [user, setUser] = useState({
    rollNumber: "",
    password: "",
  });

  const router = useRouter();

  useEffect(() => {
    axios.get("/api/getUser").then((response) => {
      const { user: userData } = response.data;
      setUser(userData);
    });

    axios
      .post("/api/attendance", {
        rollNumber: user?.rollNumber,
        password: user?.password,
      })
      .then((response) => {
        const { attendancePercentage } = response.data;
        setAttendance(attendancePercentage);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user?.password, user?.rollNumber]);

  console.log(user);

  return (
    <div>
      <Card
        className="hover:cursor-pointer hover:opacity-75"
        onClick={() => {
          router.push("/student/attendance");
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-2xl font-bold">Attendance</CardTitle>
          {attendance !== null ? (
            <div className="text-2xl font-semibold">{attendance}</div>
          ) : (
            <div>Loading...</div>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your current college attendance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceCard;
