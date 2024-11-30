import prismaClient from "@majoexe/database";
import { Snowflake } from "discord-api-types/globals";

export async function listWarns(guildId: Snowflake, userId: Snowflake) {
 try {
  const warnings = await prismaClient.guildWarns.findMany({
   where: {
    guildId,
    user: {
     discordId: userId,
    },
   },
  });

  return warnings;
 } catch (error) {
  console.error("Failed to list warnings:", error);
  throw error;
 }
}
