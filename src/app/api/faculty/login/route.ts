import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs, { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { email, password } = reqbody;
    console.log(reqbody);

    const faculty = await prisma.faculty.findFirst({
      where: { email },
    });

    if (!email) {
      return NextResponse.json(
        { error: "faculty doesn't exist" },
        { status: 400 }
      );
    }

    console.log("faculty exists");

    // @ts-ignore: Object is possibly 'null'.
    if (faculty) {
      const validPassword = await bcryptjs.compare(password, faculty.password);

      if (!validPassword) {
        return NextResponse.json(
          { error: "Invalid Password" },
          { status: 400 }
        );
      }
      console.log(faculty);
    }

    //creating token data

    const tokenData = {
      id: faculty?.id,
      facultyname: faculty?.name,
      email: faculty?.email,
      role: faculty?.role,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
