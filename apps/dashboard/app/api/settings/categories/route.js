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
  const { id, name, enabled } = body;

  if (!id || !name || Boolean(enabled) === undefined) {
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

  if (typeof enabled !== "boolean" || typeof name !== "string" || typeof id !== "string") {
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

  if (name.length > 20) {
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

  const existingCategory = await prismaClient.commandCategories.findFirst({
   where: {
    name: name,
   },
  });

  if (!existingCategory) {
   return new NextResponse(
    JSON.stringify({
     error: "Category not found",
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

  const alreadyDisabled = await prismaClient.guildDisabledCategories.findFirst({
   where: {
    guildId: server.id,
    categoryName: existingCategory.name,
   },
  });

  if (!alreadyDisabled) {
   if (enabled) {
    return new NextResponse(
     JSON.stringify({
      message: "Category is already enabled, no action taken",
      code: 200,
     }),
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

    return new NextResponse(
     JSON.stringify({
      message: "Category disabled",
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

    return new NextResponse(
     JSON.stringify({
      message: "Category enabled",
      code: 200,
     }),
     {
      status: 200,
      headers: {
       "server-timing": `response;dur=${Date.now() - start}`,
      },
     }
    );
   } else {
    return new NextResponse(
     JSON.stringify({
      message: "Category is already disabled, no action taken",
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
  }
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
