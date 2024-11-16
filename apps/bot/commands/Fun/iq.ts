import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ApplicationIntegrationType, InteractionContextType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "iq",
 description: "🧠 Get a random IQ score",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/iq (user)",
 options: [
  {
   name: "user",
   description: "User to get IQ score",
   type: ApplicationCommandOptionType.User,
   required: false,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   if (!interaction.member) return;
   const user = interaction.options.getUser("user") || interaction.user;
   const iq = Math.floor(Math.random() * 200) + 1;

   const embed = new EmbedBuilder()
    .setTitle("🧠 IQ")
    .setDescription(`>>> **${user} has an IQ of ${iq}!**`)
    .setTimestamp()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setThumbnail(user.displayAvatarURL({ size: 256 }))
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({ size: 256 }),
    });
   return interaction.followUp({ embeds: [embed] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
