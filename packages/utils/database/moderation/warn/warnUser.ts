import prismaClient from "@majoexe/database";
import type { APIUser, Snowflake } from "discord-api-types/v10";
import type { User } from "discord.js";
import { isAPIUser } from "../../../functions/user";

export async function warnUser(guildId: Snowflake, user: APIUser | User, reason: string, warnedBy: Snowflake) {
  try {
    const globalName = (isAPIUser(user) ? user.global_name : user.globalName) || user.username;
    const warning = await prismaClient.guildWarns.findMany({
      where: {
        guildId,
        user: {
          discordId: user.id,
        },
      },
      take: 1,
      orderBy: {
        warnId: "desc",
      },
    });

    const warnNumber = warning && warning[0] ? (warning.length === 0 ? 1 : warning[0].warnId + 1) : 1;

    const createdWarning = await prismaClient.guildWarns.create({
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
              discriminator: user.discriminator,
            },
          },
        },
        warnId: warnNumber,
        message: reason,
        createdById: warnedBy,
      },
    });

    return createdWarning;
  } catch (error) {
    console.error("Failed to warn user: ", error);
    throw error;
  }
}
