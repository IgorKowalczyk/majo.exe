import { getServer } from "@majoexe/util/src/functions/getServer";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
 const { serverId } = req.query;
 if (!serverId) return res.status(400).json({ error: "Bad Request" });
 const session = await getServerSession(req, res, authOptions);
 if (!session) return res.status(401).json({ error: "Unauthorized" });
 try {
  const server = await getServer(serverId);
  if (server.error) return res.status(404).json({ error: "Server not found" });
  return res.status(200).json(server);
 } catch (err) {
  console.log(err);
  return res.status(500).json({ error: "Internal Server Error" });
 }
}
