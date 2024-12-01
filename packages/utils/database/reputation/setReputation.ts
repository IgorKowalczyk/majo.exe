import prismaClient from "@majoexe/database";
import type { APIUser, Snowflake } from "discord-api-types/v10";
import type { User } from "discord.js";
import { isAPIUser } from "../../functions/user";

export async function setReputation(user: APIUser | User, guildId: Snowflake, amount: number): Promise<number> {
 try {
  const globalName = (isAPIUser(user) ? user.global_name : user.globalName) || user.username;

  const rep = await prismaClient.reputation.findFirst({
   where: {
    guildId,
    userId: user.id,
   },
  });

  if (!rep) {
   await prismaClient.reputation.create({
    data: {
     guild: {
      connectOrCreate: {
       where: {
        guildId,
       },
       create: {
        guildId,
       },
      },
     },
     user: {
      connectOrCreate: {
       where: {
        discordId: user.id,
       },
       create: {
        discordId: user.id,
        name: user.username,
        global_name: globalName,
        avatar: user.avatar,
        discriminator: user.discriminator,
       },
      },
     },
     reputation: amount,
    },
   });
   return amount;
  }

  await prismaClient.reputation.update({
   where: {
    id: rep.id,
   },
   data: {
    reputation: amount,
   },
  });

  return amount;
 } catch (error) {
  console.error("Failed to set reputation:", error);
  throw error;
 }
}
