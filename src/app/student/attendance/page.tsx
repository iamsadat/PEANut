"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

type Props = {};

const Attendance = (props: Props) => {
  const [attendance, setAttendance] = useState<string | null>(null); // Initialize attendance as null

  useEffect(() => {
    const rollNumber = 160921737074;
    const password = "Sadat786";

    // axios
    //   .post("/api/attendance", { rollNumber, password })
    //   .then((response) => {
    //     const { attendancePercentage } = response.data;
    //     setAttendance(attendancePercentage); // Update attendance state
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }, []);

  return (
    <div>
      <div>Attendance</div>
      {attendance !== null ? (
        <div>{`Attendance Percentage: ${attendance}`}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Attendance;
