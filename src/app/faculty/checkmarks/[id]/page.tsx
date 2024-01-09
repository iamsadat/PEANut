"use client";
import { StudentResults } from "@/components/component/StudentResults";
import QuizUsersCard from "@/components/quiz/QuizUsersCard";
import { User } from "@prisma/client";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  params: {
    quizId: string;
  };
};

const QuizUsersPage = ({ params: { quizId } }: Props) => {
  const [quizUsers, setQuizUsers] = useState<User[]>([]); // You can provide an error message or handle this case as needed
  try {
    useEffect(() => {
      const fetchQuizUsers = async () => {
        if (quizId) {
          const response = await axios.get(`/api/getQuizUsers/${quizId}`);
          setQuizUsers(response.data);
        }
      };
      fetchQuizUsers();
    }, [quizId]);
  } catch (error) {
    console.error("Error fetching quiz users:", error);
  }

  console.log("quizId:", quizId);

  console.log("quiz:", quizUsers);

  if (!quizUsers) {
    return redirect("/faculty/checkmarks");
  }

  return (
    <div>
      <StudentResults />
    </div>
  );
};

export default QuizUsersPage;
