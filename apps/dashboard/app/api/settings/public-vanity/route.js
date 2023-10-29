import prismaClient from "@majoexe/database";
import { getServer, getGuildMember } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { NextResponse } from "next/server";

export async function POST(request) {
 try {
  const session = await getSession();
  const start = Date.now();

  if (!session || !session.access_token) {
   return new NextResponse.json(
    {
     message: "Unauthorized",
    },
    {
     status: 401,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  const { id, vanity } = await request.clone().json();

  if (!id || typeof id !== "string" || typeof vanity !== "string") {
   return new NextResponse.json(
    {
     message: "Missing id, vanity or invalid types provided",
     code: 400,
    },
    {
     status: 400,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  if (!vanity.match(/^[a-zA-Z0-9]+$/)) {
   return new NextResponse.json(
    {
     message: "Vanity must be alphanumeric",
     code: 400,
    },
    {
     status: 400,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  if (vanity.length > 20) {
   return new NextResponse.json(
    {
     message: "Vanity must be less than 20 characters",
     code: 400,
    },
    {
     status: 400,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  const server = await getServer(id);

  if (!server || server.message) {
   return new NextResponse.json(
    {
     message: "Server not found",
     code: 404,
    },
    {
     status: 404,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  if (!server.bot) {
   return new NextResponse.json(
    {
     message: "Bot is not in server",
     code: 404,
    },
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
   return new NextResponse.json(
    {
     message: "Unauthorized",
     code: 401,
    },
    {
     status: 401,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  const checkVanity = await prismaClient.guild.findFirst({
   where: {
    vanity: vanity,
   },
  });

  if (checkVanity) {
   return new NextResponse.json(
    {
     message: "Vanity already taken",
     code: 400,
    },
    {
     status: 400,
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
     vanity: vanity,
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
     content: `Set vanity to ${vanity}`,
     type: "vanity",
    },
   });

   return new NextResponse.json(
    {
     message: `Set vanity to ${vanity}`,
     code: 200,
    },
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
    vanity: vanity,
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
    content: `Set vanity to ${vanity}`,
    type: "vanity",
   },
  });

  return new NextResponse.json(
   {
    message: `Set vanity to ${vanity}`,
    code: 200,
   },
   {
    status: 200,
    headers: {
     "server-timing": `response;dur=${Date.now() - start}`,
    },
   }
  );
 } catch (err) {
  return new NextResponse.json(
   {
    message: "Internal Server Error",
    code: 500,
   },
   {
    status: 500,
   }
  );
 }
}
