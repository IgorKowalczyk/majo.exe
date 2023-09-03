import translate from "@iamtraction/google-translate";
import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } from "discord.js";

export default {
 name: "translate",
 description: "🈯 Translate text",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/translate <text> [to] [from]",
 options: [
  {
   name: "text",
   description: "The text you want to translate",
   type: ApplicationCommandOptionType.String,
   required: true,
   max_length: 512,
  },
  {
   name: "to",
   description: "The language you want to translate to",
   type: ApplicationCommandOptionType.String,
   max_length: 60,
  },
  {
   name: "from",
   description: "The language you want to translate from",
   type: ApplicationCommandOptionType.String,
   max_length: 60,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const text = interaction.options.getString("text");
   const to = interaction.options.getString("to") || "en";
   const from = interaction.options.getString("from") || "auto";

   const response = await translate(text, { from, to });
   const embed = new EmbedBuilder()
    .setTitle(`🈯 Translated Text (from \`${response.from.language.iso}\` to \`${to}\`)`)
    .setDescription(`>>> **${response.text}**${response.from.text.value ? `\n\nDid you mean: \`${from.text.value}\`` : ""}`)
    .setTimestamp()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({ size: 256 }),
    });
   return interaction.followUp({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   client.errorMessages.internalError(interaction, err);
  }
 },
};
