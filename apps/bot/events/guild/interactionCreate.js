import { formatDuration } from "@majoexe/util/src/functions/formatDuration.js";
import { Logger } from "@majoexe/util/src/functions/logger.js";
import { EmbedBuilder } from "discord.js";
const timeout = new Map();

export async function interactionCreate(client, interaction) {
 if (!interaction.isCommand()) return;
 client.config.debugger.displayCommandUsage && Logger("info", `Command used: ${interaction.commandName} by ${interaction.user.tag} (${interaction.user.id})`);

 if (!interaction.inGuild() && client.slashCommands.get(interaction.commandName).guildOnly) {
  const embed = new EmbedBuilder()
   .setTitle("‼️ This command is guild only!")
   .setDescription("This command can only be used in a guild! Please join a guild to use this command!")
   .setColor("#EF4444")
   .setTimestamp()
   .setFooter({
    text: `Requested by ${interaction.member?.user?.username}`,
    iconURL: interaction.member?.user?.displayAvatarURL({
     dynamic: true,
     format: "png",
    }),
   });
  return interaction.reply({ ephemeral: true, embeds: [embed] });
 } else if (interaction.inGuild() && client.slashCommands.get(interaction.commandName).dmOnly) {
  const embed = new EmbedBuilder()
   .setTitle("‼️ This command is DM only!")
   .setDescription("This command can only be used in a DM! Please DM me to use this command!")
   .setColor("#EF4444")
   .setTimestamp()
   .setFooter({
    text: `Requested by ${interaction.member?.user?.username}`,
    iconURL: interaction.member?.user?.displayAvatarURL({
     dynamic: true,
     format: "png",
    }),
   });
  return interaction.reply({ ephemeral: true, embeds: [embed] });
 }

 if (!client.slashCommands.has(interaction.commandName)) return;
 const key = `${interaction.user.id}${interaction.commandName}`;
 if (client.slashCommands.get(interaction.commandName).cooldown) {
  if (timeout.has(key) && timeout.get(key)?.time + client.slashCommands.get(interaction.commandName).cooldown > Date.now()) {
   const timeLeft = timeout.get(key)?.time + client.slashCommands.get(interaction.commandName).cooldown - Date.now();
   const embed = new EmbedBuilder()
    .setTitle("‼️ Slow down!")
    .setDescription(`You are on cooldown! Please wait \`${formatDuration(timeLeft)}\` before using this command again!`)
    .setColor("#EF4444")
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
     }),
    });
   return interaction.reply({ ephemeral: true, embeds: [embed] });
  } else {
   timeout.set(key, { time: Date.now() });
   setTimeout(() => {
    timeout.delete(key);
   }, client.slashCommands.get(interaction.commandName).cooldown);
  }
 }

 client.slashCommands.get(interaction.commandName).run(client, interaction);
}
