import { PresenceUpdateStatus, ActivityType } from "discord.js";

export async function ready(client) {
 const registerTime = performance.now();
 client.debugger("info", "Registering slash commands...");
 const commands = await client.application.commands.set(client.slashCommands).catch((err) => {
  client.debugger("error", err);
 });
 client.debugger("event", `Successfully registered ${commands.size + client.additionalSlashCommands} slash commands (with ${client.additionalSlashCommands} subcommands) in ${client.performance(registerTime)}`);
 client.debugger("ready", `Logged in as ${client.user.tag}, ID: ${client.user.id}`);

 if (process.env.TOPGG_API_KEY) {
  const servers = await client.guilds.cache.size;
  const shard = client.ws.shards.first();
  const shardCount = client.ws.shards.size;
  client.debugger("info", `Posting stats to top.gg (${servers} servers, shard ${shard.id + 1}/${shardCount})`);

  const req = await fetch(`https://top.gg/api/bots/${client.user.id}/stats`, {
   method: "POST",
   headers: {
    Authorization: process.env.TOPGG_API_KEY,
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    server_count: servers,
    shard_id: shard.id,
    shard_count: shardCount,
   }),
  });

  if (req.status === 200) {
   client.debugger("info", "Successfully posted stats to top.gg!");
  } else {
   client.debugger("error", "Failed to post stats to top.gg!");
  }
 }
 client.user.setActivity(client.config.presence.activity.type === ActivityType.Custom ? client.config.presence.activity.state : client.config.presence.activity.name, {
  type: client.config.presence.activity.type,
 });
 client.user.setStatus(client.config.presence.status ?? PresenceUpdateStatus.Online);
}
