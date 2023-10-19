"use client";

import React, { useEffect, useState } from "react";
import { Quiz, Question, User } from "@prisma/client";
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
import { cn } from "@/lib/utils";

type Props = {};

const AvailableProblems = (props: Props) => {
  const [allProblems, setAllProblems] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getAllProblems");
        setAllProblems(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    setShowLoader(true);
    setTimeout(() => {
      setFinishedLoading(true);
      // if (form.getValues("type") === "mcq") {
      //router.push(`/student/quiz/mcq/${quiz.id}`);
      // } else if (form.getValues("type") === "open_ended") {
      //   router.push(`/quiz/open-ended/${quizId}`);
      // }
    }, 2000);
  };

  if (showLoader) return <LoadingQuestions finished={finishedLoading} />;

  console.log(allProblems);

  const difficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-500 font-medium capitalize";
      case "medium":
        return "text-yellow-500 font-bold capitalize";
      case "hard":
        return "text-red-500 font-bold capitalize";
      default:
        return "text-green-500 font-bold capitalize";
    }
  };

  return (
    <div className="mx-8">
      <Table className="mt-4 px-4">
        <TableCaption>End of list.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10px]">No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Difficulty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <>
            {allProblems.map((problem, index: number) => {
              return (
                <TableRow key={problem.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <Link href={`/problems/${problem.id}`}>
                      {problem.problemName}
                    </Link>
                  </TableCell>
                  <TableCell
                    className={cn(difficultyColor(problem?.difficulty))}
                  >
                    {problem.difficulty}
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <Button onClick={handleClick}>
                      <Link href={`/problems/${problem.id}`}>
                        Attempt Problem
                      </Link>
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

export default AvailableProblems;
