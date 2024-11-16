import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, type ColorResolvable, ApplicationIntegrationType, InteractionContextType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "rate",
 description: "📈 Rate something",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/rate (thing)",
 options: [
  {
   name: "thing",
   description: "Thing to rate",
   type: ApplicationCommandOptionType.String,
   max_length: 256,
   required: true,
  },
 ],
 run: async (client, interaction) => {
  try {
   const thing = interaction.options.getString("thing");
   const rate = Math.floor(Math.random() * 100) + 1;

   let color;
   if (rate <= 100 && rate >= 90) {
    color = "#57F287";
   } else if (rate >= 50 && rate <= 89) {
    color = "#FFFF00";
   } else if (rate >= 0 && rate <= 49) {
    color = "#ED4245";
   }

   const embed = new EmbedBuilder()
    .setTitle("📈 Rating")
    .setDescription(`>>> **I rate ${thing} a ${rate}/100!**`)
    .setTimestamp()
    .setColor(color as ColorResolvable)
    .setThumbnail(interaction.user.displayAvatarURL({ size: 256 }))
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
