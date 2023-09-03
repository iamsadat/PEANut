// pages/api/auth/login.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
  if (req.method !== "GET") {
    return NextResponse.json(
      { error: "Only GET requests allowed" },
      { status: 405 }
    );
  }

  const reqBody = await req.json();

  try {
    const { rollNumber, password } = reqBody;

    const user = await prisma.user.findFirst({
      where: {
        rollNumber,
        password,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Perform any additional actions or generate tokens here
    // ...

    return NextResponse.json({ message: "Success!" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
