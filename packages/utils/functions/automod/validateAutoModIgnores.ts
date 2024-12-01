import { APIGuildChannel, GuildChannelType, APIRole, ChannelType } from "discord-api-types/v10";
import { AutoModerationRuleCreationData } from "./types";

export async function validateAutoModIgnores(allChannels: APIGuildChannel<GuildChannelType>[], allRoles: APIRole[], exemptRoles: AutoModerationRuleCreationData["exemptRoles"], exemptChannels: AutoModerationRuleCreationData["exemptChannels"]) {
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

  const foundChannel = allChannels.find((c) => c.id === channel);

  if (foundChannel && foundChannel.type !== ChannelType.GuildText) {
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
