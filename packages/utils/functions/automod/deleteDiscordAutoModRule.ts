import { globalConfig } from "@majoexe/config";
import { Snowflake } from "discord.js";

export async function deleteDiscordAutoModRules(guildId: Snowflake, ruleId: Snowflake) {
  try {
    const deleteRequest = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${guildId}/auto-moderation/rules/${ruleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    return deleteRequest.ok;
  } catch (error) {
    console.error("Failed to delete automod rule: ", error);
    throw error;
  }
}
