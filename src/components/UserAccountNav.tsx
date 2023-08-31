"use client";

import type { User } from "next-auth";
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
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";

const prisma = new PrismaClient();

const UserAccountNav = () => {
  const fetchUser = async (rollNumber) => {
    try {
      const fetchedUser = await prisma.user.findFirst({
        where: {
          rollNumber,
        },
      });
      return fetchedUser;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  const { data: session } = useSession();

  const userRollNumber = session?.user?.rollNumber;

  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (userRollNumber) {
      fetchUser(userRollNumber)
        .then((fetchedUserData) => {
          setUserData(fetchedUserData);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [userRollNumber]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="w-10 h-10"
          user={{
            name: userData?.name || null,
            image: userData?.email || null,
          }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none text-black">
            {userData?.name && <p className="font-medium">{userData.name}</p>}
            {session?.user?.email && (
              <p className="w-[200px] truncate text-sm text-zinc-700 dark:text-black">
                {session.user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="#" className="text-black">
            Account
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            signOut().catch(console.error);
          }}
          className="text-red-600 cursor-pointer"
        >
          Sign out
          <LogOut className="w-4 h-4 ml-2 " />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
