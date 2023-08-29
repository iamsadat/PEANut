import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function authenticateUser(rollNumber: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { rollNumber },
  });

  if (!user || user.password !== password) {
    return null;
  }
  return user;
}
