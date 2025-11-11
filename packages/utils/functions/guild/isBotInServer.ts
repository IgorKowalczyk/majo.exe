import { globalConfig } from "@majoexe/config";
import { Snowflake } from "discord-api-types/globals";

export async function isBotInServer(guildId: Snowflake): Promise<boolean> {
  try {
    const res = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${guildId}/members/${process.env.CLIENT_ID}`, {
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`,
      },
    });
    if (res.ok) return true;
    return false;
  } catch (_e) {
    return false;
  }
}
