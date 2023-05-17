import { Logger } from "@majoexe/util/functions/index.js";

export async function ready(client) {
 const registerTime = performance.now();
 Logger("info", "Registering slash commands...");
 const commands = await client.application.commands.set(client.slashCommands).catch((err) => {
  Logger("error", err);
 });
 Logger("event", `Successfully registered ${commands.size} slash commands in ${client.performance(registerTime)}`);
 Logger("ready", `Logged in as ${client.user.tag}, id: ${client.user.id}`);
}
