import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { language_id, source_code, stdin, expected_output } = reqBody;

  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
    },
    data: reqBody,
  };
}
