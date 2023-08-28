"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
  text: string;
};

const SignUpButton = ({ text }: Props) => {
  return (
    <Button>
      <Link href="/register">{text}</Link>
    </Button>
  );
};

export default SignUpButton;
