import { jwtVerify } from "jose";

export function getJwtSecretKey() {
  const secret = process.env.TOKEN_SECRET;

  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }

  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: string | Uint8Array) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());

    const role = payload.role;
    const id = payload.id;
    const rollNumber = payload.rollNumber;
    const name = payload.facultyname;
    const email = payload.email;
    return { role, id, rollNumber, name, email } as {
      role: string;
      id: string;
      rollNumber: string;
      name: string;
      email: string;
    };
  } catch (error) {
    return null;
  }
}
