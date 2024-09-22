import jwt from "jsonwebtoken";
import { NoUserError } from "../errors/userError";
import { prismaClient } from "./prismaClient";



export function getUserEmailFromToken(token: string | undefined): string | null {
  if (!token) return null;
  try {
    const decoded = jwt.decode(token) as { email: string } | null;
    return decoded?.email || null;
  } catch {
    return null;
  }
}



export async function getUserByEmail(email: string | null) {
  if (!email) throw new NoUserError("User not authenticated");
  const user = await prismaClient.user.findUnique({ where: { email } });
  if (!user) throw new NoUserError("User does not exist");
  return user;
}