import { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
 name: "invite",
 description: "🎉 Invite Majo.exe to your server!",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/invite",
 run: async (client, interaction, guildSettings) => {
  try {
   const inviteLink = `https://discord.com/oauth2/authorize/?permissions=${client.config.permissions}&scope=${client.config.scopes}&client_id=${client.user.id}`;
   const inviteLinkRoot = `https://discord.com/oauth2/authorize/?permissions=8&scope=${client.config.scopes}&client_id=${client.user.id}`;
   const embed = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle(`🎉 Invite ${client.user.username} to your server!`)
    .setDescription(`> **[Click this link to invite me!](${inviteLink})** **__[Recomended!]__**\n\n *Or [click this link to invite me as administrator](${inviteLinkRoot}) [Not recomended!]*`)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      size: 256,
     }),
    });
   const row = new ActionRowBuilder() // Prettier
    .addComponents(
     new ButtonBuilder() // Prettier
      .setURL(inviteLink)
      .setLabel("Invite me!")
      .setStyle(ButtonStyle.Link)
    );
   return interaction.followUp({ ephemeral: false, embeds: [embed], components: [row] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
