import prismaClient from "@majoexe/database";
import { Snowflake } from "discord-api-types/globals";

export async function fetchLogs(guildId: Snowflake, page: number, count = 20) {
  try {
    const logs = await prismaClient.guildLogs.findMany({
      where: {
        guildId,
      },
      take: count,
      skip: (page - 1) * count,
      orderBy: {
        createdAt: "asc",
      },
      include: {
        user: true,
      },
    });

    return logs;
  } catch (e) {
    console.log("Failed to fetch logs:", e);
    throw e;
  }
}

export async function countLogs(guildId: Snowflake) {
  try {
    const logs = await prismaClient.guildLogs.count({
      where: {
        guildId,
      },
    });

    return logs;
  } catch (e) {
    console.log("Failed to count logs:", e);
    throw e;
  }
}
