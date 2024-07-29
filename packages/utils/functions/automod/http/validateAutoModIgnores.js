import { ChannelType } from "discord-api-types/v10";

/**
 * Validate AutoMod ignore channels and roles data
 *
 * @param {string[]} allChannels All channels in the server
 * @param {string[]} allRoles All roles in the server
 * @param {string[]} exemptRoles Roles to exempt
 * @param {string[]} exemptChannels Channels to exempt
 * @returns {Promise<{error: string, code: number}>} Error message and code
 */
export function validateAutoModIgnores(allChannels, allRoles, exemptRoles, exemptChannels) {
 if (exemptChannels.length > 50) {
  return {
   error: "You can only have 50 ignored channels at once. Please remove some of the existing ignored channels before adding this one.",
   code: 400,
  };
 }

 if (exemptRoles.length > 20) {
  return {
   error: "You can only have 20 ignored roles at once. Please remove some of the existing ignored roles before adding this one.",
   code: 400,
  };
 }

 for (const role of exemptRoles) {
  if (!allRoles.find((r) => r.id === role)) {
   return {
    error: `Unable to find role with id ${role}, you may need to refresh the page`,
    code: 404,
   };
  }
 }

 for (const channel of exemptChannels) {
  if (!allChannels.find((c) => c.id === channel)) {
   return {
    error: `Unable to find channel with id ${channel}, you may need to refresh the page`,
    code: 404,
   };
  }

  if (allChannels.find((c) => c.id === channel).type !== ChannelType.GuildText) {
   return {
    error: `Channel #${allChannels.find((c) => c.id === channel)?.name || channel} is not a text channel`,
    code: 400,
   };
  }
 }

 return {
  error: null,
  code: 200,
 };
}
