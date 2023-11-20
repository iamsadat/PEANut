"use client";

import React, { useEffect, useState } from "react";
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
import axios from "axios";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

type Props = {};

const UserAccountNav = () => {
  const [user, setUser] = useState({
    id: "",
    rollNumber: "",
    name: "",
    email: "",
    password: "",
    department: "",
    Section: "",
    emailVerified: null,
    image: null,
    designation: "",
    role: "",
  });
  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (pathname.includes("/student")) {
          const response = await axios.get("/api/getUser");
          const userData = response.data.data;
          if (!userData) {
            console.error("User data is missing in the response.");
            return;
          }
          setUser(userData);
        } else if (pathname.includes("/faculty")) {
          const response = await axios.get("/api/getFaculty");
          const userData = response.data.data;
          if (!userData) {
            console.error("User data is missing in the response.");
            return;
          }
          setUser(userData);
          console.log("User data:", userData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [pathname]);

  const logout = async () => {
    try {
      await axios.post("/api/student/logout");
      toast.success("Logout successful");
      window.location.href = "/";
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white dark:bg-gray-950" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {pathname.includes("/student") ? (
              <>
                {user.name && <p className="font-medium">{user.name}</p>}
                {user.rollNumber && (
                  <p className="w-[200px] truncate text-sm text-zinc-700 dark:text-white">
                    {user.rollNumber}
                  </p>
                )}
                {user.department && user.Section && <p className="w-[200px] truncate text-sm text-zinc-700 dark:text-white">{user.department} - {user.Section}</p>}
              </>
            ) : (
              <>
                {user.name && <p className="font-medium">{user.name}</p>}
                {user.email && (
                  <p className="w-[200px] truncate text-sm text-zinc-700 dark:text-white">
                    {user.email}
                  </p>
                )}
              </>
            )}
            {/* {user.email && (
              <p className="w-[200px] truncate text-sm text-zinc-700 dark:text-white">
                {user.email}
              </p>
            )} */}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          {pathname.includes("/student") ? (
            <Link href="/student/account">Account</Link>
          ) : (
            <Link href="/faculty/account">Account</Link>
          )}
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
