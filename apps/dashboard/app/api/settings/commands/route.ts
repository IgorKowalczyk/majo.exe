import prismaClient from "@majoexe/database";
import { GuildLogType } from "@majoexe/database/types";
import { createLog } from "@majoexe/util/database";
import { getGuild, getGuildFromMemberGuilds } from "@majoexe/util/functions/guild";
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

  const cloned = request.clone();
  const { id, name, enabled } = await cloned.json();

  if (!id || !name || Boolean(enabled) === undefined) {
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

  if (typeof enabled !== "boolean" || typeof name !== "string" || typeof id !== "string") {
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

  if (name.length > 20) {
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

  const existingCommand = await prismaClient.commands.findFirst({
   where: {
    name,
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
      ...(process.env.NODE_ENV !== "production" && {
       "Server-Timing": `response;dur=${Date.now() - start}ms`,
      }),
     },
    }
   );
  }

  const server = await getGuild(id);

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

  const disabledCategory = await prismaClient.guildDisabledCategories.findFirst({
   where: {
    guildId: server.id,
    categoryName: existingCommand.categoryName,
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
      ...(process.env.NODE_ENV !== "production" && {
       "Server-Timing": `response;dur=${Date.now() - start}ms`,
      }),
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
       ...(process.env.NODE_ENV !== "production" && {
        "Server-Timing": `response;dur=${Date.now() - start}ms`,
       }),
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

    await createLog(server.id, session.id, {
     content: `Disabled command ${existingCommand.name}`,
     type: GuildLogType.CommandDisable,
    });

    return NextResponse.json(
     {
      message: "Command disabled",
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
  } else if (enabled) {
   await prismaClient.guildDisabledCommands.delete({
    where: {
     id: alreadyDisabled.id,
    },
   });

   await createLog(server.id, session.id, {
    content: `Enabled command ${existingCommand.name}`,
    type: GuildLogType.CommandEnable,
   });

   return NextResponse.json(
    {
     message: "Command enabled",
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
  } else {
   return NextResponse.json(
    {
     message: "Command is already disabled, no action taken",
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
