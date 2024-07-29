import prismaClient from "@majoexe/database";
import { getSession } from "lib/session";
import { NextResponse } from "next/server";

export async function GET() {
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

  const user = await prismaClient.user.findFirst({
   where: {
    id: session.sub,
   },
   select: {
    discordId: true,
    name: true,
    global_name: true,
    discriminator: true,
    avatar: true,
    public_flags: true,
    flags: true,
    locale: true,
    nitro: true,
    accounts: {
     select: {
      type: true,
      provider: true,
      providerAccountId: true,
      expires_at: true,
      token_type: true,
      scope: true,
      id_token: true,
      session_state: true,
     },
    },
    guildLogs: {
     select: {
      guildId: true,
      content: true,
      type: true,
      createdAt: true,
     },
    },
    guildXp: {
     select: {
      guildId: true,
      xp: true,
      createdAt: true,
     },
    },
    reputation: {
     select: {
      guildId: true,
      reputation: true,
      createdAt: true,
     },
    },
    guildWarns: {
     select: {
      warnId: true,
      guildId: true,
      createdById: true,
      message: true,
      createdAt: true,
     },
    },
   },
  });

  if (!user) {
   return NextResponse.json(
    {
     error: "User not found",
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

  /* eslint-disable func-names, @stylistic/space-before-function-paren */
  BigInt.prototype.toJSON = function () {
   return this.toString();
  };

  return new Response(JSON.stringify(user), {
   headers: {
    "Content-Type": "application/json",
    "Content-Disposition": `attachment; filename="user-${user.discordId}.json"`,
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
