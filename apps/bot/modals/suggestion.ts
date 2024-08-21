const timeout = new Map();
import prismaClient from "@majoexe/database";
import { formatDuration } from "@majoexe/util/functions/util";
import { EmbedBuilder, type ModalMessageModalSubmitInteraction } from "discord.js";
import type { Majobot } from "..";

export default {
 id: "suggestion",
 run: async (client: Majobot, interaction: ModalMessageModalSubmitInteraction) => {
  if (!interaction.guild) return;

  await interaction.deferReply({ ephemeral: true });
  const suggestion = interaction.fields.getTextInputValue("suggestion");
  if (suggestion.length < 5 || suggestion.length > 500) {
   const embed = new EmbedBuilder()
    .setTitle("‼️ Your suggestion must be between 5 and 500 characters!")
    .setDescription("Please make sure your suggestion is between 5 and 500 characters!")
    .setColor("#EF4444")
    .setTimestamp()
    .setFooter({
     text: `Suggested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    });

   return interaction.followUp({ ephemeral: true, embeds: [embed] });
  }

  const key = `${interaction.user.id}-suggest`;

  if (timeout.has(key) && timeout.get(key).time > Date.now()) {
   const { time } = timeout.get(key);
   const duration = formatDuration(time - Date.now());

   const embed = new EmbedBuilder()
    .setTitle("‼️ You are on cooldown!")
    .setDescription(`You are on cooldown for \`${duration}\`! Please wait before suggesting again!`)
    .setColor("#EF4444")
    .setTimestamp()
    .setFooter({
     text: `Suggested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    });

   return interaction.followUp({ ephemeral: true, embeds: [embed] });
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
    text: `Suggested by ${interaction.user.globalName || interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     size: 256,
    }),
   });

  await prismaClient.suggestions.create({
   data: {
    message: suggestion,
    userId: interaction.user.id,
    guildId: interaction.guild.id,
   },
  });

  return interaction.followUp({ ephemeral: true, embeds: [embed] });
 },
};
