"use client";

import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

type Props = {
  text: string;
};

const SignInButton = ({ text }: Props) => {
  return (
    <Button>
      <Link href="/register">{text}</Link>
    </Button>
  );
};

export default SignInButton;
