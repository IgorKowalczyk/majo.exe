/* eslint-disable complexity */

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
     error: "Unauthorized",
    },
    {
     status: 401,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  const { id, name, enabled } = await request.clone().json();

  if (!id || !name || Boolean(enabled) === undefined) {
   return NextResponse.json(
    {
     error: "Bad Request",
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

  if (typeof enabled !== "boolean" || typeof name !== "string" || typeof id !== "string") {
   return NextResponse.json(
    {
     error: "Bad Request",
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

  if (name.length > 20) {
   return NextResponse.json(
    {
     error: "Bad Request",
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

  const existingCommand = await prismaClient.commands.findFirst({
   where: {
    name: name,
   },
  });

  if (!existingCommand) {
   return NextResponse.json(
    {
     error: "Command not found",
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

  const server = await getServer(id);

  if (!server || server.error) {
   return NextResponse.json(
    {
     error: "Server not found",
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
     error: "Bot is not in server",
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
     error: "Unauthorized",
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

  const disabledCategory = await prismaClient.guildDisabledCategories.findFirst({
   where: {
    guildId: server.id,
    categoryName: existingCommand.category,
   },
  });

  if (disabledCategory) {
   return NextResponse.json(
    {
     error: "Category is disabled",
     code: 403,
    },
    {
     status: 403,
     headers: {
      "server-timing": `response;dur=${Date.now() - start}`,
     },
    }
   );
  }

  const alreadyDisabled = await prismaClient.guildDisabledCommands.findFirst({
   where: {
    guildId: server.id,
    commandName: existingCommand.name,
   },
  });

  if (!alreadyDisabled) {
   if (enabled) {
    return NextResponse.json(
     {
      message: "Command is already enabled, no action taken",
      code: 200,
     },
     {
      status: 200,
      headers: {
       "server-timing": `response;dur=${Date.now() - start}`,
      },
     }
    );
   } else {
    await prismaClient.guildDisabledCommands.create({
     data: {
      guildId: server.id,
      commandName: existingCommand.name,
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
      content: `Disabled command ${existingCommand.name}`,
      type: "command_change",
     },
    });

    return NextResponse.json(
     {
      message: "Command disabled",
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
  } else {
   if (enabled) {
    await prismaClient.guildDisabledCommands.delete({
     where: {
      id: alreadyDisabled.id,
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
      content: `Enabled command ${existingCommand.name}`,
      type: "command_change",
     },
    });

    return NextResponse.json(
     {
      message: "Command enabled",
      code: 200,
     },
     {
      status: 200,
      headers: {
       "server-timing": `response;dur=${Date.now() - start}`,
      },
     }
    );
   } else {
    return NextResponse.json(
     {
      message: "Command is already disabled, no action taken",
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
  }
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
