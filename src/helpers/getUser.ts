import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

let userId: string | null = null;

export const getUser = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    const decodedToken: any = await jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    );
    userId = decodedToken.id;
    return decodedToken.id;
  } catch (error: any) {
    console.log("Error!");

    throw new Error(error.message);
  }
};

export const user_id = async () => {
  return await userId;
};
