import prisma, { type Prisma } from "@majoexe/database";
import { Snowflake } from "discord-api-types/globals";

export async function createLog(guildId: Snowflake, userId: Snowflake, data: Omit<Prisma.GuildLogsCreateInput, "id" | "guild" | "user" | "authorId" | "createdAt">) {
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
     connectOrCreate: {
      where: {
       discordId: userId,
      },
      create: {
       discordId: userId,
       name: "Unknown",
       discriminator: "0000",
       global_name: "Unknown#0000",
      },
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
