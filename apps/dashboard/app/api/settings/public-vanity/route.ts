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

    const { id, vanity } = await request.clone().json();

    if (!id || typeof id !== "string" || typeof vanity !== "string") {
      return NextResponse.json(
        {
          error: "Missing id, vanity or invalid types provided",
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

    if (!vanity.match(/^[a-zA-Z0-9]+$/)) {
      return NextResponse.json(
        {
          error: "Vanity must be alphanumeric",
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

    if (vanity.length > 20) {
      return NextResponse.json(
        {
          error: "Vanity must be less than 20 characters",
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

    const checkVanity = await prismaClient.guild.findFirst({
      where: {
        vanity,
      },
    });

    if (checkVanity && checkVanity.guildId !== id) {
      return NextResponse.json(
        {
          error: "Vanity already taken",
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

    const current = await prismaClient.guild.findUnique({
      where: {
        guildId: id,
      },
    });

    if (!current) {
      await prismaClient.guild.create({
        data: {
          guildId: id,
          vanity,
        },
      });

      await createLog(id, session.id, {
        content: `Set vanity to ${vanity}`,
        type: GuildLogType.VanityUpdate,
      });

      return NextResponse.json(
        {
          message: `Set vanity to ${vanity}`,
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
        vanity,
      },
    });

    await createLog(id, session.id, {
      content: `Set vanity to ${vanity}`,
      type: GuildLogType.VanityUpdate,
    });

    return NextResponse.json(
      {
        message: `Set vanity to ${vanity}`,
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
