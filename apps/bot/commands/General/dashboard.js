import { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
 name: "dashboard",
 description: "💻 Visit our dashboard",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/dashboard",
 run: async (client, interaction, guildSettings) => {
  try {
   if (!client.config.dashboard.enabled || !client.config.dashboard.link) {
    const embed = new EmbedBuilder()
     .setDescription("Our dashboard is not working at the moment, please try again later!")
     .setFooter({
      text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
      iconURL: interaction.member.user.displayAvatarURL({
       size: 256,
      }),
     })
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle("💻 Dashboard");
    return interaction.followUp({ ephemeral: false, embeds: [embed] });
   }

   const contactButton = new ButtonBuilder().setLabel("Dashboard").setStyle(ButtonStyle.Link).setURL(client.config.dashboard.link);
   const action = new ActionRowBuilder().addComponents(contactButton);

   const embed = new EmbedBuilder()
    .setDescription("Click the button below to visit our dashboard!")
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      size: 256,
     }),
    })
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle("💻 Dashboard");

   return interaction.followUp({ ephemeral: false, embeds: [embed], components: [action] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
