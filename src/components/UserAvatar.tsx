import { type User } from "next-auth";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { type AvatarProps } from "@radix-ui/react-avatar";
import { AvatarIcon } from "@radix-ui/react-icons";

interface Props {}

const UserAvatar = (props: Props) => {
  return (
    <Avatar>
      <AvatarImage className="w-10 h-10" src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
