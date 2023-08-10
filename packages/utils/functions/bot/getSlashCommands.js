import { globalConfig } from "@majoexe/config";

/**
 * Get all slash commands from the bot.
 * @returns {Promise<any>} The slash commands.
 * @example getSlashCommands()
 * */
export async function getSlashCommands() {
 try {
  const commands = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/applications/${process.env.CLIENT_ID}/commands`, {
   next: { revalidate: 10 },
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
   },
  });
  if (!commands || !commands.ok) return { error: "Invalid token" };
  return await commands.json();
 } catch (e) {
  return { error: "Invalid token" };
 }
}
