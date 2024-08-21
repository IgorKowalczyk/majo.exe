import prismaClient from "@majoexe/database";
import { GiveawaysManager, type GiveawayData } from "discord-giveaways";
import type { Majobot } from "../..";
import type { ColorResolvable, Snowflake } from "discord.js";
import { globalConfig } from "@majoexe/config";

export default function giveaway(client: Majobot): GiveawaysManager {
 const Giveaways = class extends GiveawaysManager {
  async getAllGiveaways() {
   return await prismaClient.giveaways.findMany();
  }

  async saveGiveaway(messageId: Snowflake, giveawayData: GiveawayData) {
   return await prismaClient.giveaways.create({
    data: {
     messageId,
     data: giveawayData,
     guild: {
      connectOrCreate: {
       where: { guildId: giveawayData.guildId },
       create: { guildId: giveawayData.guildId },
      },
     },
    },
   });
  }

  async editGiveaway(messageId: Snowflake, giveawayData: GiveawayData) {
   return await prismaClient.giveaways.update({
    where: { messageId },
    data: {
     data: giveawayData,
    },
   });
  }

  async deleteGiveaway(messageId: Snowflake) {
   return await prismaClient.giveaways.delete({
    where: { messageId },
   });
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
