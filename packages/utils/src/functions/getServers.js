/**
 * @param {string} token The token of the user.
 * @returns {Promise<any>} The servers the user is in.
 * @example getServers("token")
 * @example getServers("token").then((res) => console.log(res))
 * */
export async function getServers(token) {
 try {
  const res = await fetch("https://discord.com/api/users/@me/guilds", {
   headers: {
    Authorization: `Bearer ${token}`,
   },
  });
  const json = await res.json();
  return json;
 } catch (err) {
  return err;
 }
}
