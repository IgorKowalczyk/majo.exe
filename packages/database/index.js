import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

if (!globalForPrisma.prisma) {
 globalForPrisma.prisma = new PrismaClient();
}

const prisma = globalForPrisma.prisma;

if (process.env.NODE_ENV !== "production") {
 globalForPrisma.prisma = prisma;
}

export default prisma;
