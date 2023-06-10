/* eslint-disable camelcase */
import prismaClient from "@majoexe/database";

/**
 * @param {string} token The token of the user.
 * @returns {Promise<any>} The servers the user is in.
 * @example getServers("token")
 * @example getServers("token").then((res) => console.log(res))
 * */
export async function getServers(token, refresh_token, discordId) {
 try {
  const res = await fetch("https://discord.com/api/users/@me/guilds", {
   next: { revalidate: 10 },
   headers: {
    Authorization: `Bearer ${token}`,
   },
  });
  if (res.status === 401) {
   try {
    const refresh = await fetch("https://discord.com/api/v10/oauth2/token", {
     method: "POST",
     headers: {
      "Content-Type": "application/x-www-form-urlencoded",
     },
     body: new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: refresh_token,
     }),
    });
    const json = await refresh.json();
    if (json.access_token) {
     await prismaClient.account.update({
      where: {
       providerAccountId: discordId,
      },
      data: {
       access_token: json.access_token,
       refresh_token: json.refresh_token,
       expires_at: Date.now() + json.expires_in,
      },
     });
    }
   } catch (e) {
    return { error: "Invalid token" };
   }
  }
  if (res.ok) return await res.json();
  return { error: "Invalid token" };
 } catch (e) {
  return { error: "Invalid token" };
 }
}
