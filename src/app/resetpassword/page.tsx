"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ResetPassword() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);


    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if (
            password.length > 0 &&
            confirmPassword.length > 0 &&
            password === confirmPassword
        ) {
            setPasswordValid(true);
        } else {
            setPasswordValid(false);
        }
    }, [password, confirmPassword]);


    const resetPassword = async (e: any) => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        e.preventDefault();

        const loadingToastId = toast.loading("Processing...");

        try {
            const response = await axios.post("/api/resetPassword", {
                token,
                password,
            });

            toast.success(response.data.message);

            router.push("/");
        } catch (error: any) {
            toast.error(error.response.data.message);
        }

        toast.dismiss(loadingToastId);
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                    {loading ? "Reseting Your Password" : "Reset Your Password"}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                            New Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="password"
                                placeholder="Enter your New Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                            >
                                Confirm Password
                            </label>
                            <div className="text-sm">
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Re-Enter your New Password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            onClick={resetPassword}
                            disabled={!passwordValid}
                            type="submit"
                            className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white dark:text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            Reset Password
                        </Button>
                        <div className="py-3">

                            <Link href="/">
                                <Button
                                    className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white dark:text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    Back to Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
