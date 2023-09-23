import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchQuizzes(userId, limit) {
  const quizzesFromDb = await prisma.quiz.findMany({
    where: {
      userId,
    },
    take: limit,
    orderBy: {
      timeStarted: "desc",
    },
  });
  return quizzesFromDb;
}
