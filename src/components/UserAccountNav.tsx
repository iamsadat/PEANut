"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { verifyJwtToken } from "@/lib/auth";
import { NextRequest } from "next/server";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Props = {};

const UserAccountNav = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/student/logout");
      toast.success("Logout successful");
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  let token;
  let user;
  // if (request.cookies) {
  //   token = request.cookies.get("token")?.value || "";
  // }
  // if (token) {
  //   user = verifyJwtToken(token);
  // }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white dark:bg-gray-950" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {/* {user.payLoad.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-zinc-700 dark:text-white">
                {user.email}
              </p>
            )} */}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="#">Account</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={() => logout()}
          className="text-red-600 cursor-pointer"
        >
          Log out
          <LogOut className="w-4 h-4 ml-2 " />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
