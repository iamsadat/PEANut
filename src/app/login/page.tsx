"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authOptions } from "@/lib/nextauth";
import axios from "axios";

function LogIn() {
  const [data, setData] = useState({
    rollNumber: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Log In to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="rollNumber"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Roll Number
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                placeholder="Enter roll number"
                required
                value={data.rollNumber}
                onChange={(e) =>
                  setData({ ...data, rollNumber: e.target.value })
                }
                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter password"
                required
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log In
            </button>
            <div className=" py-3 text-sm">
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                {"Don't have an account? Register"}
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
