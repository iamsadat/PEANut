import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
  const reqBody = await req.json();
  console.log(reqBody);
  const { name, rollNumber, department, email, password } = reqBody;

  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
      rollNumber: rollNumber,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { statusText: "User already exists" },
      { status: 400 }
    );
  }

  const user = await prisma.user.create({
    data: {
      name,
      rollNumber,
      department,
      email,
      password,
    },
  });
  // ...
  return NextResponse.json({ message: "Success!" });
}
