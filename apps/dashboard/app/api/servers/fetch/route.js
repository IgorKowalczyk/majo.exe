import { canAddBotToServer } from "@majoexe/util/src/functions/checkPermissions";
import { getServers } from "@majoexe/util/src/functions/getServers.js";
import { isBotInServer } from "@majoexe/util/src/functions/isBotInServer";
import { getSession } from "lib/session";
import { NextResponse } from "next/server";

export async function GET() {
 const session = await getSession();
 if (!session || !session.access_token)
  return new NextResponse(
   JSON.stringify({
    error: "Unauthorized",
   }),
   {
    status: 401,
   }
  );
 try {
  const servers = (await getServers(session.access_token)) || [];
  const filteredServers = servers.length > 0 ? servers.filter((server) => canAddBotToServer(server.permissions)) : [];
  const promises = filteredServers.map(async (server) => {
   server.bot = await isBotInServer(server.id);
   return server;
  });

  return new NextResponse(
   JSON.stringify({
    servers: await Promise.all(promises),
   }),
   {
    status: 200,
   }
  );
 } catch (err) {
  console.log(err);
  return new NextResponse(
   JSON.stringify({
    error: "Internal Server Error",
   }),
   {
    status: 500,
   }
  );
 }
}
