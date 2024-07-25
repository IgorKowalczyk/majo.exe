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
     `**Nyxia** is a heavily modified version of [\`Majo.exe\`](https://github.com/IgorKowalczyk/majo.exe) originally developed by [\`Igor Kowalczyk\`](https://github.com/igorkowalczyk) and contributed by [\`these people\`](https://github.com/IgorKowalczyk/majo.exe#-contributors)!

     > - ⭐ Star the repository [\`here\`](https://github.com/tsukiyodevs/nyxia)!
     > - 💖 Support us [\`here\`](https://github.com/sponsors/tsukiyodevs)!
     
     > - 💖 Support Igor and his work [\`here\`](https://github.com/sponsors/igorkowalczyk)!
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

   if (client.config.url) {
    const action = new ActionRowBuilder() // prettier
     .addComponents(
      new ButtonBuilder() // prettier
       .setLabel("Dashboard")
       .setStyle(ButtonStyle.Link)
       .setURL(client.config.url),
      new ButtonBuilder() // prettier
       .setLabel("Invite")
       .setStyle(ButtonStyle.Link)
       .setURL(`${client.config.url}/invite`)
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
