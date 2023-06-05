/* eslint-disable global-require */

import { PrismaClient } from "@prisma/client";
import { Logger } from "./logger.js";

const globalForPrisma = global;
let prisma;

if (process.env.RUNTIME === "edge") {
 const { PrismaClient } = require("@prisma/client/edge.js");
 prisma = new PrismaClient();
 prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  Logger("info", `Edge query ${params.model}.${params.action} took ${after - before}ms`);
  return result;
 });
} else {
 if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient();
 }
 prisma = globalForPrisma.prisma;
}

if (process.env.NODE_ENV !== "production") {
 globalForPrisma.prisma = prisma;
 prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  Logger("info", `Query ${params.model}.${params.action} took ${after - before}ms`);
  return result;
 });
}

export default prisma;
