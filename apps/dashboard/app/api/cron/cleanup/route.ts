import prismaClient from "@majoexe/database";
import { Logger } from "@majoexe/util/functions/util";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
 try {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
   return NextResponse.json(
    { success: false },
    {
     status: 401,
    }
   );
  }

  const deleteOlderThan = new Date(Date.now() - 31536000000); // 1 year
  Logger("cron", `Deleting data older than ${deleteOlderThan}`);

  const deletedGuildJoins = await prismaClient.guildJoin.deleteMany({
   where: {
    date: {
     lt: deleteOlderThan,
    },
   },
  });
  Logger("cron", `Deleted ${deletedGuildJoins.count} guild joins older than 1 year!`);

  const deletedGuildLeaves = await prismaClient.guildLeave.deleteMany({
   where: {
    date: {
     lt: deleteOlderThan,
    },
   },
  });
  Logger("cron", `Deleted ${deletedGuildLeaves.count} guild leaves older than 1 year!`);

  const deletedGuildMessageStats = await prismaClient.guildMessage.deleteMany({
   where: {
    date: {
     lt: deleteOlderThan,
    },
   },
  });
  Logger("cron", `Deleted ${deletedGuildMessageStats.count} guild message stats older than 1 year!`);

  const deletedSessions = await prismaClient.session.deleteMany({
   where: {
    expires: {
     lt: new Date(),
    },
   },
  });
  Logger("cron", `Deleted ${deletedSessions.count} expired sessions!`);

  const deletedVerificationTokens = await prismaClient.verificationToken.deleteMany({
   where: {
    expires: {
     lt: new Date(),
    },
   },
  });
  Logger("cron", `Deleted ${deletedVerificationTokens.count} expired verification tokens!`);

  const deletedSuggestions = await prismaClient.suggestions.deleteMany({
   where: {
    createdAt: {
     lt: deleteOlderThan,
    },
   },
  });
  Logger("cron", `Deleted ${deletedSuggestions.count} suggestions older than 1 year!`);

  // Accounts are deleted when the user is deleted
  const deletedAccounts = await prismaClient.user.deleteMany({
   where: {
    lastLogin: {
     lt: deleteOlderThan,
    },
   },
  });
  Logger("cron", `Deleted ${deletedAccounts.count} accounts older than 1 year!`);

  // Delete ENDED giveaways older than 1 year
  const deletedGiveaways = await prismaClient.giveaways.deleteMany({
   where: {
    createdAt: {
     lt: deleteOlderThan,
    },
   },
  });
  Logger("cron", `Deleted ${deletedGiveaways.count} giveaways older than 1 year!`);

  return NextResponse.json(
   { success: true },
   {
    status: 200,
   }
  );
 } catch (error) {
  console.error(error);
  return NextResponse.json(
   { success: false },
   {
    status: 500,
   }
  );
 }
}
