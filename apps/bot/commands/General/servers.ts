import { formatNumber } from "@majoexe/util/functions/util";
import { ApplicationCommandType, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ChatInputCommandInteraction } from "discord.js";
import type { Majobot } from "../..";
import type { GuildSettings } from "../../util/types/Command";

export default {
 name: "servers",
 description: "🧭 Display the number of servers the Majo.exe is in",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/servers",
 run: (client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) => {
  try {
   if (!client.user) return client.errorMessages.createSlashError(interaction, "❌ Bot is not ready yet. Please try again later.");

   const allGuilds = client.guilds.cache;
   const allChannels = client.channels.cache;
   const allUsers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

   const inviteLink = `https://discord.com/oauth2/authorize/?permissions=${client.config.permissions}&scope=${client.config.scopes}&client_id=${client.user.id}`;
   const embed = new EmbedBuilder() // Prettier
    .setTitle(`🧭 ${client.user.username} is in ${allGuilds.size} servers!`)
    .setDescription(`**...thats a lot of servers!** To be exact, <@${client.user.id}> is serving commands to \`${formatNumber(allUsers) || "0"}\` users in \`${formatNumber(allChannels.size)}\` channels across \`${formatNumber(allGuilds.size)}\` servers!\n\n**If you want to invite Majo.exe to your server, you can do so by clicking [here](${inviteLink}).**`)
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    })
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setThumbnail(client.user.displayAvatarURL({ size: 256 }));

   const inviteButton = new ButtonBuilder() // prettier
    .setLabel("Invite")
    .setStyle(ButtonStyle.Link)
    .setURL(inviteLink);

   if (client.config.url) {
    const contactButton = new ButtonBuilder() // prettier
     .setLabel("Dashboard")
     .setStyle(ButtonStyle.Link)
     .setURL(client.config.url);

    const action = new ActionRowBuilder<ButtonBuilder>() // prettier
     .addComponents(
      // prettier
      inviteButton,
      contactButton
     );
    return interaction.followUp({ ephemeral: false, embeds: [embed], components: [action] });
   }

   const action = new ActionRowBuilder<ButtonBuilder>() // prettier
    .addComponents(
     // prettier
     inviteButton
    );

   return interaction.followUp({ ephemeral: false, embeds: [embed], components: [action] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
