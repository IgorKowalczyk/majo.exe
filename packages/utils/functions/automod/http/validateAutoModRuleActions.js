import { globalConfig } from "@nyxia/config";
import { AutoModerationActionType, ChannelType } from "discord-api-types/v10";
import { getPermissionNames } from "../../user/checkPermissions";

/**
 * Validate AutoMod rule actions
 *
 * @param {object[]} data Rule actions
 * @param {object[]} allChannels All channels in the server
 * @param {string} dueToMessage Message to send when a rule is triggered
 * @returns {Promise<{error: string, code: number}> | Promise<object[]>} Error message and code or validated actions
 */
export async function validateAutoModRuleActions(data, allChannels, dueToMessage) {
 // ==================
 // BLOCK MESSAGE
 // ==================
 let blockAction = data.find((a) => a.type === AutoModerationActionType.BlockMessage);

 if (blockAction) {
  if (!blockAction.metadata) {
   return {
    error: "Cannot find the block message settings",
    code: 400,
   };
  }

  blockAction = {
   type: AutoModerationActionType.BlockMessage,
   metadata: {
    customMessage: dueToMessage,
   },
  };
 }

 // ==================
 // TIMEOUT MEMBER
 // ==================
 let timeoutAction = data.find((a) => a.type === AutoModerationActionType.Timeout);

 if (timeoutAction) {
  if (!timeoutAction.metadata) {
   return {
    error: "Cannot find the timeout settings",
    code: 400,
   };
  }

  if (timeoutAction.metadata.duration_seconds === 0 || !timeoutAction.metadata.duration_seconds) {
   timeoutAction = null;
  } else if (timeoutAction.metadata.duration_seconds < 60 || timeoutAction.metadata.duration_seconds > 604800) {
   return {
    error: "Timeout duration must be between 60 seconds and 7 days",
    code: 400,
   };
  } else {
   timeoutAction = {
    type: AutoModerationActionType.Timeout,
    metadata: {
     duration_seconds: timeoutAction.metadata.duration_seconds,
    },
   };
  }
 }

 // ==================
 // SEND ALERT MESSAGE
 // ==================
 let alertAction = data.find((a) => a.type === AutoModerationActionType.SendAlertMessage);

 if (alertAction) {
  if (!alertAction.metadata) {
   return {
    error: "Cannot find the alert settings",
    code: 400,
   };
  }

  if (alertAction.metadata.channel_id === "1") {
   alertAction = null;
  } else {
   if (!alertAction.metadata.channel_id || !allChannels.find((c) => c.id === alertAction.metadata.channel_id) || allChannels.find((c) => c.id === alertAction.metadata.channel_id).type !== ChannelType.GuildText) {
    return {
     error: "Cannot find the alert channel",
     code: 404,
    };
   }

   const getChannelPermissionsAPI = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/channels/${alertAction.metadata.channel_id}`, {
    method: "GET",
    headers: {
     Authorization: `Bot ${process.env.TOKEN}`,
    },
   });

   if (!getChannelPermissionsAPI.ok) {
    return {
     error: "Unable to find the alert channel",
     code: 404,
    };
   }

   const getChannelPermissions = await getChannelPermissionsAPI.json();
   const parsedActionPermissions = getPermissionNames(getChannelPermissions.permission_overwrites.find((p) => p.id === process.env.CLIENT_ID)?.allow ?? 0n);

   if (!parsedActionPermissions.includes("VIEW_CHANNEL") || !parsedActionPermissions.includes("SEND_MESSAGES")) {
    return {
     error: "The bot must have 'View Channel' and 'Send Messages' permissions in the alert channel",
     code: 400,
    };
   }

   alertAction = {
    type: AutoModerationActionType.SendAlertMessage,
    metadata: {
     channel_id: alertAction.metadata.channel_id,
     custom_message: dueToMessage,
    },
   };
  }
 }

 // remove the action if it's not set
 return [blockAction, timeoutAction, alertAction].filter((a) => a);
}
