import prismaClient from "@majoexe/database";
import { Logger } from "@majoexe/util/functions";

export async function GuildDelete({ guild }) {
 try {
  const guildExists = await prismaClient.guilds.findFirst({
   where: {
    guildId: guild.id,
   },
  });

  if (guildExists) {
   await prismaClient.guilds.delete({
    where: {
     guildId: guild.id,
    },
   });
  }
 } catch (error) {
  Logger.error("Failed to create guild:", error);
 }
}
