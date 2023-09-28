import { User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";

type Props = {};

const QuizUsersCard = (props: Props) => {
  const pathName = usePathname();
  console.log("pathName:", pathName);
  const quizId = pathName.substring(pathName.lastIndexOf("/") + 1);
  const [quizUsers, setQuizUsers] = useState<User[]>([]);
  const [usersData, setUsersData] = useState<User[]>([]);

  useEffect(() => {
    const fetchQuizUsers = async () => {
      try {
        const response = await axios.post(`/api/getQuizUsers/${quizId}`, {
          quizId,
        });
        console.log("API response data:", response.data);
        setQuizUsers(response.data.data);
        setUsersData(response.data.data.user);
      } catch (error) {
        console.error("Error fetching quiz users:", error);
      }
    };
    fetchQuizUsers();
  }, [quizId]);

  console.log("quizUsers:", quizUsers);
  console.log("usersData:", usersData);

  return (
    <div>
      {usersData.length > 0 ? (
        <Table className="mt-4">
          <TableCaption>End of list.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10px]">No.</TableHead>
              <TableHead>Roll Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersData.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{user.rollNumber}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Link href={`/student/statistics/${quizId}`}>
                    <Button>View Result</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No users have taken this quiz yet.</div>
      )}
    </div>
  );
};

export default QuizUsersCard;
