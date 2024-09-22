import { prismaClient } from "./prismaClient";

export const connectDB = async () => {
  return prismaClient.$connect();
};