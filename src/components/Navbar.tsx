import Link from "next/link";
import React from "react";

import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";
import { useRouter } from "next/router";

const Navbar = () => {
  // const path = navigation.pathname;
  let currentPage;
  // if (path.includes("student")) {
  //   currentPage = "Student";
  // } else {
  //   currentPage = "Faculty";
  // }

  // console.log(path);

  return (
    <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        {/* Logo */}
        <div className="flex flex-row">
          <Link href={"/"} className="flex items-center gap-2">
            <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
              PEANut
            </p>
          </Link>
          {currentPage ? (
            <>
              <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
                /
              </p>
              <Link href={"/"} className="flex items-center gap-2">
                <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
                  {currentPage}
                </p>
              </Link>
            </>
          ) : null}
        </div>
        <div className="flex items-center">
          <ThemeToggle className="mr-4" />
          {/* session?.user ? (
            //<UserAccountNav user={session.user} />
          ) : (
             //<SignInButton text={"Sign In"} />
          )*/}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
