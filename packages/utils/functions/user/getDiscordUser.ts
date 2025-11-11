import { globalConfig } from "@majoexe/config";
import { APIUser, RESTError, Snowflake } from "discord-api-types/v10";

export async function getDiscordUser(userId: Snowflake) {
  try {
    const discordApiFetch = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${process.env.TOKEN}`,
      },
    });

    if (!discordApiFetch.ok) return null;

    const user = (await discordApiFetch.json()) as APIUser | RESTError;

    if ("code" in user) return null;

    return user;
  } catch (_error) {
    return null;
  }
}
