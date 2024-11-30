import prismaClient from "@majoexe/database";
import type { APIUser, Snowflake } from "discord-api-types/v10";
import { GuildMember } from "discord.js";

interface ErrorCode {
 error: string;
 code: number;
}

function isGuildMember(user: APIUser | GuildMember): user is GuildMember {
 return "guild" in user;
}

export async function setReputation(user: APIUser | GuildMember, guildId: Snowflake, amount: number): Promise<number | ErrorCode> {
 try {
  const userId = isGuildMember(user) ? user.id : user.id;
  const username = isGuildMember(user) ? user.user.username : user.username;
  const globalName = isGuildMember(user) ? user.user.globalName || user.user.username : user.global_name || user.username;
  const avatar = isGuildMember(user) ? user.user.avatar : user.avatar;
  const discriminator = isGuildMember(user) ? user.user.discriminator : user.discriminator;

  const rep = await prismaClient.reputation.findFirst({
   where: {
    guildId,
    userId,
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
        discordId: userId,
       },
       create: {
        discordId: userId,
        name: username,
        global_name: globalName,
        avatar,
        discriminator,
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
 } catch (_error) {
  return {
   error: "Failed to set reputation",
   code: 500,
  };
 }
}
