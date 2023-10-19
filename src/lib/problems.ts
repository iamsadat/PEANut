import { prisma } from "./db";

const codes = prisma.code.findMany();

console.log(codes);

export const problems = [
  {
    id: 1,
    name: "Running Sum of 1d Array",
    code: `class Main {
      public static void main(String[] args) {
          System.out.println("Hello World");
      }
  }`,
    testCases: [
      {
        input: [1, 2, 3, 4],
        output: [1, 3, 6, 10],
      },
      {
        testCase: {
          input: [1, 1, 1, 1, 1],
          output: [1, 2, 3, 4, 5],
        },
      },
      {
        testCase: {
          input: [3, 1, 2, 10, 1],
          output: [3, 4, 6, 16, 17],
        },
      },
    ],
    expectedOutputs: [
      { output: [1, 3, 6, 10] },
      { output: [1, 2, 3, 4, 5] },
      { output: [3, 4, 6, 16, 17] },
    ],
  },
];
