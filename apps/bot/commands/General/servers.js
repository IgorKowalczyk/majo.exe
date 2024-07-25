import { formatNumber } from "@nyxia/util/functions/util";
import { ApplicationCommandType, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";

export default {
 name: "servers",
 description: "🧭 Display the number of servers the Nyxia is in",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/servers",
 run: async (client, interaction, guildSettings) => {
  try {
   const allGuilds = client.guilds.cache;
   const allChannels = client.channels.cache;
   const allUsers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

   const inviteLink = `https://discord.com/oauth2/authorize/?permissions=${client.config.permissions}&scope=${client.config.scopes}&client_id=${client.user.id}`;
   const embed = new EmbedBuilder() // Prettier
    .setTitle(`🧭 ${client.user.username} is in ${allGuilds.size} servers!`)
    .setDescription(`To be exact, <@${client.user.id}> is serving commands to \`${formatNumber(allUsers) || "no"}\` users in \`${formatNumber(allChannels.size)}\` channels across \`${formatNumber(allGuilds.size)}\` servers!\n\n**If you want to invite Nyxia to your server, you can do so by clicking [here](${inviteLink}).**`)
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
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

    const action = new ActionRowBuilder() // prettier
     .addComponents(
      // prettier
      inviteButton,
      contactButton
     );
    return interaction.followUp({ ephemeral: false, embeds: [embed], components: [action] });
   }

   const action = new ActionRowBuilder().addComponents(inviteButton);

   return interaction.followUp({ ephemeral: false, embeds: [embed], components: [action] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
