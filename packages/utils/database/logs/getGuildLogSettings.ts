import prismaClient, { GuildLogType } from "@majoexe/database";
import { Snowflake } from "discord.js";

export async function getGuildLogSettings(guildId: Snowflake, type: GuildLogType) {
 try {
  const settings = await prismaClient.guildLogsSettings.findFirst({
   where: {
    guildId,
    type,
   },
  });

  return settings;
 } catch (e) {
  console.log("Failed to get guild log settings:", e);
  throw e;
 }
}
