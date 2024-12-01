import { Snowflake } from "discord-api-types/globals";
import { getMemberGuilds } from "./getMemberGuilds";

export async function getGuildFromMemberGuilds(guildId: Snowflake, token: string) {
 try {
  const guilds = await getMemberGuilds(token);
  if (!guilds) return null;
  const guild = guilds.find((guild) => guild.id === guildId);
  if (!guild) return null;
  return guild;
 } catch (_e) {
  return null;
 }
}
