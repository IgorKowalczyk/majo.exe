import prismaClient, { GuildWarns } from "@majoexe/database";
import { Snowflake } from "discord-api-types/globals";

export async function removeWarn(guildId: Snowflake, userId: Snowflake, warnId: GuildWarns["warnId"]) {
 try {
  const warning = await prismaClient.guildWarns.findFirst({
   where: {
    guildId,
    user: {
     discordId: userId,
    },
    warnId,
   },
  });

  if (!warning) return false;

  await prismaClient.guildWarns.delete({
   where: {
    id: warning.id,
   },
  });

  return warning;
 } catch (error) {
  console.error("Failed to remove warning: ", error);
  throw error;
 }
}
