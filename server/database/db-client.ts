import prisma from "@prisma/client";

const { PrismaClient } = prisma;

export const prismaClient = new PrismaClient();
