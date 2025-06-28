import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, codeBlock, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "ai",
 description: "🖼️ Generate image with AI",
 type: ApplicationCommandType.ChatInput,
 cooldown: 6000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/ai [text]",
 options: [
  {
   name: "prompt",
   description: "Prompt to generate image, please be descriptive and provide as much detail as possible.",
   type: ApplicationCommandOptionType.String,
   required: true,
   max_length: 255,
  },
 ],

 run: async (client, interaction, guildSettings) => {
  try {
   const prompt = interaction.options.getString("prompt");
   if (!prompt) return client.errorMessages.createSlashError(interaction, "❌ Please provide a valid prompt to generate image.");

   if (!process.env.AI_DOMAIN || process.env.AI_DOMAIN === "" || !process.env.AI_TOKEN)
    return client.errorMessages.createSlashError(interaction, "❌ This feature is disabled right now, please try again later!");

   const loading = new EmbedBuilder() //
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTitle(`${client.config.emojis.loading} Generating image with AI...`)
    .setTimestamp()
    .setDescription("> Please wait while I generate an image with AI based on the prompt you provided. This may take a few seconds...")
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({ size: 256 }),
    });

   await interaction.followUp({ embeds: [loading] });

   const request = await fetch(`${process.env.AI_DOMAIN}v1/image?prompt=${encodeURIComponent(prompt)}&token=${process.env.AI_TOKEN}`);

   if (!request) return client.errorMessages.createSlashError(interaction, "❌ Failed to generate image, please try again.");

   if (!request.ok) {
    try {
     const error = await request.json();
     return client.errorMessages.createSlashError(interaction, `❌ Failed to generate image: \`${error.message}\``);
    } catch (_err) {
     return client.errorMessages.createSlashError(interaction, "❌ Failed to generate image, please try again.");
    }
   }

   const image = await request.arrayBuffer();

   if (!image) return client.errorMessages.createSlashError(interaction, "❌ Failed to generate image, please try again.");

   const attachment = new AttachmentBuilder(Buffer.from(image), {
    name: "generated-image.png",
   });

   const embed = new EmbedBuilder() // prettier
    .setTitle("🖼️ Generated Image")
    .setDescription(codeBlock("md", prompt))
    .setImage("attachment://generated-image.png")
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({ size: 256 }),
    });

   return await interaction.editReply({ embeds: [embed], files: [attachment] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
