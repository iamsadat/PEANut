import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {

    const reqBody = await request.json();
    const { name, department, designation, email, password } = reqBody;
    console.log(reqBody);

    const existingFaculty = await prisma.faculty.findFirst({
      where: {
        email:email
      },
    });

    if (existingFaculty) {
      return NextResponse.json(
        { message: "Faculty already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const Faculty = await prisma.faculty.create({
      data: {
        name,
        designation,
        department,
        email,
        password: hashedPassword,
      },
    });

    console.log(Faculty);
    return NextResponse.json({
      message: "Faculty created successfully",
      success: true,

    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })

  }
}