"use client";

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
import { useRouter } from "next/navigation";
import LoadingQuestions from "../LoadingQuestions";

type Props = {};

const QuizCard = (props: Props) => {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);

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

  const handleClick = () => {
    setShowLoader(true);
    setTimeout(() => {
      setFinishedLoading(true);
      // if (form.getValues("type") === "mcq") {
      router.push("/student/quiz/mcq/clm9n0ny90000tm14puw28cot");
      // } else if (form.getValues("type") === "open_ended") {
      //   router.push(`/quiz/open-ended/${quizId}`);
      // }
    }, 2000);
  };

  if (showLoader) return <LoadingQuestions finished={finishedLoading} />;

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
                    <Button onClick={handleClick}>Take Quiz</Button>
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
