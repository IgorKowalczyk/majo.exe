import prismaClient from "@majoexe/database";
import { Snowflake } from "discord-api-types/globals";

export async function checkXP(userId: Snowflake, guildId: Snowflake) {
  try {
    const xp = await prismaClient.guildXp.findFirst({
      where: {
        guildId,
        userId,
      },
    });

    if (!xp) return 0;
    return xp.xp || 0;
  } catch (error) {
    console.error("Failed to check XP:", error);
    throw error;
  }
}
