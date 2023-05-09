import { createErrorEmbed } from "@majoexe/util/src/functions/createErrorEmbed.js";
import { ApplicationCommandType, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";
import { config } from "../../config/index.js";

export default {
 name: "servers",
 description: "🧭 Display the number of servers the Majo.exe is in",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 usage: "/servers",
 run: async (client, interaction) => {
  try {
   const allGuilds = client.guilds.cache;
   const embed = new EmbedBuilder() // Prettier
    .setTitle(`🧭 ${client.user?.username} is in ${allGuilds.size} servers!`)
    .setDescription(`If you want to invite Majo.exe to your server, you can do so by clicking [here](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands).`)
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setColor("#5865F2")
    .setTimestamp()
    .setThumbnail(client.user?.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }));

   const inviteButton = new ButtonBuilder().setLabel("Invite").setStyle(ButtonStyle.Link).setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`);

   if (config.dashboard.enabled && config.dashboard.link) {
    const contactButton = new ButtonBuilder().setLabel("Dashboard").setStyle(ButtonStyle.Link).setURL(config.dashboard.link);
    const action = new ActionRowBuilder().addComponents(inviteButton, contactButton);
    return interaction.reply({ ephemeral: false, embeds: [embed], components: [action] });
   }

   const action = new ActionRowBuilder().addComponents(inviteButton);

   return interaction.reply({ ephemeral: false, embeds: [embed], components: [action] });
  } catch (err) {
   console.log(err);
   const errorEmbed = createErrorEmbed(err);
   return interaction?.reply({ embeds: [errorEmbed] });
  }
 },
};
