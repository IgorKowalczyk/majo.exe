import prismaClient from "@majoexe/database";
/**
 * Fetch XP setting for Guild
 * @param { string } guild The id of the guild
 * @returns { boolean } The XP setting
 */
export async function fetchXPSettings(guildId) {
 try {
  const guild = await prismaClient.guild.findUnique({
   where: {
    guildId: guildId,
   },
  });

  if (!guild) {
   await prismaClient.guild.create({
    data: {
     guildId: guildId,
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
 } catch (e) {
  console.log(e);
  throw e;
 }
}

/**
 * Enable/Disable XP for Guild
 * @param { string } guildId The id of the guild
 * @param { boolean } enableXP The XP setting
 * @returns { boolean } The XP setting
 * */
export async function setXPSettings(guildId, enableXP) {
 try {
  await prismaClient.guild.update({
   where: {
    guildId: guildId,
   },
   data: {
    enableXP: enableXP,
    enableXPLastChanged: new Date(),
   },
  });

  return true;
 } catch (e) {
  console.log("Failed to set xp:", e);
  throw e;
 }
}

/**
 * Enable/Disable XP Level Up Message for Guild
 * @param { string } guildId The id of the guild
 * @param { boolean } enableXPLevelUpMessage The XP Level Up Message setting
 * @returns { boolean } The XP Level Up Message setting
 * */
export async function setXPLevelUpMessageSettings(guildId, enableXPLevelUpMessage) {
 try {
  await prismaClient.guild.update({
   where: {
    guildId: guildId,
   },
   data: {
    enableXPLevelUpMessage: enableXPLevelUpMessage,
    enableXPLevelUpMessageLastChanged: new Date(),
   },
  });

  return true;
 } catch (e) {
  console.log("Failed to set xp level up message:", e);
  throw e;
 }
}
