import { NextResponse, NextRequest } from "next/server";
import { verifyJwtToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPaths = [
    "/",
    "/student/playground",
    "/student/login",
    "/student/signup",
    "/faculty/login",
    "/faculty/signup",
    "/forgotPassword",
    "/getstarted",
  ];

  const isPublicPath = publicPaths.includes(path);

  const token = request.cookies.get("token")?.value || "";

  const qt = request.cookies.get("qt")?.value || "";

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

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // if (!qt && path.startsWith("/student/quiz/mcq/")) {
  //   console.log("Redirecting to /student/dashboard");
  //   return NextResponse.redirect(new URL("/student/dashboard", request.nextUrl));
  // }

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
    "/student/playground",
    "/faculty/login",
    "/faculty/signup",
    "/faculty/dashboard",
    "/faculty/createquiz",
    "/faculty/createquestions",
    "/faculty/dashboard",
    "/codeEditor",
    "/forgotPassword",
    "/student/quiz/instructions",
    "/student/quiz/instructions/:quizId*",
    "/student/quiz/mcq",
    "/student/quiz/mcq/:quizId*",
    "/student/learn",
    "/student/learn/:id*",
    "/getstarted",
  ],
};
