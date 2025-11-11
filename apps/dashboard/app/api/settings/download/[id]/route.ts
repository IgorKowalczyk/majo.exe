import prismaClient from "@majoexe/database";
import { getGuild, getGuildFromMemberGuilds } from "@majoexe/util/functions/guild";
import { getSession } from "lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    const start = Date.now();
    const { id } = await props.params;

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

    if (!id || typeof id !== "string") {
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

    const guild = await prismaClient.guild.findFirst({
      where: {
        guildId: server.id,
      },

      select: {
        guildId: true,
        enableXP: true,
        enableXPLastChanged: true,
        enableXPLevelUpMessage: true,
        enableXPLevelUpMessageLastChanged: true,
        embedColor: true,
        lastUpdated: true,
        publicPage: true,
        vanity: true,
        guildLogs: {
          select: {
            authorId: true,
            content: true,
            type: true,
            createdAt: true,
          },
        },
        guildXp: {
          select: {
            userId: true,
            xp: true,
            createdAt: true,
          },
        },
        guildJoin: {
          select: {
            date: true,
            joins: true,
          },
        },
        guildLeave: {
          select: {
            date: true,
            leaves: true,
          },
        },
        reputation: {
          select: {
            userId: true,
            reputation: true,
            createdAt: true,
          },
        },
        giveaway: {
          select: {
            messageId: true,
            data: true,
            createdAt: true,
          },
        },
        guildMessage: {
          select: {
            date: true,
            messages: true,
          },
        },
        guildDisabledCommands: {
          select: {
            commandName: true,
            createdAt: true,
          },
        },
        guildDisabledCategories: {
          select: {
            categoryName: true,
            createdAt: true,
          },
        },
        autoMod: {
          select: {
            ruleId: true,
            ruleType: true,
            createdAt: true,
          },
        },
        guildWarns: {
          select: {
            warnId: true,
            userId: true,
            createdById: true,
            message: true,
            createdAt: true,
          },
        },
      },
    });

    if (!guild) {
      return NextResponse.json(
        {
          error: "Unable to find this server",
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

    /* eslint-disable func-names */
    (BigInt.prototype as any).toJSON = function () {
      return this.toString();
    };

    return new Response(JSON.stringify(guild), {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="server-${server.id}.json"`,
        ...(process.env.NODE_ENV !== "production" && {
          "Server-Timing": `response;dur=${Date.now() - start}ms`,
        }),
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
