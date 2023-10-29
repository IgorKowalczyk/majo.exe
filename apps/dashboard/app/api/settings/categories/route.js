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

  const existingCategory = await prismaClient.commandCategories.findFirst({
   where: {
    name: name,
   },
  });

  if (!existingCategory) {
   return NextResponse.json(
    {
     error: "Category not found",
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

  const alreadyDisabled = await prismaClient.guildDisabledCategories.findFirst({
   where: {
    guildId: server.id,
    categoryName: existingCategory.name,
   },
  });

  if (!alreadyDisabled) {
   if (enabled) {
    return new NextResponse(
     {
      message: "Category is already enabled, no action taken",
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
    await prismaClient.guildDisabledCategories.create({
     data: {
      guildId: server.id,
      categoryName: existingCategory.name,
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
      content: `Disabled category ${existingCategory.name}`,
      type: "category_change",
     },
    });

    return NextResponse.json(
     {
      message: "Category disabled",
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
    await prismaClient.guildDisabledCategories.delete({
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
      content: `Enabled category ${existingCategory.name}`,
      type: "category_change",
     },
    });

    return NextResponse.json(
     {
      message: "Category enabled",
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
      message: "Category is already disabled, no action taken",
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
