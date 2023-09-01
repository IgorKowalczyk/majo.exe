import prismaClient from "@majoexe/database";
import { getServer, getGuildMember } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { NextResponse } from "next/server";

export async function POST(request) {
 try {
  const session = await getSession();
  const start = Date.now();

  if (!session || !session.access_token) {
   return new NextResponse(
    JSON.stringify({
     error: "Unauthorized",
    }),
    {
     status: 401,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  const cloned = await request.clone();
  const body = await cloned.json();
  const { id, enabled } = body;

  if (!id || typeof id !== "string" || typeof enabled !== "boolean") {
   return new NextResponse(
    JSON.stringify({
     error: "Bad Request. Missing id and enabled or invalid types",
     code: 400,
    }),
    {
     status: 400,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  const server = await getServer(id);

  if (!server || server.error) {
   return new NextResponse(
    JSON.stringify({
     error: "Server not found",
     code: 404,
    }),
    {
     status: 404,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  if (!server.bot) {
   return new NextResponse(
    JSON.stringify({
     error: "Bot is not in server",
     code: 404,
    }),
    {
     status: 404,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  const serverMember = await getGuildMember(server.id, session.access_token);

  if (!serverMember || !serverMember.permissions_names || !serverMember.permissions_names.includes("ManageGuild") || !serverMember.permissions_names.includes("Administrator")) {
   return new NextResponse(
    JSON.stringify({
     error: "Unauthorized",
     code: 401,
    }),
    {
     status: 401,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
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
     publicPageLastChanged: new Date(),
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

   return new NextResponse(
    JSON.stringify({
     message: `Public dashboard ${enabled ? "enabled" : "disabled"}`,
     code: 200,
    }),
    {
     status: 200,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
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
    publicPageLastChanged: new Date(),
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

  return new NextResponse(
   JSON.stringify({
    message: `Public dashboard ${enabled ? "enabled" : "disabled"}`,
    code: 200,
   }),
   {
    status: 200,
    headers: {
     "server-timing": `response;dur=${Date.now() - start}`,
    },
   }
  );
 } catch (err) {
  console.log(err);
  return new NextResponse(
   JSON.stringify({
    error: "Internal Server Error",
    code: 500,
   }),
   {
    status: 500,
   }
  );
 }
}
