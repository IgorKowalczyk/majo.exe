import prisma, { type Prisma } from "@majoexe/database";
import { Snowflake } from "discord-api-types/globals";

export async function createLog(guildId: Snowflake, userId: Snowflake, data: Omit<Prisma.GuildLogsCreateInput, "id" | "guild" | "user" | "createdAt">) {
 try {
  await prisma.guildLogs.create({
   data: {
    guild: {
     connectOrCreate: {
      where: {
       guildId,
      },
      create: {
       guildId,
      },
     },
    },
    user: {
     connect: {
      id: userId,
     },
    },
    ...data,
   },
  });
 } catch (e) {
  console.log("Failed to create log:", e);
  throw e;
 }
}
