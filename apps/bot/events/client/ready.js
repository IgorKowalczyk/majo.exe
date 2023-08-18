import { PresenceUpdateStatus, ActivityType } from "discord.js";

export async function ready(client) {
 const registerTime = performance.now();
 client.debugger("info", "Registering slash commands...");
 const commands = await client.application.commands.set(client.slashCommands).catch((err) => {
  client.debugger("error", err);
 });
 client.debugger("event", `Successfully registered ${commands.size} slash commands (+${client.additionalSlashCommands} subcommands) in ${client.performance(registerTime)}`);
 client.debugger("ready", `Logged in as ${client.user.tag}, id: ${client.user.id}`);

 client.user.setActivity(client.config.presence.activity.type === ActivityType.Custom ? client.config.presence.activity.state : client.config.presence.activity.name, {
  type: client.config.presence.activity.type,
 });
 client.user.setStatus(client.config.presence.status ?? PresenceUpdateStatus.Online);
}
