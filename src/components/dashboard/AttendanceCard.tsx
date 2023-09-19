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

  let currentAttendance;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/api/getUser");
  //       const userData = response.data;
  //       if (!userData) {
  //         console.error("User data is missing in the response.");
  //         return;
  //       }
  //       setUser(userData);
  //       console.log("User data:", userData);

  //       // Only make the POST request if user data is available
  //       if (userData.rollNumber && userData.password) {
  //         const attendanceResponse = await axios.post("/api/attendance", {
  //           rollNumber: userData.rollNumber,
  //           password: userData.password,
  //         });
  //         const { attendancePercentage } = attendanceResponse.data;
  //         setAttendance(attendancePercentage);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
            <div>Fetching...</div>
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
