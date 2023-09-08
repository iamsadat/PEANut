import { prisma } from "@/lib/db";
import { Quiz } from "@prisma/client";
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getAllQuizzes");
        setAllQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchData();
  }, []);
  console.log(allQuizzes);

  return (
    <div>
      <h1>Quiz Card</h1>
      <Table className="mt-4">
        <TableCaption>End of list.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10px]">No.</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Author</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <>
            {allQuizzes.map((quiz: Quiz, index: number) => {
              return (
                <TableRow key={quiz.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <Link href={`/student/statistics/${quiz.id}`}>
                      {quiz.topic}
                    </Link>
                  </TableCell>
                  <TableCell>{quiz.quizType}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        redirect(`/student/statistics/${quiz.id}`);
                      }}
                    >
                      View Stats
                    </Button>
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
