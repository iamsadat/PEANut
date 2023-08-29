"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function SignUp() {
  const [data, setData] = useState({
    name: "",
    rollNumber: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Send registration data to your API endpoint
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    router.push("/api/auth/signin");
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Create a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                autoComplete="name"
                required
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter email address"
                required
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
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
                className="block text-sm font-medium leading-6 text-gray-900 px-4 dark:text-white"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
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
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white dark:text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Register
            </Button>
            <div className="text-sm py-2">
              <a
                href="/api/auth/signin"
                className="font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                Already have an account? Sign in
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
