import prismaClient from "@majoexe/database";

/**
 * Fetches the XP settings for a guild. If the guild does not exist, it will be created.
 *
 * @param {string} guildId - The ID of the guild.
 * @returns {Promise<{enableXP: boolean, enableXPLastChanged: Date, enableXPLevelUpMessage: boolean, enableXPLevelUpMessageLastChanged: Date}>} - The XP settings of the guild.
 * @throws {Error} - Throws an error if the operation fails.
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
 * Enables or disables XP for a guild.
 *
 * @param {string} guildId - The ID of the guild.
 * @param {boolean} enableXP - The new XP setting.
 * @returns {Promise<boolean>} - Returns true if the operation is successful.
 * @throws {Error} - Throws an error if the operation fails.
 */
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
 * Enables or disables the XP level up message for a guild.
 *
 * @param {string} guildId - The ID of the guild.
 * @param {boolean} enableXPLevelUpMessage - The new XP level up message setting.
 * @returns {Promise<boolean>} - Returns true if the operation is successful.
 * @throws {Error} - Throws an error if the operation fails.
 */
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
