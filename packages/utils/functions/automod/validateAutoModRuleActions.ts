import { globalConfig } from "@majoexe/config";
import {
 type APIAutoModerationAction,
 AutoModerationActionType,
 ChannelType,
 type APIGuildChannel,
 type GuildChannelType,
 RESTError,
 RESTGetAPIChannelResult,
} from "discord-api-types/v10";
import { getPermissionNames } from "../user/getPermissionNames";

interface ValidationResult {
 error: string;
 code: number;
}

export async function validateAutoModRuleActions(
 data: APIAutoModerationAction[],
 allChannels: APIGuildChannel<GuildChannelType>[],
 dueToMessage: string
): Promise<ValidationResult | APIAutoModerationAction[]> {
 // #region Block Message
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
    custom_message: dueToMessage,
   },
  };
 }
 // #endregion

 // #region Timeout
 let timeoutAction = data.find((a) => a.type === AutoModerationActionType.Timeout);

 if (timeoutAction) {
  if (!timeoutAction.metadata) {
   return {
    error: "Cannot find the timeout settings",
    code: 400,
   };
  }

  if (timeoutAction.metadata.duration_seconds === 0 || !timeoutAction.metadata.duration_seconds) {
   timeoutAction = undefined;
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
 // #endregion

 // #region Send Alert Message
 let alertAction = data.find((a) => a.type === AutoModerationActionType.SendAlertMessage);

 if (alertAction) {
  if (!alertAction.metadata) {
   return {
    error: "Cannot find the alert settings",
    code: 400,
   };
  }

  if (alertAction.metadata.channel_id === "1") {
   alertAction = undefined;
  } else {
   if (!alertAction || !alertAction.metadata) {
    return {
     error: "Cannot find the alert channel",
     code: 404,
    };
   }

   if (
    !alertAction.metadata.channel_id ||
    !allChannels.find((c) => c.id === alertAction?.metadata?.channel_id) ||
    allChannels.find((c) => c.id === alertAction?.metadata?.channel_id)?.type !== ChannelType.GuildText
   ) {
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

   const getChannelPermissions = (await getChannelPermissionsAPI.json()) as RESTGetAPIChannelResult | RESTError;

   if ("code" in getChannelPermissions) {
    return {
     error: "Unable to find the alert channel",
     code: 404,
    };
   }

   if (getChannelPermissions.type !== ChannelType.GuildText) {
    return {
     error: "The alert channel must be a text channel",
     code: 400,
    };
   }

   if (!getChannelPermissions.permission_overwrites) {
    return {
     error: "The bot must have 'View Channel' and 'Send Messages' permissions in the alert channel",
     code: 400,
    };
   }

   const userPermissionOverride = getChannelPermissions.permission_overwrites.find((override) => override.id === process.env.CLIENT_ID);

   if (!userPermissionOverride) {
    return {
     error: "The bot must have 'View Channel' and 'Send Messages' permissions in the alert channel",
     code: 400,
    };
   }

   const parsedUserPermissions = getPermissionNames(BigInt(userPermissionOverride.allow ?? 0));

   if (!parsedUserPermissions.includes("ViewChannel") || !parsedUserPermissions.includes("SendMessages")) {
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
 return [blockAction, timeoutAction, alertAction].filter((a): a is APIAutoModerationAction => a !== undefined);
}
