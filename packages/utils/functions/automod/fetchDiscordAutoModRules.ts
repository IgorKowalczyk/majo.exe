import { Snowflake } from "discord.js";
import { globalConfig } from "@majoexe/config";
import { RESTError, APIAutoModerationRule } from "discord-api-types/v10";

export async function fetchDiscordAutoModRules(guildId: Snowflake) {
 try {
  const autoModRulesFetch = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${guildId}/auto-moderation/rules`, {
   method: "GET",
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
    "Content-Type": "application/json",
   },
  });

  if (!autoModRulesFetch.ok) return [];

  const autoModRules = (await autoModRulesFetch.json()) as APIAutoModerationRule[] | RESTError;

  if ("code" in autoModRules) return [];

  return autoModRules;
 } catch (error) {
  console.error("Failed to fetch automod rules: ", error);
  throw error;
 }
}
