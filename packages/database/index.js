import { PrismaClient } from "@prisma/client";
import { Logger } from "./src/logger.js";
const globalForPrisma = global;

if (!globalForPrisma.prisma) {
 globalForPrisma.prisma = new PrismaClient();
}

const prisma = globalForPrisma.prisma;

if (process.env.NODE_ENV !== "production") {
 globalForPrisma.prisma = prisma;
 prisma.$use(async (params, next) => {
  const before = Date.now()
  const result = await next(params)
  const after = Date.now()
  Logger("info", `Query ${params.model}.${params.action} took ${after - before}ms`)

  return result
 })
}


export default prisma;
