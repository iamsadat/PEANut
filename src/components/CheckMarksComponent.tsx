import { Quiz } from "@prisma/client";
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
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import axios from "axios";

type Props = {};

const CheckMarksComponent = (props: Props) => {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getAllQuizzes");
        setAllQuizzes(response.data);
        const user = await axios.get("/api/getUser");
        setUser(user.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchData();
  }, []);
  console.log(allQuizzes);
  console.log(user);

  return (
    <div className="m-4">
      <Table className="mt-4">
        <TableCaption>End of list.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10px]">No.</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>{}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <>
            {allQuizzes.map((quiz: Quiz, index: number) => {
              return (
                <TableRow key={quiz.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <Link href={`/faculty/checkmarks/${quiz.id}`}>
                      {quiz.topic}
                    </Link>
                  </TableCell>
                  <TableCell>{quiz.author}</TableCell>
                  <TableCell>{}</TableCell>
                  <TableCell>
                    <Link href={`/faculty/checkmarks/${quiz.id}`}>
                      <Button>View Students</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </>
        </TableBody>
      </Table>
    </div>
  );
};

export default CheckMarksComponent;
