"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

function LogIn() {
    const [data, setData] = useState({
      email: "",
      password: "",
    });
  
    const router = useRouter();
    const [loading, setLoading] = useState(false);

  
    // const { data: session } = useSession();
  
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      try {
        setLoading(true);
        const response = await axios.post("/api/Faculty/Login", data);
        console.log("Login success", response.data);
        toast.success("Login success");
        router.push("/Faculty/profile");
    } catch (error:any) {
        console.log("Login failed", error.message);
        toast.error(error.message);
    } finally{
    setLoading(false);
    }
};
  
    return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            {loading ? "Processing" : "Log In to your account"}
          </h2>
        </div>
  
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  placeholder="Enter email"
                  required
                  value={data.email}
                  onChange={(e) =>
                    setData({ ...data, email: e.target.value })
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
                  href="/signup"
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