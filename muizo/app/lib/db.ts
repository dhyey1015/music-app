import { PrismaClient } from "@prisma/client";

//TODO: use singleton instance to prevents multiple instances in development mode
export const prismaClient = new PrismaClient();

