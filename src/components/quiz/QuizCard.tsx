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
import { DataTable } from "../table/Table";
import { AllQuizzesTable } from "../component/component";

type Props = {};

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
      // if (form.getValues("type") === "mcq") {
      //router.push(`/student/quiz/mcq/${quiz.id}`);
      // } else if (form.getValues("type") === "open_ended") {
      //   router.push(`/quiz/open-ended/${quizId}`);
      // }
    }, 2000);
  };

  if (showLoader) return <LoadingQuestions finished={finishedLoading} />;

  console.log(allQuizzes);
  console.log("User: ", user);

  return (
    <div className="mx-8">
      <AllQuizzesTable />
    </div>
  );
};

export default QuizCard;
