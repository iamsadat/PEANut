"use client";

import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { cn } from "@/lib/utils";

type Props = {};

const ProblemStatement = () => {
  const [problem, setProblem] = useState({
    problemName: "",
    problemStatement: "",
    testCases: [{ input: "", output: "" }],
    expectedOutput: "",
    difficulty: "",
    language: "",
    userAnswer: "",
    answerStatus: "",
    quizId: "",
    createdAt: "",
  });
  const params = useParams();

  const id = params.pid;

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios.post("/api/getProblem", { id });
        setProblem(res.data);
        console.log("res", res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProblem();
  }, [id]);

  const difficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500 text-green-500";
      case "medium":
        return "bg-yellow-500 text-yellow-500";
      case "hard":
        return "bg-red-500 text-red-500";
      default:
        return "bg-green-500 text-green-500";
    }
  };

  return (
    <div className="bg black max-h-full">
      <div className="!bg-dark-layer-1">
        {/* TAB */}
        <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
          <div
            className={
              "!bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"
            }
          >
            Description
          </div>
        </div>

        <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
          <div className="px-5">
            {/* Problem heading */}
            <div className="w-full">
              <div className="flex space-x-4">
                <div className="flex-1 mr-2 text-lg dark:text-white font-medium">
                  1. {problem?.problemName}
                </div>
              </div>
              <div className="flex items-center mt-3">
                <div
                  className={cn(
                    difficultyColor(problem?.difficulty),
                    "bg-olive inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize flex-wrap"
                  )}
                >
                  {problem?.difficulty}
                </div>
                <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
                  <BsCheck2Circle />
                </div>
                <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6">
                  <AiFillLike />
                  <span className="text-xs">120</span>
                </div>
                <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6">
                  <AiFillDislike />
                  <span className="text-xs">2</span>
                </div>
                <div className="cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 ">
                  <TiStarOutline />
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemStatement;
