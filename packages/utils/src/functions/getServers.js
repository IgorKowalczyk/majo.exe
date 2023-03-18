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
