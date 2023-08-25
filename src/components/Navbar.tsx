import { getAuthSession } from "@/lib/nextauth";
import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import UserAccountNav from "./UserAccountNav";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();
  console.log(session?.user);

  return (
    <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-900 z-[10] h-fit border-b border-zinx-300 py-2">
      <div className="flex items-center justify-between gap-2 px-8 mx-auto max-w-7xl">
        <Link href="/" className="flex items-center gap-2">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
            PEANut
          </p>
        </Link>
        <div className="flex items-center">
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <SignInButton text="Sign in" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
