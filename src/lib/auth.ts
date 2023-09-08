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

    // Access the "role" claim from the payload
    const role = payload.role;

    const id = payload.id;
    const User = payload;

    return User;
  } catch (error) {
    return null;
  }
}
