import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  console.log(reqBody);
  const { name, rollNumber, email, password } = reqBody;

  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "user already exists" },
      { status: 400 }
    );
  }

  const user = await prisma.user.create({
    data: {
      name,
      rollNumber,
      email,
      password,
    },
  });
  // ...
  return NextResponse.json({ message: "Success!" });
}
