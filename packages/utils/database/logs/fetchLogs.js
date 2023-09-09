import prismaClient from "@majoexe/database";

/**
 * Fetch logs for Guild
 * @param { string } guildId The id of the guild
 * @param { number } page The page of the logs
 * @param { number } count The amount of logs to fetch
 * @returns { object[] } The logs
 * */
export async function fetchLogs(guildId, page, count = 20) {
 try {
  const logs = await prismaClient.guildLogs.findMany({
   where: {
    guildId: guildId,
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

/**
 * Count logs for Guild
 * @param { string } guildId The id of the guild
 * @returns { number } The amount of logs
 * */
export async function countLogs(guildId) {
 try {
  const logs = await prismaClient.guildLogs.count({
   where: {
    guildId: guildId,
   },
  });

  return logs;
 } catch (e) {
  console.log("Failed to count logs:", e);
  throw e;
 }
}
