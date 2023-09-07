import React, { useEffect, useState } from "react";
import { Quiz, Question } from "@prisma/client";
import axios from "axios";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { Button } from "../ui/button";
import { redirect, useRouter } from "next/navigation";

type Props = {};

const QuizCard = (props: Props) => {
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

  const router = useRouter();

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
                    <Link href={`/quiz/mcq/${quiz.id}`}>{quiz.topic}</Link>
                  </TableCell>
                  <TableCell>{quiz.quizType}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        router.push(`/quiz/mcq/${quiz.id}`);
                      }}
                    >
                      Take Quiz
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

export default QuizCard;
