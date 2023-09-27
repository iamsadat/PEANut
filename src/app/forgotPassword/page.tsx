"use client"
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const forgotPasswordPage = () => {

    const [email, setEmail] = useState("");

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
      };

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/forgotPassword",email)
            
        } catch (error:any) {

            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
              Forgot your Password?
            </h2>
            <h5 className="mt-8 text-center text-2l font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                Enter your Email Address you'd like your password reset information sent to.
            </h5>
          </div>
    
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                    Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    placeholder="Enter Email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

            <div>
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white dark:text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Request Reset Link
            </Button>
            </div>
            </form>
          </div>
        </div>
      );
    }

export default forgotPasswordPage;