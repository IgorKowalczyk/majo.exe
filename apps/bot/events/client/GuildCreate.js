import prismaClient from "@nyxia/database";
import { Logger } from "@nyxia/util/functions/util";

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
