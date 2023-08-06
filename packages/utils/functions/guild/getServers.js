import { config } from "@majoexe/config";
import { getPermissionNames } from "../user/checkPermissions.js";

/**
 * @param {string} token The token of the user.
 * @returns {Promise<any>} The servers the user is in.
 * @example getServers("token")
 * @example getServers("token").then((res) => console.log(res))
 * */
export async function getServers(token) {
 try {
  const res = await fetch(`https://discord.com/api/v${config.global.apiVersion}/users/@me/guilds`, {
   next: { revalidate: 10 },
   headers: {
    Authorization: `Bearer ${token}`,
   },
  });
  if (!res.ok) return { error: "Invalid token" };
  const json = await res.json();
  for (const server of json) {
   server.permissions_names = getPermissionNames(server.permissions) || [];
  }
  return json;
 } catch (e) {
  return { error: "Invalid token" };
 }
}
