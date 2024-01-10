"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

function QuestionCreation() {
  const initialState = {
    quizName: "",
    question: "",
    correctAnswer: "",
    option1: "",
    option2: "",
    option3: "",
  };

  const [data, setData] = useState(initialState);

  const resetForm = () => {
    setData(initialState);
  };

  const router = useRouter();

  const notify = (message: string) =>
    toast(message, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    if (response.ok) {
      notify("Successfully created question");
      resetForm();
    } else {
      notify("An error occurred.");
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Create a new quiz
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="quizName"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Quiz Name
              </label>
              <div className="mt-2">
                <input
                  id="quizName"
                  name="quizName"
                  type="text"
                  placeholder="Enter the name of the quiz"
                  autoComplete="quizName"
                  required
                  value={data.quizName}
                  onChange={(e) =>
                    setData({ ...data, quizName: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="question"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Question
              </label>
              <div className="mt-2">
                <input
                  id="question"
                  name="question"
                  type="text"
                  placeholder="Enter your question"
                  autoComplete="question"
                  required
                  value={data.question}
                  onChange={(e) =>
                    setData({ ...data, question: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="correctAnswer"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Correct Answer
              </label>
              <div className="mt-2">
                <input
                  id="correctAnswer"
                  name="correctAnswer"
                  type="text"
                  autoComplete="correctAnswer"
                  placeholder="Enter the correct answer"
                  required
                  value={data.correctAnswer}
                  onChange={(e) =>
                    setData({ ...data, correctAnswer: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="option1"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Option 1
              </label>
              <div className="mt-2">
                <input
                  id="option1"
                  name="option1"
                  type="text"
                  autoComplete="option1"
                  placeholder="Enter option 1"
                  required
                  value={data.option1}
                  onChange={(e) =>
                    setData({ ...data, option1: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="option2"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Option 2
              </label>
              <div className="mt-2">
                <input
                  id="option2"
                  name="option2"
                  type="text"
                  autoComplete="option2"
                  placeholder="Enter option 2"
                  required
                  value={data.option2}
                  onChange={(e) =>
                    setData({ ...data, option2: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="option3"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Option 3
              </label>
              <div className="mt-2">
                <input
                  id="option3"
                  name="option3"
                  type="text"
                  autoComplete="option3"
                  placeholder="Enter option 3"
                  required
                  value={data.option3}
                  onChange={(e) =>
                    setData({ ...data, option3: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="flex w-full my-4 justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white dark:text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Create
              </Button>
              <Button className="flex w-full my-4 justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white dark:text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                <Link
                  href={"/faculty/dashboard"}
                  className="flex justify-center items-center"
                >
                  Home
                  <HomeIcon className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </form>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
}

export default QuestionCreation;
