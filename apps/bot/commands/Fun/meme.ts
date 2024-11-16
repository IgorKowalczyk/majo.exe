import { ActionRowBuilder, ApplicationCommandType, ApplicationIntegrationType, ButtonBuilder, ButtonStyle, EmbedBuilder, InteractionContextType } from "discord.js";
import fetch from "node-fetch";
import type { SlashCommand } from "@/util/types/Command";

interface RedditPost {
 title: string;
 url: string;
 permalink: string;
}

interface RedditChildren {
 data: RedditPost;
}

interface RedditData {
 children: RedditChildren[];
}

interface RedditResponse {
 kind: string;
 data: RedditData;
}

export default {
 name: "meme",
 description: "😂 Get a random meme",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/meme",
 run: async (client, interaction, guildSettings) => {
  try {
   const meme = await fetch("https://reddit.com/r/dankmemes/random/.json");
   if (!meme.ok) return client.errorMessages.createSlashError(interaction, "❌ No memes found! Please try again later.");

   const json = (await meme.json()) as RedditResponse[];

   if (!json || !json[0] || !json[0].data || !json[0].data.children || !json[0].data.children[0] || !json[0].data.children[0].data || !json[0].data.children[0].data.title || !json[0].data.children[0].data.url) {
    return client.errorMessages.createSlashError(interaction, "❌ No results found.");
   }

   const embed = new EmbedBuilder()
    .setTitle(json[0].data.children[0].data.title)
    .setImage(json[0].data.children[0].data.url)
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({ size: 256 }),
    });

   const actionRow = new ActionRowBuilder<ButtonBuilder>() // prettier
    .addComponents(
     new ButtonBuilder() // prettier
      .setStyle(ButtonStyle.Link)
      .setLabel("View on Reddit")
      .setURL(`https://reddit.com${json[0].data.children[0].data.permalink}`)
    );

   return interaction.followUp({ embeds: [embed], components: [actionRow] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
