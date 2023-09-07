"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

function SignUp() {
  
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    department: "",
    designation: "",
    email: "",
    password: "",
  });

  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if(data.email.length > 0 && data.password.length > 0 && data.department.length > 0) {
        setLoading(true);
    } else {
        setLoading(false);
    }
    
      const response = await axios.post("/api/Faculty/Signup", data);
      console.log("Signup success", response.data);
      router.push("/Faculty/Login");
      
  } catch (error:any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);

      
  }finally {
      setLoading(false);
  }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
        {loading ? "Creating a new account" : "Create a new account"}
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
              htmlFor="department"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Department
            </label>
            <div className="mt-2">
              <input
                id="department"
                name="department"
                type="text"
                autoComplete="department"
                placeholder="Enter Department"
                required
                value={data.department}
                onChange={(e) =>
                  setData({ ...data, department: e.target.value })
                }
                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="designation"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Designation
            </label>
            <div className="mt-2">
              <input
                id="designation"
                name="designation"
                type="text"
                autoComplete="designation"
                placeholder="Enter designation"
                required
                value={data.designation}
                onChange={(e) =>
                  setData({ ...data, designation: e.target.value })
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
                href="/api/Faculty/Login"
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