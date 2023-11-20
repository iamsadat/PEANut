import { sendEmail } from "@/helpers/mailer";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
// import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, rollNumber, email, password, department, Section } = reqBody;
    console.log(reqBody);

    const existingUser = await prisma.user.findFirst({
      where: {
        rollNumber: rollNumber,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "user already exists" },
        { status: 400 }
      );
    }

    // const salt = await bcryptjs.genSalt(10);
    // const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        rollNumber,
        department,
        Section,
        email,
        password
      },
    });

    console.log(user);


    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
