import prismaClient from "@majoexe/database/index.js";
import { formatDuration } from "@majoexe/util/functions/index.js";
import { Logger } from "@majoexe/util/functions/index.js";
import { EmbedBuilder } from "discord.js";
const timeout = new Map();

export async function interactionCreate(client, interaction) {
 if (interaction.isModalSubmit()) {
  if (interaction.customId === "suggestion") {
   const suggestion = interaction.fields.getTextInputValue("suggestion");

   if (suggestion.length < 5 || suggestion.length > 500) {
    const embed = new EmbedBuilder()
     .setTitle("‼️ Your suggestion must be between 5 and 500 characters!")
     .setDescription("Please make sure your suggestion is between 5 and 500 characters!")
     .setColor("#EF4444")
     .setTimestamp()
     .setFooter({
      text: `Suggested by ${interaction.member?.user?.username}`,
      iconURL: interaction.member?.user?.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });

    return interaction.reply({ ephemeral: true, embeds: [embed] });
   }

   const key = `${interaction.member?.user?.id}-suggest`;

   if (timeout.has(key) && timeout.get(key).time > Date.now()) {
    const time = timeout.get(key).time;
    const duration = formatDuration(time - Date.now());

    const embed = new EmbedBuilder()
     .setTitle("‼️ You are on cooldown!")
     .setDescription(`You are on cooldown for \`${duration}\`! Please wait before suggesting again!`)
     .setColor("#EF4444")
     .setTimestamp()
     .setFooter({
      text: `Suggested by ${interaction.member?.user?.username}`,
      iconURL: interaction.member?.user?.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });

    return interaction.reply({ ephemeral: true, embeds: [embed] });
   }

   timeout.set(key, { time: Date.now() + 60000 });
   setTimeout(() => {
    timeout.delete(key);
   }, 60000);

   const embed = new EmbedBuilder()
    .setTitle("📝 Thank you for your suggestion!")
    .setDescription(`**Suggestion**: ${suggestion}`)
    .setColor("#3B82F6")
    .setTimestamp()
    .setFooter({
     text: `Suggested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });

   await prismaClient.suggestions.create({
    data: {
     message: suggestion,
     userId: interaction.member?.user?.id,
     guildId: interaction.guild?.id,
    },
   });

   return interaction.reply({ ephemeral: true, embeds: [embed] });
  }
 }

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
