import prismaClient from "@majoexe/database";
import { Logger } from "@majoexe/util/functions";

export async function GuildCreate({ guild }) {
 try {
  await prismaClient.guild.upsert({
   where: {
    guildId: guild.id,
   },
   update: {},
   create: {
    guildId: guild.id,
   },
  });
 } catch (error) {
  Logger.error("Failed to create guild:", error);
 }
}
