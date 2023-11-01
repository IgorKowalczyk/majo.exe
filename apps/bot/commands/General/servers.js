import { formatNumber } from "@majoexe/util/functions";
import { ApplicationCommandType, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";

export default {
 name: "servers",
 description: "🧭 Display the number of servers the Majo.exe is in",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/servers",
 run: async (client, interaction, guildSettings) => {
  try {
   const allGuilds = client.guilds.cache;
   const allChannels = client.channels.cache;
   const inviteLink = `https://discord.com/oauth2/authorize/?permissions=${client.config.permissions}&scope=${client.config.scopes}&client_id=${client.user.id}`;
   const embed = new EmbedBuilder() // Prettier
    .setTitle(`🧭 ${client.user.username} is in ${allGuilds.size} servers!`)
    .setDescription(`**...thats a lot of servers!** To be exact, <@${client.user.id}> is serving commands to \`${formatNumber(client.users.cache.size) || "0"}\` users in \`${formatNumber(allChannels.size)}\` channels across \`${formatNumber(allGuilds.size)}\` servers!\n\n**If you want to invite Majo.exe to your server, you can do so by clicking [here](${inviteLink}).**`)
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      size: 256,
     }),
    })
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setThumbnail(client.user.displayAvatarURL({ size: 256 }));

   const inviteButton = new ButtonBuilder().setLabel("Invite").setStyle(ButtonStyle.Link).setURL(inviteLink);

   if (client.config.dashboard.enabled && client.config.dashboard.url) {
    const contactButton = new ButtonBuilder().setLabel("Dashboard").setStyle(ButtonStyle.Link).setURL(client.config.dashboard.url);
    const action = new ActionRowBuilder().addComponents(inviteButton, contactButton);
    return interaction.followUp({ ephemeral: false, embeds: [embed], components: [action] });
   }

   const action = new ActionRowBuilder().addComponents(inviteButton);

   return interaction.followUp({ ephemeral: false, embeds: [embed], components: [action] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
