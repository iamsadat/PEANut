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
import LoadingQuestions from "../LoadingQuestions";

type Props = {
  topic: String;
};

const QuizCard = (props: Props) => {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [user, setUser] = useState<User | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getAllQuizzes");
        setAllQuizzes(response.data);
        const data = await axios.get("/api/getUser");
        setUser(data.data.data);
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

    }, 2000);
  };
  const filteredQuizzes = allQuizzes.filter((quiz: Quiz) => quiz.topic === props.topic);

  // if (showLoader) return <LoadingQuestions finished={finishedLoading} />;

  // console.log(allQuizzes);
  console.log("User: ", user);

  return (
    <div className="mx-8">
      <Table className="mt-4">
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Author</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <>
            {filteredQuizzes.map((quiz: Quiz, index: number) => {
              return (
                <TableRow key={quiz.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <Link href={`/student/quiz/mcq/${quiz.id}`}>
                      {quiz.topic}
                    </Link>
                  </TableCell>
                  <TableCell>{quiz.author}</TableCell>
                  <TableCell>
                    <Button onClick={handleClick} className="flex justify-end">
                      <Link href={`/student/quiz/instructions/${quiz.id}`}>
                        Take Quiz
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

export default QuizCard;
