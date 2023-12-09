/* eslint-disable complexity */

import { globalConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { syncAutoModRule } from "@majoexe/util/database";
import { getServer, getGuildMember } from "@majoexe/util/functions";
import { AutoModerationRuleTriggerType, AutoModerationRuleEventType, AutoModerationActionType, ChannelType } from "discord-api-types/v10";
import { getSession } from "lib/session";
import { NextResponse } from "next/server";
import { validateActions } from "./validateActions";

export async function POST(request) {
 try {
  const session = await getSession();
  const start = Date.now();

  if (!session || !session.access_token) {
   return NextResponse.json(
    {
     error: "Unauthorized - you need to log in first",
    },
    {
     status: 401,
     headers: {
      ...(process.env.NODE_ENV !== "production" && {
       "Server-Timing": `response;dur=${Date.now() - start}ms`,
      }),
     },
    }
   );
  }

  const cloned = await request.clone();
  const data = await cloned.json();

  if (!data) {
   return NextResponse.json(
    {
     error: "Bad Request - incomplete data",
     code: 400,
    },
    {
     status: 400,
     headers: {
      ...(process.env.NODE_ENV !== "production" && {
       "Server-Timing": `response;dur=${Date.now() - start}ms`,
      }),
     },
    }
   );
  }

  if (!data.actions || data.actions.length === 0) {
   data.actions = [
    {
     type: AutoModerationActionType.BlockMessage,
     metadata: {
      custom_message: "Message blocked due to containing an invite link. Rule added by Majo.exe",
     },
    },
   ];
  }

  if (
   // prettier
   !data ||
   !data.id ||
   typeof data.id !== "string" ||
   typeof data.enabled !== "boolean" ||
   !data.exemptRoles ||
   !data.exemptChannels ||
   !data.actions ||
   !Array.isArray(data.actions) ||
   !Array.isArray(data.exemptRoles) ||
   !Array.isArray(data.exemptChannels) ||
   !data.exemptRoles.every((r) => typeof r === "string") ||
   !data.exemptChannels.every((c) => typeof c === "string") ||
   !data.actions.every((a) => a.type !== AutoModerationActionType.BlockMessage || a.type !== AutoModerationActionType.SendAlertMessage || a.type !== AutoModerationActionType.Timeout)
  ) {
   return NextResponse.json(
    {
     error: "Bad Request - incomplete data",
     code: 400,
    },
    {
     status: 400,
     headers: {
      ...(process.env.NODE_ENV !== "production" && {
       "Server-Timing": `response;dur=${Date.now() - start}ms`,
      }),
     },
    }
   );
  }

  const server = await getServer(data.id);

  if (!server || server.error) {
   return NextResponse.json(
    {
     error: "Unable to find this server",
     code: 404,
    },
    {
     status: 404,
     headers: {
      ...(process.env.NODE_ENV !== "production" && {
       "Server-Timing": `response;dur=${Date.now() - start}ms`,
      }),
     },
    }
   );
  }

  if (!server.bot) {
   return NextResponse.json(
    {
     error: "Bot is unable to find this server",
     code: 404,
    },
    {
     status: 404,
     headers: {
      ...(process.env.NODE_ENV !== "production" && {
       "Server-Timing": `response;dur=${Date.now() - start}ms`,
      }),
     },
    }
   );
  }

  const serverMember = await getGuildMember(server.id, session.access_token);

  if (!serverMember || !serverMember.permissions_names || !serverMember.permissions_names.includes("ManageGuild") || !serverMember.permissions_names.includes("Administrator")) {
   return NextResponse.json(
    {
     error: "Unauthorized - you need to log in first",
     code: 401,
    },
    {
     status: 401,
     headers: {
      ...(process.env.NODE_ENV !== "production" && {
       "Server-Timing": `response;dur=${Date.now() - start}ms`,
      }),
     },
    }
   );
  }

  await prismaClient.guild.upsert({
   where: {
    guildId: server.id,
   },
   update: {},
   create: {
    guildId: server.id,
   },
   include: {
    autoMod: {
     where: {
      guildId: server.id,
     },
    },
   },
  });

  const allRolesFetch = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${server.id}/roles`, {
   method: "GET",
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
   },
  }).then((res) => res.json());

  const allChannelsFetch = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${server.id}/channels`, {
   method: "GET",
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
   },
  }).then((res) => res.json());

  const allRoles = allRolesFetch
   .map((role) => {
    if (role.name === "@everyone") return null;
    return {
     id: role.id,
     name: role.name,
     color: role.color ? `#${role.color.toString(16).toUpperCase()}` : "#FFFFFF",
    };
   })
   .filter(Boolean);

  const allChannels = allChannelsFetch
   .map((channel) => {
    if (channel.type !== ChannelType.GuildText) return null;

    return {
     id: channel.id,
     name: channel.name,
     type: channel.type,
     permissions: channel.permission_overwrites,
    };
   })
   .filter(Boolean);

  if (data.exemptChannels.length > 50) {
   return NextResponse.json(
    {
     error: "You can only have 50 ignored channels at once. Please remove some of the existing ignored channels before adding this one.",
     code: 400,
    },
    {
     status: 400,
     headers: {
      ...(process.env.NODE_ENV !== "production" && {
       "Server-Timing": `response;dur=${Date.now() - start}ms`,
      }),
     },
    }
   );
  }

  if (data.exemptRoles.length > 20) {
   return NextResponse.json(
    {
     error: "You can only have 20 ignored roles at once. Please remove some of the existing ignored roles before adding this one.",
     code: 400,
    },
    {
     status: 400,
     headers: {
      ...(process.env.NODE_ENV !== "production" && {
       "Server-Timing": `response;dur=${Date.now() - start}ms`,
      }),
     },
    }
   );
  }

  for (const role of data.exemptRoles) {
   if (!allRoles.find((r) => r.id === role)) {
    return NextResponse.json(
     {
      error: `Unable to find role with id ${role}`,
      code: 404,
     },
     {
      status: 404,
      headers: {
       ...(process.env.NODE_ENV !== "production" && {
        "Server-Timing": `response;dur=${Date.now() - start}ms`,
       }),
      },
     }
    );
   }
  }

  for (const channel of data.exemptChannels) {
   if (!allChannels.find((c) => c.id === channel)) {
    return NextResponse.json(
     {
      error: `Unable to find channel with id ${channel}`,
      code: 404,
     },
     {
      status: 404,
      headers: {
       ...(process.env.NODE_ENV !== "production" && {
        "Server-Timing": `response;dur=${Date.now() - start}ms`,
       }),
      },
     }
    );
   }

   if (allChannels.find((c) => c.id === channel).type !== ChannelType.GuildText) {
    return NextResponse.json(
     {
      error: `Channel #${allChannels.find((c) => c.id === channel)?.name || channel} is not a text channel`,
      code: 400,
     },
     {
      status: 400,
      headers: {
       ...(process.env.NODE_ENV !== "production" && {
        "Server-Timing": `response;dur=${Date.now() - start}ms`,
       }),
      },
     }
    );
   }
  }

  const validatedActions = await validateActions(data.actions, allChannels, "Message blocked due to containing an invite link. Rule added by Majo.exe");

  if (validatedActions.error) {
   return NextResponse.json(
    {
     error: validatedActions.error,
     code: validatedActions.code,
    },
    {
     status: validatedActions.code,
     headers: {
      ...(process.env.NODE_ENV !== "production" && {
       "Server-Timing": `response;dur=${Date.now() - start}ms`,
      }),
     },
    }
   );
  }

  if (!validatedActions || validatedActions.length === 0) {
   return NextResponse.json(
    {
     error: "You must have at least one action enabled",
     code: 400,
    },
    {
     status: 400,
     headers: {
      ...(process.env.NODE_ENV !== "production" && {
       "Server-Timing": `response;dur=${Date.now() - start}ms`,
      }),
     },
    }
   );
  }

  const existingRule = await syncAutoModRule(server.id, "anti-invite");

  const checkFetch = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${server.id}/auto-moderation/rules`, {
   method: "GET",
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
    "Content-Type": "application/json",
   },
  });

  if (!checkFetch.ok) {
   return NextResponse.json(
    {
     error: "Internal Server Error",
     code: 500,
    },
    {
     status: 500,
     headers: {
      ...(process.env.NODE_ENV !== "production" && {
       "Server-Timing": `response;dur=${Date.now() - start}ms`,
      }),
     },
    }
   );
  }

  const check = await checkFetch.json();
  const conflictingRules = check.filter((rule) => rule.trigger_type === AutoModerationRuleTriggerType.Keyword);

  if (conflictingRules.length === 6 && data.enabled) {
   return NextResponse.json(
    {
     error: "You can only have 6 keyword rules enabled at once. Please disable one of the existing keyword rules before enabling this one.",
     code: 400,
    },
    {
     status: 400,
     headers: {
      ...(process.env.NODE_ENV !== "production" && {
       "Server-Timing": `response;dur=${Date.now() - start}ms`,
      }),
     },
    }
   );
  }

  if (existingRule) {
   const discordRequest = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${server.id}/auto-moderation/rules/${existingRule.id}`, {
    method: "PATCH",
    headers: {
     Authorization: `Bot ${process.env.TOKEN}`,
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
     enabled: data.enabled,
     name: "Disallow invites [Majo.exe]",
     actions: validatedActions,
     trigger_type: AutoModerationRuleTriggerType.Keyword,
     exempt_roles: data.exemptRoles,
     exempt_channels: data.exemptChannels,
     trigger_metadata: {
      regex_patterns: ["(?:https?://)?(?:www.|ptb.|canary.)?(?:discord(?:app)?.(?:(?:com|gg)/(?:invite|servers)/[a-z0-9-_]+)|discord.gg/[a-z0-9-_]+)"],
     },
    }),
   });

   if (!discordRequest.ok) {
    return NextResponse.json(
     {
      error: "Something went wrong while trying to update the anti-invite system",
      code: 500,
     },
     {
      status: 500,
      headers: {
       ...(process.env.NODE_ENV !== "production" && {
        "Server-Timing": `response;dur=${Date.now() - start}ms`,
       }),
      },
     }
    );
   }

   await prismaClient.autoMod.update({
    where: {
     ruleId: existingRule.id,
    },
    data: {
     guild: {
      connect: {
       guildId: server.id,
      },
     },
     ruleType: "anti-invite",
    },
   });
  } else {
   const discordRequest = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${server.id}/auto-moderation/rules`, {
    method: "POST",
    headers: {
     Authorization: `Bot ${process.env.TOKEN}`,
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
     enabled: data.enabled,
     name: "Disallow invites [Majo.exe]",
     actions: validatedActions,
     exempt_roles: data.exemptRoles,
     exempt_channels: data.exemptChannels,
     event_type: AutoModerationRuleEventType.MessageSend,
     trigger_type: AutoModerationRuleTriggerType.Keyword,
     trigger_metadata: {
      regex_patterns: ["(?:https?://)?(?:www.|ptb.|canary.)?(?:discord(?:app)?.(?:(?:com|gg)/(?:invite|servers)/[a-z0-9-_]+)|discord.gg/[a-z0-9-_]+)"],
     },
    }),
   });

   if (!discordRequest.ok) {
    return NextResponse.json(
     {
      error: "Something went wrong while trying to update the anti-invite system",
      code: 500,
     },
     {
      status: 500,
      headers: {
       ...(process.env.NODE_ENV !== "production" && {
        "Server-Timing": `response;dur=${Date.now() - start}ms`,
       }),
      },
     }
    );
   }

   const discordData = await discordRequest.json();

   await prismaClient.autoMod.create({
    data: {
     guild: {
      connect: {
       guildId: server.id,
      },
     },
     ruleId: discordData.id.toString(),
     ruleType: "anti-invite",
    },
   });
  }

  return NextResponse.json(
   {
    message: "Successfully updated the anti-invite system",
    code: 200,
   },
   {
    status: 200,
    headers: {
     ...(process.env.NODE_ENV !== "production" && {
      "Server-Timing": `response;dur=${Date.now() - start}ms`,
     }),
    },
   }
  );
 } catch (err) {
  console.log(err);
  return NextResponse.json(
   {
    error: "Internal Server Error",
    code: 500,
   },
   {
    status: 500,
   }
  );
 }
}
