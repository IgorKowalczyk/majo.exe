import { globalConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { getServer, getGuildMember } from "@majoexe/util/functions";
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
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  const { id, color } = await request.clone().json();

  if (!id || !color) {
   return NextResponse.json(
    {
     error: "Bad Request - incomplete data",
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

  if (!server || server.error) {
   return NextResponse.json(
    {
     error: "Unable to find this server",
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
   return NextResponse.json(
    {
     error: "Bot is unable to find this server",
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
   return NextResponse.json(
    {
     error: "Unauthorized - you need to log in first",
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

  if (!/^#[0-9A-F]{6}$/i.test(color)) {
   return NextResponse.json(
    {
     error: "Invalid color",
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
     embedColor: color,
     embedLastChanged: new Date(),
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
     content: `Changed global embed color to ${color}`,
     type: "embed_color",
    },
   });

   return NextResponse.json(
    {
     message: "Embed color updated",
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

  if (current.embedColor === color) {
   return NextResponse.json(
    {
     error: "Embed color is already set to that",
     code: 400,
    },
    {
     status: 200,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  if (new Date().getTime() - current.embedLastChanged.getTime() < 10000) {
   return NextResponse.json(
    {
     error: "You can only change the embed color every 10 seconds",
     code: 400,
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
    embedColor: color,
    embedLastChanged: new Date(),
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
    content: `Changed global embed color to ${color}`,
    type: "embed_color",
   },
  });

  return NextResponse.json(
   {
    message: "Embed color updated",
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

/// ================================
/// PUT
/// ================================

export async function PUT(request) {
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
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }
  const { id } = await request.clone().json();

  if (!id) {
   return NextResponse.json(
    {
     error: "Bad Request - incomplete data",
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

  if (!server || server.error) {
   return NextResponse.json(
    {
     error: "Unable to find this server",
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
   return NextResponse.json(
    {
     error: "Bot is unable to find this server",
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
   return NextResponse.json(
    {
     error: "Unauthorized - you need to log in first",
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

  const current = await prismaClient.guild.findUnique({
   where: {
    guildId: id,
   },
  });

  if (!current) {
   await prismaClient.guild.create({
    data: {
     guildId: id,
     embedColor: globalConfig.defaultColor,
    },
   });

   await prismaClient.guildLogs.create({
    data: {
     guild: {
      connect: {
       guildId: id,
      },
     },
     user: {
      connect: {
       id: session.sub,
      },
     },
     content: "Changed global embed color to default",
     type: "embed_color",
    },
   });

   return NextResponse.json(
    {
     message: "Embed color updated",
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

  if (current.embedColor === globalConfig.defaultColor) {
   return NextResponse.json(
    {
     error: "Embed color is already set to that",
     code: 400,
    },
    {
     status: 200,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  if (new Date().getTime() - current.embedLastChanged.getTime() < 10000) {
   return NextResponse.json(
    {
     error: "You can only change the embed color every 10 seconds",
     code: 400,
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
    embedColor: globalConfig.defaultColor,
    embedLastChanged: new Date(),
   },
  });

  await prismaClient.guildLogs.create({
   data: {
    guild: {
     connect: {
      guildId: id,
     },
    },
    user: {
     connect: {
      id: session.sub,
     },
    },
    content: "Changed global embed color to default",
    type: "embed_color",
   },
  });
  return NextResponse.json(
   {
    message: "Embed color updated",
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
