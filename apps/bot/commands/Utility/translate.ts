import translate from "@iamtraction/google-translate";
import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ApplicationIntegrationType, InteractionContextType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";
import { shortenText } from "@majoexe/util/functions/util";

type Translator = typeof translate & {
 languages: {
  [key: string]: string | ((language: string) => boolean | string);
  isSupported: (language: string) => boolean;
  getISOCode: (language: string) => string;
 };
};
const translator = translate as Translator;

export default {
 name: "translate",
 description: "🈯 Translate text",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/translate <text> [to] [from]",
 autocomplete: async (client, interaction) => {
  const focusedOption = interaction.options.getFocused(true);

  if (focusedOption.name === "to" || focusedOption.name === "from") {
   let languages = Object.entries(translator.languages).filter(([key, value]) => typeof value === "string");

   if (focusedOption.value) {
    const search = focusedOption.value.toLowerCase();
    languages = languages.filter(([key, value]) => typeof value === "string" && value.toLowerCase().includes(search));
   }

   await interaction.respond(
    languages.slice(0, 25).map(([key, value]) => ({
     name: typeof value === "string" ? value : "Unknown",
     value: key,
    }))
   );
  }
 },
 options: [
  {
   name: "text",
   description: "The text you want to translate",
   type: ApplicationCommandOptionType.String,
   required: true,
   maxLength: 512,
  },
  {
   name: "to",
   description: "The language you want to translate to",
   autocomplete: true,
   type: ApplicationCommandOptionType.String,
   maxLength: 60,
  },
  {
   name: "from",
   description: "The language you want to translate from",
   autocomplete: true,
   type: ApplicationCommandOptionType.String,
   maxLength: 60,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const text = interaction.options.getString("text");
   const to = interaction.options.getString("to") || "en";
   const from = interaction.options.getString("from") || "auto";

   if (!text) return client.errorMessages.createSlashError(interaction, "❌ Please provide a valid text to translate.");

   if (!translator.languages.isSupported(to)) return client.errorMessages.createSlashError(interaction, "❌ The language you want to translate to is not supported.");
   if (!translator.languages.isSupported(from)) return client.errorMessages.createSlashError(interaction, "❌ The language you want to translate from is not supported.");

   const response = await translator(text, { from, to });
   if (!response.text) return client.errorMessages.createSlashError(interaction, "❌ We couldn't translate the text, please try again later");

   const languageKeys = Object.values(translator.languages).filter((language) => typeof language === "string");

   const translatedFrom = translator.languages[response.from.language.iso];
   const translatedTo = translator.languages[to];

   console.log(translatedFrom);

   const embed = new EmbedBuilder()
    .setTitle(`🈯 Translated Text`)
    .setFields([
     {
      name: "Translated to",
      value: `${translatedTo || "English"}`,
      inline: true,
     },
     {
      name: "Translated from",
      value: `${translatedFrom || "Auto"}`,
      inline: true,
     },
     {
      name: "Translation",
      value: shortenText(response.text, 1090),
     },
    ])
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
} satisfies SlashCommand;
