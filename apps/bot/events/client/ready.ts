import topggSDK from "@top-gg/sdk";
import { PresenceUpdateStatus, ActivityType, RESTPutAPIApplicationCommandsJSONBody } from "discord.js";
import { postBotCommands, postBotStats } from "discordbotlist";
import type { Majobot } from "@/index";

export async function ready(client: Majobot) {
 if (!client.user) return client.debugger("error", "Client user is not available!");
 if (!client.application) return client.debugger("error", "Client application is not available!");

 const registerTime = performance.now();
 client.debugger("info", "Registering slash commands...");

 client.application.commands
  .set(client.slashCommands.map((command) => command))
  .catch((error: Error) => {
   client.debugger("error", error);
  })
  .then((commands) => {
   if (commands) {
    const percentage = Math.round((commands.size / client.slashCommands.size) * 100);
    client.debugger("ready", `Successfully registered ${commands.size + client.additionalSlashCommands} (${percentage}%) slash commands (with ${client.additionalSlashCommands} subcommands) in ${client.performance(registerTime)}`);
   } else {
    client.debugger("error", "Failed to register commands.");
   }
  });

 client.debugger("ready", `Logged in as ${client.user.tag}, ID: ${client.user.id}`);

 if (process.env.TOPGG_API_KEY) {
  const topgg = new topggSDK.Api(process.env.TOPGG_API_KEY);

  setInterval(async () => {
   client.debugger("info", "Posting stats to top.gg");
   await topgg.postStats({
    serverCount: client.guilds.cache.size,
    shardCount: client.ws.shards.size,
    shardId: client.ws.shards.first()?.id,
   });
  }, 300000); // 5 minutes
 }

 setInterval(async () => {
  if (process.env.DISCORD_BOT_LIST_API_KEY && client.user) {
   client.debugger("info", "Posting stats to discordbotlist.com");
   await postBotStats(process.env.DISCORD_BOT_LIST_API_KEY, client.user.id, {
    guilds: client.guilds.cache.size,
    users: client.users.cache.size,
   });

   await postBotCommands(process.env.DISCORD_BOT_LIST_API_KEY, client.user.id, client.slashCommands.map((command) => command) as RESTPutAPIApplicationCommandsJSONBody);
  }
 }, 300000); // 5 minutes

 setInterval(async () => {
  if (!client.user) return;
  client.user.setActivity(client.config.presence.activity.type === ActivityType.Custom ? client.config.presence.activity.state : client.config.presence.activity.name, {
   type: client.config.presence.activity.type,
  });
  client.user.setStatus(client.config.presence.status ?? PresenceUpdateStatus.Online);
 }, 60000); // 1 minute
}
