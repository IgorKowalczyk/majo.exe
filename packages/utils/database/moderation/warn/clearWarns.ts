import prismaClient from "@majoexe/database";
import { Snowflake } from "discord-api-types/globals";

export async function clearWarns(userId: Snowflake, guildId: Snowflake) {
 try {
  const allWarnings = await prismaClient.guildWarns.deleteMany({
   where: {
    guildId,
    user: {
     discordId: userId,
    },
   },
  });

  return allWarnings?.count || 0;
 } catch (error) {
  console.error("Failed to clear warns:", error);
  throw error;
 }
}
