import { ApplicationCommandType, EmbedBuilder } from "discord.js";

export default {
 name: "about",
 description: "🏷️ Learn more about Majo.exe",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/about",
 run: async (client, interaction, guildSettings) => {
  try {
   const embed = new EmbedBuilder() // Prettier
    .setTitle(`🤖 About ${client.user.username}`)
    .setDescription(
     `
     Majo.exe is a Discord bot that is made for fun and moderation. ${client.config.dashboard.enabled && client.config.dashboard.url ? `It is made by [Majo.exe Team](${client.config.dashboard.url}/team) and is open source.` : ""}
     You can find the source code [on Github](https://github.com/igorkowalczyk/majo.exe). If you want to contribute, you can do so by forking the repository and making a pull request.

     ${client.config.dashboard.enabled && client.config.dashboard.url ? `If you want to invite Majo.exe to your server, you can do so by clicking [here](${client.config.dashboard.url})` : ""}
     `
    )
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      size: 256,
     }),
    })
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTimestamp();
   return interaction.followUp({ ephemeral: false, embeds: [embed] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
