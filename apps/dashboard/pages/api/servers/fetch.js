import { canAddBotToServer } from "@majoexe/util/src/functions/checkPermissions";
import { getServers } from "@majoexe/util/src/functions/getServers.js";
import { isBotInServer } from "@majoexe/util/src/functions/isBotInServer";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
 const session = await getServerSession(req, res, authOptions);
 if (!session || !session.access_token) return res.status(401).json({ error: "Unauthorized" });
 try {
  const servers = (await getServers(session.access_token)) || [];
  const filteredServers = servers.length > 0 ? servers.filter((server) => canAddBotToServer(server.permissions)) : [];
  const promises = filteredServers.map(async (server) => {
   server.bot = await isBotInServer(server.id);
   return server;
  });

  /* eslint-disable-next-line no-undef */
  return res.status(200).json(await Promise.all(promises));
 } catch (err) {
  console.log(err);
  return res.status(500).json({ error: "Internal Server Error" });
 }
}
