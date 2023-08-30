"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { SignInResponse, signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { authenticateUser } from "@/lib/authUtils";
import { getServerSession } from "next-auth";
const prisma = new PrismaClient();

function LogIn() {
  const [data, setData] = useState({
    rollNumber: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Sign in with credentials
    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      console.log(result);

      console.log(result?.error);

      if (result?.error !== "CredentialsSignin") {
        router.push("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
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
                id="rollNumber"
                name="rollNumber"
                type="text"
                autoComplete="rollNumber"
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
              Log In
            </Button>
            <div className=" py-3 text-sm">
              <Link
                href="/register"
                className="font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                {"Don't have an account? Register"}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
