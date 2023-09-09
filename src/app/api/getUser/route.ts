import jwt from "jsonwebtoken"; // Import the jwt library
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest, response: NextResponse) {
  const token = request.cookies.get("token")?.value || "";

  try {
    // Verify the JWT token using your secret key
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

    // Extract user data from the token
    const user = decodedToken.user;

    // Fetch user data from the database
    const userFromDb = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    return NextResponse.json(userFromDb, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
