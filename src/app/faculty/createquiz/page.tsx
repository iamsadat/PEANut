import QuizCreation from "@/components/QuizCreation";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export const metadata = {
  title: "Quiz | PEANut",
};

const QuizPage = async (props: Props) => {
  return (
    <>
      <QuizCreation />
    </>
  );
};

export default QuizPage;
