import prismaClient, { GuildLogType } from "@majoexe/database";
import { createLog } from "@majoexe/util/database";
import { getGuild, getGuildChannels, getGuildFromMemberGuilds } from "@majoexe/util/functions/guild";
import { getSession } from "lib/session";
import { NextRequest, NextResponse } from "next/server";
import { ExcludedEvents } from "@majoexe/util/database";
import { ChannelType } from "discord-api-types/v10";

export async function POST(request: NextRequest) {
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

  const { id, logs } = await request.clone().json();

  if (!id || !Array.isArray(logs) || logs.some((log) => !log.type || typeof log.enabled !== "boolean" || (log.channelId !== null && typeof log.channelId !== "string"))) {
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

  const server = await getGuild(id);

  if (!server || !server.bot) {
   return NextResponse.json(
    {
     error: "Guild not found",
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

  const serverMember = await getGuildFromMemberGuilds(id, session.access_token);

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

  const allowedEvents = Object.keys(GuildLogType).filter((x) => !ExcludedEvents.includes(x as GuildLogType)) as GuildLogType[];

  for (const log of logs) {
   if (!allowedEvents.includes(log.type)) {
    return NextResponse.json(
     {
      error: "Invalid log type",
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

   if (log.channelId !== null) {
    const guildChannels = (await getGuildChannels(id, [ChannelType.GuildText])) || [];

    if (!guildChannels.find((channel) => channel.id === log.channelId)) {
     return NextResponse.json(
      {
       error: "Channel not found",
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

   await prismaClient.guildLogsSettings.upsert({
    where: {
     guildId_type: {
      guildId: id,
      type: log.type,
     },
    },
    update: {
     enabled: log.enabled,
     channelId: log.channelId || null,
    },
    create: {
     guildId: id,
     type: log.type,
     enabled: log.enabled,
     channelId: log.channelId || null,
    },
   });

   await createLog(id, session.id, {
    content: `${log.enabled ? "Enabled" : "Disabled"} log ${log.type}`,
    type: GuildLogType.LogUpdate,
   });
  }

  return NextResponse.json(
   {
    message: "Logs updated successfully",
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
  console.error(err);
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
