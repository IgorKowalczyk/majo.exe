import prisma from "@majoexe/database";
import { Snowflake } from "discord.js";

export async function deleteDatabaseAutoModRule(guildId: Snowflake, ruleId: Snowflake) {
  try {
    await prisma.autoMod.deleteMany({
      where: {
        guildId,
        ruleId,
      },
    });
  } catch (error) {
    console.error("Failed to delete automod rule: ", error);

    throw error;
  }
}
