import { EmbedBuilder, time, ButtonBuilder, ActionRowBuilder, ApplicationCommandType, ButtonStyle } from "discord.js";

export default {
 name: "uptime",
 description: "⌛ View Majo.exe bot uptime and past status",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/uptime",
 run: async (client, interaction, guildSettings) => {
  try {
   const embed = new EmbedBuilder()
    .setTitle("📈 Majo.exe uptime")
    .setDescription(
     `
     **🚀 Date launched**: ${time(client.readyAt)}

     **⏱️ Started**: ${time(client.readyAt, "R")}
     `
    )
    .setTimestamp()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });

   if (client.config.dashboard.enabled && client.config.dashboard.link) {
    const contactButton = new ButtonBuilder().setLabel("Status page").setStyle(ButtonStyle.Link).setURL(`${client.config.dashboard.link}/status`);
    const action = new ActionRowBuilder().addComponents(contactButton);
    return interaction.followUp({ ephemeral: false, embeds: [embed], components: [action] });
   } else {
    return interaction.followUp({ ephemeral: false, embeds: [embed] });
   }
  } catch (err) {
   client.errorMessages.generateErrorMessage(interaction, err);
  }
 },
};
