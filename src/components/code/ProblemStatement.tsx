"use client";

import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

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
  console.log("params", params);

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

  return (
    <div className="bg black">
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
                <div className="flex-1 mr-2 text-lg text-white font-medium">
                  1. {problem?.problemName}
                </div>
              </div>
              <div className="flex items-center mt-3">
                <div
                  className={`text-olive bg-olive inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
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

              {/* Problem Statement(paragraphs) */}
              <div className="text-white text-sm">
                {problem?.problemStatement}
              </div>

              {/* Examples */}
              <div className="mt-4">
                {problem.testCases?.map((testCase, index) => (
                  <>
                    <div key={index}>Input: {testCase.input}</div>
                    <div>Output: {testCase.output}</div>
                  </>
                ))}
              </div>

              {/* Constraints */}
              <div className="my-5">
                <div className="text-white text-sm font-medium">
                  Constraints:
                </div>
                <ul className="text-white ml-5 list-disc">
                  <li className="mt-2">
                    <code>2 ≤ nums.length ≤ 10</code>
                  </li>

                  <li className="mt-2">
                    <code>-10 ≤ nums[i] ≤ 10</code>
                  </li>
                  <li className="mt-2">
                    <code>-10 ≤ target ≤ 10</code>
                  </li>
                  <li className="mt-2 text-sm">
                    <strong>Only one valid answer exists.</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemStatement;
