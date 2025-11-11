import prismaClient from "@majoexe/database";
import { Snowflake } from "discord-api-types/globals";

export async function fetchXPSettings(guildId: Snowflake) {
  try {
    const guild = await prismaClient.guild.findUnique({
      where: {
        guildId,
      },
    });

    if (!guild) {
      await prismaClient.guild.create({
        data: {
          guildId,
        },
      });

      return {
        enableXP: true,
        enableXPLastChanged: new Date(),
        enableXPLevelUpMessage: true,
        enableXPLevelUpMessageLastChanged: new Date(),
      };
    }

    return {
      enableXP: guild.enableXP,
      enableXPLastChanged: guild.enableXPLastChanged,
      enableXPLevelUpMessage: guild.enableXPLevelUpMessage,
      enableXPLevelUpMessageLastChanged: guild.enableXPLevelUpMessageLastChanged,
    };
  } catch (error) {
    console.log("Failed to fetch xp settings:", error);
    throw error;
  }
}

export async function setXPSettings(guildId: Snowflake, enableXP: boolean) {
  try {
    await prismaClient.guild.update({
      where: {
        guildId,
      },
      data: {
        enableXP,
        enableXPLastChanged: new Date(),
      },
    });

    return true;
  } catch (error) {
    console.log("Failed to set xp settings:", error);
    throw error;
  }
}

export async function setXPLevelUpMessageSettings(guildId: Snowflake, enableXPLevelUpMessage: boolean) {
  try {
    await prismaClient.guild.update({
      where: {
        guildId,
      },
      data: {
        enableXPLevelUpMessage,
        enableXPLevelUpMessageLastChanged: new Date(),
      },
    });

    return true;
  } catch (error) {
    console.log("Failed to set xp level up message:", error);
    throw error;
  }
}
