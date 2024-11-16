import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, AttachmentBuilder, ApplicationIntegrationType, InteractionContextType } from "discord.js";
import figlet from "figlet";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "ascii",
 description: "✍️ Convert text to ASCII",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/ascii <text>",
 autocomplete: async (client, interaction) => {
  const focusedOption = interaction.options.getFocused(true);
  if (focusedOption.name === "font") {
   const fonts = figlet.fontsSync();
   const search = focusedOption.value.toLowerCase();
   const filtered = fonts.filter((font) => font.toLowerCase().includes(search));
   await interaction.respond(
    filtered.slice(0, 25).map((font) => ({
     name: font,
     value: font,
    }))
   );
  }
 },
 options: [
  {
   name: "text",
   description: "The text to convert",
   required: true,
   type: ApplicationCommandOptionType.String,
   maxLength: 500,
  },
  {
   name: "font",
   description: "The font to use",
   required: false,
   autocomplete: true,
   type: ApplicationCommandOptionType.String,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const text = interaction.options.getString("text");
   const font = interaction.options.getString("font") || "Standard";

   if (!text) return client.errorMessages.createSlashError(interaction, "❌ Please provide a valid text to convert.");

   const fonts = figlet.fontsSync() as string[];

   if (!fonts.includes(font)) {
    return client.errorMessages.createSlashError(interaction, "❌ Please provide a valid font to convert.");
   }

   const textData = figlet.textSync(text, {
    font: font as figlet.Fonts,
   });

   if (!textData) return client.errorMessages.createSlashError(interaction, "❌ Failed to generate ASCII code, please try again.");

   const embed = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle(`${client.config.emojis.success} Your ASCII code has been successfully generated!`)
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    });

   const attached = new AttachmentBuilder(Buffer.from(textData), {
    name: "ascii-code.txt",
   });

   return interaction.followUp({ ephemeral: false, embeds: [embed], files: [attached] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
