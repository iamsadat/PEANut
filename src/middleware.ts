import { NextResponse, NextRequest } from "next/server";
import { verifyJwtToken } from "./lib/auth";
// import { PrismaClient } from "@prisma/client/edge";

// const prisma = new PrismaClient();

export async function middleware(request: NextRequest) {
  // const codes = await prisma.code.findMany();

  // const testcases = codes[0].testCases;
  // const testcasesJson = JSON.parse(testcases);
  // const firstExpectedOutput = testcasesJson[0].expectedOutput;
  // console.log(typeof testcasesJson);
  // console.log(firstExpectedOutput);

  // console.log(typeof testcases);

  // console.log(testcases);
  const path = request.nextUrl.pathname;

  const publicPaths = [
    "/",
    "/student/login",
    "/student/signup",
    "/faculty/login",
    "/faculty/signup",
    "/forgotPassword",
  ];

  const isPublicPath = publicPaths.includes(path);

  const token = request.cookies.get("token")?.value || "";

  const userRole = await verifyJwtToken(token);

  if (token && isPublicPath) {
    if (userRole?.role === "student") {
      return NextResponse.redirect(
        new URL("/student/dashboard", request.nextUrl)
      );
    } else if (userRole?.role === "faculty") {
      return NextResponse.redirect(
        new URL("/faculty/dashboard", request.nextUrl)
      );
    }
  }

  if (path.startsWith("/codeEditor") && userRole?.role !== "dev") {
    return NextResponse.redirect(new URL("/soon", request.nextUrl));
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (token && !isPublicPath) {
    if (userRole?.role === "student" && !path.startsWith("/student")) {
      return NextResponse.redirect(
        new URL("/student/dashboard", request.nextUrl)
      );
    } else if (userRole?.role === "faculty" && !path.startsWith("/faculty")) {
      return NextResponse.redirect(
        new URL("/faculty/dashboard", request.nextUrl)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/student/account",
    "/student/availablequizzes",
    "/student/statistics",
    "/student/dashboard",
    "/student/login",
    "/student/signup",
    "/student/attendance",
    "/faculty/login",
    "/faculty/signup",
    "/faculty/dashboard",
    "/faculty/createquiz",
    "/faculty/createquestions",
    "/faculty/dashboard",
    "/codeEditor",
    "/student/attendance",
    "/forgotPassword",
  ],
};
