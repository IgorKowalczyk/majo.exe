import prismaClient from "@majoexe/database";
import { GuildLogType } from "@majoexe/database/types";
import { createLog } from "@majoexe/util/database";
import { getGuild, getGuildChannels, getGuildFromMemberGuilds } from "@majoexe/util/functions/guild";
import { shortenText } from "@majoexe/util/functions/util";
import { ChannelType } from "discord-api-types/v10";
import { getSession } from "lib/session";
import { NextRequest, NextResponse } from "next/server";

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

  const { id: guildId, enabled, title, description, channel } = await request.clone().json();

  if (!guildId || typeof guildId !== "string") {
   return NextResponse.json(
    {
     error: "Bad Request - Missing guildId or invalid types",
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

  if (typeof enabled !== "boolean") {
   return NextResponse.json(
    {
     error: "Bad Request - Missing enabled or invalid types",
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

  if (title && typeof title !== "string") {
   return NextResponse.json(
    {
     error: "Bad Request - Missing title or invalid types",
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

  if (description && typeof description !== "string") {
   return NextResponse.json(
    {
     error: "Bad Request - Missing description or invalid types",
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

  if (title && title.length > 250) {
   return NextResponse.json(
    {
     error: "Bad Request - Title is too long",
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

  if (description.length > 2040) {
   return NextResponse.json(
    {
     error: "Bad Request - Description is too long",
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

  if (typeof channel !== "string") {
   return NextResponse.json(
    {
     error: "Bad Request - Missing channel or invalid types",
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

  const server = await getGuild(guildId);

  if (!server) {
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

  const serverMember = await getGuildFromMemberGuilds(server.id, session.access_token);

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

  const guildChannels = (await getGuildChannels(server.id, [ChannelType.GuildText])) || [];

  const allChannels = guildChannels
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

  if (!allChannels.find((c) => c && c.id === channel.toString())) {
   return NextResponse.json(
    {
     error: "Bad Request - Invalid channel",
     code: 400,
    },
    {
     status: 400,
     headers: {
      ...(process.env.NODE_ENV !== "production" && {
       "Server-Timing": `response;dur=${Date.now() - start}ms`,
      }),
      "content-type": "application/json",
     },
    }
   );
  }

  await prismaClient.guildLeaveMessage.upsert({
   where: {
    guildId,
   },
   update: {
    channelId: channel.toString(),
    title: shortenText(title, 250),
    description: shortenText(description, 2040),
    enabled: enabled || false,
   },
   create: {
    guildId,
    channelId: channel.toString(),
    title: shortenText(title, 250),
    description: shortenText(description, 2040),
    enabled: enabled || false,
   },
  });

  await createLog(server.id, session.id, {
   content: `${enabled ? "Enabled" : "Disabled"} leave messages`,
   type: enabled ? GuildLogType.LeaveMessageEnable : GuildLogType.LeaveMessageDisable,
  });

  return NextResponse.json(
   {
    message: "Successfully enabled leave messages",
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
