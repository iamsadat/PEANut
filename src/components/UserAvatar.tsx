import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
