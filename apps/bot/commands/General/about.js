import { ActionRowBuilder, ApplicationCommandType, ButtonStyle, ButtonBuilder, EmbedBuilder } from "discord.js";

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
     `Majo.exe is a Discord bot made for **Memes, Image editing, Giveaway, Moderation, Anime and even more!** 🎉
     
     It is made by the awesome [Majo.exe Team & Contributors](https://github.com/IgorKowalczyk/majo.exe#-contributors) and is **completly open source and free**.
     
     **You can find the source code [on Github](https://github.com/igorkowalczyk/majo.exe).** If you want to help us with our journey and you know how to code, you can contribute to the project by forking the repository and making a pull request. **We really appreciate it!** ❤️‍🔥

     ${client.config.dashboard.enabled && client.config.dashboard.url ? `**If you want to invite Majo.exe to your server, you can do so by clicking [here](${client.config.dashboard.url})**` : ""}
     `
    )
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      size: 256,
     }),
    })
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp();

   if (client.config.dashboard.enabled && client.config.dashboard.url) {
    const action = new ActionRowBuilder() // prettier
     .addComponents(
      new ButtonBuilder() // prettier
       .setLabel("Dashboard")
       .setStyle(ButtonStyle.Link)
       .setURL(client.config.dashboard.url),
      new ButtonBuilder() // prettier
       .setLabel("Invite")
       .setStyle(ButtonStyle.Link)
       .setURL(`${client.config.dashboard.url}/invite`)
     );

    return interaction.followUp({ ephemeral: false, embeds: [embed], components: [action] });
   } else {
    return interaction.followUp({ ephemeral: false, embeds: [embed] });
   }
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
