import { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, time, ChatInputCommandInteraction } from "discord.js";
import fetch from "node-fetch";
import type { Majobot } from "../..";
import type { GuildSettings } from "../../util/types/Command";

interface GithubResponse {
 sha: string;
 html_url: string;
 commit: {
  committer: {
   date: string;
  };
 };
}

export default {
 name: "opensource",
 description: "📚 Check out Majo.exe source code",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 usage: "/contact",
 dm_permission: true,
 run: async (client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) => {
  try {
   if (!client.user) return client.errorMessages.createSlashError(interaction, "❌ Bot is not ready yet. Please try again later.");

   const request = await fetch("https://api.github.com/repos/igorkowalczyk/majo.exe/commits?per_page=1");
   if (!request.ok) return client.errorMessages.createSlashError(interaction, "❌ No results found. Please try again later.");
   const response = (await request.json()) as GithubResponse[];

   const lastTimestamp = Math.floor(new Date(response[0].commit.committer.date).getTime() / 1000);

   const embed = new EmbedBuilder() // Prettier
    .setTitle(`🐙 ${client.user.username} Github Repository`)
    .setDescription("**This project is open source: [@igorkowalczyk/majo.exe](https://github.com/igorkowalczyk/majo.exe)**")
    .addFields([
     {
      name: `📚 Latest commit ${time(lastTimestamp)} (${time(lastTimestamp, "R")})`,
      value: `🖇️ SHA: [\`${response[0].sha}\`](${response[0].html_url})`,
     },
    ])
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    })
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp();

   const row = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
     new ButtonBuilder() // Prettier
      .setURL("https://github.com/igorkowalczyk/majo.exe")
      .setLabel("Source code")
      .setStyle(ButtonStyle.Link)
    )
    .addComponents(
     new ButtonBuilder() // Prettier
      .setURL(response[0].html_url)
      .setLabel("Latest commit")
      .setStyle(ButtonStyle.Link)
    );
   return interaction.followUp({ ephemeral: false, embeds: [embed], components: [row] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
