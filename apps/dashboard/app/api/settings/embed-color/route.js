import { globalConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { NextResponse } from "next/server";

export async function POST(request) {
 try {
  const session = await getSession();
  const start = Date.now();
  if (!session) {
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
  const { id, color } = body;
  if (!id || !color) {
   return new NextResponse(
    JSON.stringify({
     error: "Bad Request",
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

  if (!/^#[0-9A-F]{6}$/i.test(color)) {
   return new NextResponse(
    JSON.stringify({
     error: "Invalid color",
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

   return new NextResponse(
    JSON.stringify({
     message: "Embed color updated",
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

  if (current.embedColor === color) {
   return new NextResponse(
    JSON.stringify({
     error: "Embed color is already set to that",
     code: 400,
    }),
    {
     status: 200,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  if (new Date().getTime() - current.embedLastChanged.getTime() < 10000) {
   return new NextResponse(
    JSON.stringify({
     error: "You can only change the embed color every 10 seconds",
     code: 400,
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

  return new NextResponse(
   JSON.stringify({
    message: "Embed color updated",
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

/// ================================
/// PUT
/// ================================

export async function PUT(request) {
 try {
  const session = await getSession();
  const start = Date.now();
  if (!session) {
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
  const { id } = body;

  if (!id) {
   return new NextResponse(
    JSON.stringify({
     error: "Bad Request",
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

   return new NextResponse(
    JSON.stringify({
     message: "Embed color updated",
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

  if (current.embedColor === globalConfig.defaultColor) {
   return new NextResponse(
    JSON.stringify({
     error: "Embed color is already set to that",
     code: 400,
    }),
    {
     status: 200,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  if (new Date().getTime() - current.embedLastChanged.getTime() < 10000) {
   return new NextResponse(
    JSON.stringify({
     error: "You can only change the embed color every 10 seconds",
     code: 400,
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
  return new NextResponse(
   JSON.stringify({
    message: "Embed color updated",
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
