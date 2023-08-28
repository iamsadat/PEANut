import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  console.log(reqBody);
  const { rollNumber, email, password } = reqBody;
  const user = await prisma.user.create({
    data: {
      rollNumber,
      email,
      password,
    },
  });
  // ...
  return NextResponse.json({ message: "Hello World" });
}
