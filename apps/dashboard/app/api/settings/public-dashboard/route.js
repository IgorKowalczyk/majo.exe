/* eslint-disable complexity */

import prismaClient from "@majoexe/database";
import { getServer, getGuildMember } from "@majoexe/util/functions/guild";
import { getSession } from "lib/session";
import { NextResponse } from "next/server";

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

  const { id, enabled } = await request.clone().json();

  if (!id || typeof id !== "string" || typeof enabled !== "boolean") {
   return NextResponse.json(
    {
     error: "Bad Request - Missing id and enabled or invalid types",
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

  const server = await getServer(id);

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

  const current = await prismaClient.guild.findUnique({
   where: {
    guildId: id,
   },
  });

  if (!current) {
   await prismaClient.guild.create({
    data: {
     guildId: id,
     publicPage: enabled,
    },
   });

   await prismaClient.guildLogs.create({
    data: {
     guild: {
      connectOrCreate: {
       where: {
        guildId: id,
       },
       create: {
        guildId: id,
       },
      },
     },
     user: {
      connect: {
       id: session.sub,
      },
     },
     content: `${enabled ? "Enabled" : "Disabled"} public dashboard`,
     type: "public_dashboard",
    },
   });

   return NextResponse.json(
    {
     message: `Public dashboard ${enabled ? "enabled" : "disabled"}`,
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
  }

  await prismaClient.guild.update({
   where: {
    guildId: id,
   },
   data: {
    publicPage: enabled,
   },
  });

  await prismaClient.guildLogs.create({
   data: {
    guild: {
     connectOrCreate: {
      where: {
       guildId: id,
      },
      create: {
       guildId: id,
      },
     },
    },
    user: {
     connect: {
      id: session.sub,
     },
    },
    content: `${enabled ? "Enabled" : "Disabled"} public dashboard`,
    type: "public_dashboard",
   },
  });

  return NextResponse.json(
   {
    message: `Public dashboard ${enabled ? "enabled" : "disabled"}`,
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
