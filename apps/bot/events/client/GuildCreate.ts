import prismaClient from "@majoexe/database";
import { Logger } from "@majoexe/util/functions/util";
import type { Guild } from "discord.js";

export async function GuildCreate({ guild }: { guild: Guild }): Promise<void> {
 try {
  await prismaClient.guild.upsert({
   where: {
    guildId: guild.id,
   },
   update: {},
   create: {
    guildId: guild.id,
   },
  });
 } catch (error: Error | any) {
  Logger("error", "Failed to create guild:", error.message);
 }
}
