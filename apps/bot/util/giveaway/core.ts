import { globalConfig } from "@majoexe/config";
import prismaClient, { Prisma } from "@majoexe/database";
import { Giveaway, GiveawaysManager, type GiveawayData } from "discord-giveaways";
import type { ColorResolvable, Snowflake } from "discord.js";
import type { Majobot } from "@/index";

export default function giveaway(client: Majobot) {
 const Giveaways = class extends GiveawaysManager {
  async getAllGiveaways() {
   const giveaways = await prismaClient.giveaways.findMany();
   return giveaways as unknown as Giveaway[];
  }

  async saveGiveaway(messageId: Snowflake, giveawayData: GiveawayData) {
   await prismaClient.giveaways.create({
    data: {
     messageId,
     data: giveawayData as unknown as Prisma.JsonObject,
     guild: {
      connectOrCreate: {
       where: { guildId: giveawayData.guildId },
       create: { guildId: giveawayData.guildId },
      },
     },
    },
   });

   return true;
  }

  async editGiveaway(messageId: Snowflake, giveawayData: GiveawayData) {
   await prismaClient.giveaways.update({
    where: { messageId },
    data: {
     data: giveawayData as unknown as Prisma.JsonObject,
    },
   });

   return true;
  }

  async deleteGiveaway(messageId: Snowflake) {
   await prismaClient.giveaways.delete({
    where: { messageId },
   });

   return true;
  }
 };

 const manager = new Giveaways(client, {
  forceUpdateEvery: 10000,
  default: {
   botsCanWin: false,
   embedColorEnd: globalConfig.defaultColor as ColorResolvable,
   embedColor: globalConfig.defaultColor as ColorResolvable,
   // exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
   reaction: client.config.emojis.giveaway,
  },
 });

 return manager;
}
