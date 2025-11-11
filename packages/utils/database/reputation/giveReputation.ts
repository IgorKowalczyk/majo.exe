import prismaClient from "@majoexe/database";
import { APIUser, Snowflake } from "discord-api-types/v10";
import type { User } from "discord.js";
import { isAPIUser } from "../../functions/user";

export async function giveReputation(user: APIUser | User, guildId: Snowflake) {
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
          reputation: 1,
        },
      });
      return 1;
    }

    // 32-bit integer limit
    if (rep.reputation >= 2147483647) {
      return rep.reputation;
    }

    await prismaClient.reputation.update({
      where: {
        id: rep.id,
      },
      data: {
        reputation: rep.reputation + 1,
      },
    });

    return rep.reputation + 1;
  } catch (error) {
    console.error("Failed to give reputation:", error);
    throw error;
  }
}
