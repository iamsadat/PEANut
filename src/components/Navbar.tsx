"use client";

import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import UserAccountNav from "./UserAccountNav";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();

  let isLoggedIn = true;

  console.log(pathName);

  if (
    pathName === "/" || 
    pathName ==="/getstarted"||
    pathName === "/student/login" ||
    pathName === "/student/signup" ||
    pathName === "/faculty/login" ||
    pathName === "/faculty/signup"
  ) {
    isLoggedIn = false;
  }

  const studentPath = pathName.includes("/student");
  const facultyPath = pathName.includes("/faculty");

  return (
    <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        {/* Logo */}
        <div className="flex flex-row">
          {studentPath ? (
            <>
              <Link href={"/"} className="flex items-center gap-2">
                <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
                  PEANut
                </p>
              </Link>
              <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
                /
              </p>
              <Link
                href={"/student/dashboard"}
                className="flex items-center gap-2"
              >
                <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
                  Student
                </p>
              </Link>
            </>
          ) : facultyPath ? (
            <>
              <Link href={"/"} className="flex items-center gap-2">
                <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
                  PEANut
                </p>
              </Link>
              <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
                /
              </p>
              <Link
                href={"/faculty/dashboard"}
                className="flex items-center gap-2"
              >
                <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
                  Faculty
                </p>
              </Link>
            </>
          ) : (
            <>
              <Link href={"/"} className="flex items-center gap-2">
                <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
                  PEANut
                </p>
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center justify-center">
          <ThemeToggle className="mr-4" />
          {isLoggedIn ? (
            <UserAccountNav />
          ) : (
            <div className="flex flex-row">
              <Link href={"/student/login"}>
                <Button className="mr-2">Log In</Button>
              </Link>
              <Link href={"/student/signup"}>
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
