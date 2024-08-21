import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import fetch from "node-fetch";
import type { Majobot } from "../..";
import type { GuildSettings } from "../../util/types/Command";

interface RedditResponse {
 kind: string;
 data: RedditData;
}

interface RedditData {
 children: RedditChildren[];
}

interface RedditChildren {
 data: RedditPost;
}

interface RedditPost {
 title: string;
 url: string;
 permalink: string;
}

export default {
 name: "meme",
 description: "😂 Get a random meme",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/meme",
 run: async (client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) => {
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
};
