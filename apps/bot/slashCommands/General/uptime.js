import { createErrorEmbed } from "@majoexe/util/src/functions/createErrorEmbed.js";
import { ApplicationCommandType } from "discord.js";
import { EmbedBuilder, time, ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";
import { config } from "../../config/index.js";

export default {
 name: "uptime",
 description: "⌛ View Majo.exe bot uptime and past status",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 usage: "/uptime",
 run: async (client, interaction) => {
  try {
   const embed = new EmbedBuilder()
    .setDescription(
     `
     **🚀 Date launched**: ${time(client.readyAt)}

     **⏱️ Started**: ${time(client.readyAt, "R")}
     `
    )
    .setTimestamp()
    .setColor("#5865F2")
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   if (config.dashboard.enabled && config.dashboard.link) {
    const contactButton = new ButtonBuilder().setLabel("Status page").setStyle(ButtonStyle.Link).setURL(`${config.dashboard.link}/status`);
    const action = new ActionRowBuilder().addComponents(contactButton);
    return interaction.reply({ ephemeral: false, embeds: [embed], components: [action] });
   } else {
    return interaction.reply({ ephemeral: false, embeds: [embed] });
   }
  } catch (err) {
   console.log(err);
   const errorEmbed = createErrorEmbed(err);
   return interaction?.reply({ embeds: [errorEmbed] });
  }
 },
};
