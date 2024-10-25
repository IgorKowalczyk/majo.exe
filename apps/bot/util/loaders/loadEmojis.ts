import { globalConfig } from "@majoexe/config";
import { Logger } from "@majoexe/util/functions/util";
import type { APIUser, DiscordAPIError, PartialEmoji } from "discord.js";
import type { Majobot } from "../..";

const emojiDownloadList = {
 success: "https://cdn.discordapp.com/emojis/963333541112987668.png",
 error: "https://cdn.discordapp.com/emojis/963333541226217472.png",
 giveaway: "https://cdn.discordapp.com/emojis/963333542442590268.gif",
 discord_logo: "https://cdn.discordapp.com/emojis/963333540630646804.png",
 member: " https://cdn.discordapp.com/emojis/963333541305925692.png",
 channel: "https://cdn.discordapp.com/emojis/963333540244758578.png",
 role: "https://cdn.discordapp.com/emojis/963333541142339605.png",
 stage_channel: "https://cdn.discordapp.com/emojis/963333542199324692.png",
 rules_channel: "https://cdn.discordapp.com/emojis/963333541561790474.png",
 boosts_animated: "https://cdn.discordapp.com/emojis/963333480899567646.gif",
 discord_badges: "https://cdn.discordapp.com/emojis/963333479129550889.gif",
 status_online: "https://cdn.discordapp.com/emojis/963333541888929842.png",
 status_idle: "https://cdn.discordapp.com/emojis/963333541846986782.png",
 status_dnd: "https://cdn.discordapp.com/emojis/844882506587176960.png",
 status_offline: "https://cdn.discordapp.com/emojis/963333542383869952.png",
 cpu_icon: "https://cdn.discordapp.com/emojis/963333540374781972.png",
 drive_icon: "https://cdn.discordapp.com/emojis/963333540844564540.png",
 ram_icon: "https://cdn.discordapp.com/emojis/963333541616304128.png",
 discord_partner: "https://cdn.discordapp.com/emojis/963333540739694602.png",
 owner_crown: "https://cdn.discordapp.com/emojis/856161806199947285.png",
 emoji_bar_1: "https://cdn.discordapp.com/emojis/963333479184076810.png",
 emoji_bar_2: "https://cdn.discordapp.com/emojis/963333479322517534.png",
 bot_badge_part_1: "https://cdn.discordapp.com/emojis/963333478982754375.png",
 bot_badge_part_2: "https://cdn.discordapp.com/emojis/963333479301545984.png",
 pikachu: "https://cdn.discordapp.com/emojis/963333541507264512.png",
 loading: "https://cdn.discordapp.com/emojis/963333542065090630.gif",
 hypesquad: "https://cdn.discordapp.com/emojis/963333540962009168.png",
 hypesquad_balance: "https://cdn.discordapp.com/emojis/963333540546752544.png",
 hypesquad_bravery: "https://cdn.discordapp.com/emojis/963333540840353882.png",
 hypesquad_brilliance: "https://cdn.discordapp.com/emojis/963333541104586802.png",
 verified_bot_developer: "https://cdn.discordapp.com/emojis/963333540429303828.png",
 early_supporter: "https://cdn.discordapp.com/emojis/963333540844552252.png",
 bug_hunter_1: "https://cdn.discordapp.com/emojis/963333479452508190.png",
 bug_hunter_2: "https://cdn.discordapp.com/emojis/963333479578357830.png",
 discord_employee: "https://cdn.discordapp.com/emojis/963333540756455444.png",
 slash_commands: "https://cdn.discordapp.com/emojis/963333541565968384.png",
 mention: "https://cdn.discordapp.com/emojis/963333541259792384.png",
 settings: "https://cdn.discordapp.com/emojis/963333541716963348.png",
};

export async function uploadEmoji(clientId: string, client: Majobot, { name, image }: { name: string; image: Buffer }): Promise<void> {
 try {
  const emojiUploadTime = performance.now();

  const emojiUpload = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/applications/${clientId}/emojis`, {
   method: "POST",
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    name,
    image: `data:image/png;base64,${image.toString("base64")}`,
   }),
  });

  if (!emojiUpload.ok) {
   try {
    const error = (await emojiUpload.json()) as DiscordAPIError;
    throw new Error(`Failed to upload emoji: ${error} (${emojiUpload.statusText})`);
   } catch (_err) {
    throw new Error(`Failed to upload emoji: ${emojiUpload.statusText}`);
   }
  }

  const emoji = (await emojiUpload.json()) as PartialEmoji;

  if (!emoji) {
   throw new Error("Failed to upload emoji: No emoji returned from Discord API");
  }

  Logger("event", `Uploaded ${emoji.name} emoji in ${client.performance(performance.now() - emojiUploadTime)}`);

  if (emoji.animated) {
   client.config.emojis[emoji.name] = `<a:${emoji.name}:${emoji.id}>`;
  } else {
   client.config.emojis[emoji.name] = `<:${emoji.name}:${emoji.id}>`;
  }
 } catch (error) {
  Logger("error", `Error uploading emoji: ${error}`);
 }
}

export default async function loadEmojis(client: Majobot): Promise<void> {
 try {
  const emojiLoadTime = performance.now();

  const userFetch = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/users/@me`, {
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
   },
  });

  if (!userFetch.ok) {
   throw new Error(`Failed to fetch user: ${userFetch.statusText}`);
  }

  const user = (await userFetch.json()) as APIUser;

  const emojiListFetch = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/applications/${user.id}/emojis`, {
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
   },
  });

  if (!emojiListFetch.ok) {
   throw new Error(`Failed to fetch emojis: ${emojiListFetch.statusText}`);
  }

  const emojis = (await emojiListFetch.json()) as { items: PartialEmoji[] };

  if (!emojis || !emojis.items) {
   throw new Error("Failed to fetch emojis: No emojis returned from Discord API");
  }

  Logger("event", `Fetched ${emojis.items.length} emojis in ${client.performance(performance.now() - emojiLoadTime)}`);

  for (const emoji of emojis.items) {
   if (emoji.animated) {
    client.config.emojis[emoji.name] = `<a:${emoji.name}:${emoji.id}>`;
   } else {
    client.config.emojis[emoji.name] = `<:${emoji.name}:${emoji.id}>`;
   }
  }

  for (const [name, url] of Object.entries(emojiDownloadList)) {
   const emoji = emojis.items.find((emoji) => emoji.name === name);

   if (!emoji) {
    Logger("warn", `Emoji ${name} not found in fetched emojis!`);

    const emojiFile = (await fetch(url)) as Response;

    if (!emojiFile.ok) {
     throw new Error(`Failed to fetch emoji: ${emojiFile.statusText}`);
    }

    const buffer: Uint8Array[] = [];
    for await (const chunk of emojiFile.body as unknown as AsyncIterable<Uint8Array>) {
     buffer.push(chunk);
    }

    await uploadEmoji(user.id, client, { name, image: Buffer.concat(buffer) });
    continue;
   }
  }
 } catch (error: unknown) {
  Logger("error", `Error loading emojis: ${error}`);
 }
}
