export async function interactionCreate(client, interaction) {
 if (interaction.isCommand() && interaction.inGuild()) {
  if (!client.slashCommands.has(interaction.commandName)) return;
  client.slashCommands.get(interaction.commandName).run(client, interaction);
 }
}
