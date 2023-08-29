// pages/api/auth/login.js
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { rollNumber, password } = req.body;

    try {
      const user = await prisma.user.findFirst({
        where: {
          rollNumber,
          password,
        },
      });

      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      // Perform any additional actions or generate tokens here
      // ...

      res.status(200).json({ message: "Authentication successful" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Database error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
