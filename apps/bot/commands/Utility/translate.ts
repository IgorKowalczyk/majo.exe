import translate from "@iamtraction/google-translate";
import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";
import type { Majobot } from "../..";
import type { GuildSettings } from "../../util/types/Command";

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
 run: async (client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) => {
  try {
   const text = interaction.options.getString("text");
   const to = interaction.options.getString("to") || "en";
   const from = interaction.options.getString("from") || "auto";

   const translator = translate as typeof translate & { languages: { isSupported: (language: string) => boolean; getISOCode: (language: string) => string } };

   if (!text) return client.errorMessages.createSlashError(interaction, "❌ Please provide a valid text to translate.");
   const languageValues = Object.values(translator.languages).filter((language) => typeof language === "string");

   if (!translator.languages.isSupported(to)) return client.errorMessages.createSlashError(interaction, `Please use one of the following languages: \`${languageValues.join("`, `")}\``, `Language \`${to}\` is not supported!`);
   if (!translator.languages.isSupported(from)) return client.errorMessages.createSlashError(interaction, `Please use one of the following languages: \`${languageValues.join("`, `")}\``, `Language \`${from}\` is not supported!`);

   const response = await translator(text, { from, to });
   if (!response.text) return client.errorMessages.createSlashError(interaction, "❌ We couldn't translate the text, please try again later");

   const embed = new EmbedBuilder()
    .setTitle(`🈯 Translated Text (from \`${response.from.language.iso}\` to \`${translator.languages.getISOCode(to)}\`)`)
    .setDescription(`>>> **${response.text.length > 2000 ? `${response.text.slice(0, 2000)}...` : response.text}**${response.from?.text?.value ? `\n\nDid you mean: \`${response.from.text.value}\`` : ""}`)
    .setTimestamp()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({ size: 256 }),
    });
   return interaction.followUp({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   client.errorMessages.internalError(interaction, err);
  }
 },
};
