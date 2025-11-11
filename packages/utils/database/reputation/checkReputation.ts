import prismaClient from "@majoexe/database";
import { Snowflake } from "discord-api-types/globals";

export async function checkReputation(userId: Snowflake, guildId: Snowflake) {
  try {
    const rep = await prismaClient.reputation.findFirst({
      where: {
        guildId,
        userId,
      },
    });

    if (!rep) return 0;
    return rep.reputation || 0;
  } catch (error) {
    console.error("Failed to check reputation:", error);
    throw error;
  }
}
