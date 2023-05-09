import { createErrorEmbed } from "@majoexe/util/src/functions/createErrorEmbed.js";
import { ApplicationCommandType, EmbedBuilder } from "discord.js";
import { config } from "../../config/index.js";

export default {
 name: "about",
 description: "🏷️ Learn more about Majo.exe",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 usage: "/about",
 run: async (client, interaction) => {
  try {
   const embed = new EmbedBuilder() // Prettier
    .setTitle(`🤖 About ${client.user?.username}`)
    .setDescription(
     `
     Majo.exe is a Discord bot that is made for fun and moderation.  ${config.dashboard.enabled ? `It is made by [Majo.exe Team](${config.dashboard.link}/team) and is open source.` : ""}
     You can find the source code [on Github](https://github.com/igorkowalczyk/majo.exe). If you want to contribute, you can do so by forking the repository and making a pull request.

     ${config.dashboard.enabled ? `If you want to invite Majo.exe to your server, you can do so by clicking [here](${config.dashboard.link})` : ""}
     `
    )
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
    .setTimestamp();
   return interaction.reply({ ephemeral: false, embeds: [embed] });
  } catch (err) {
   console.log(err);
   const errorEmbed = createErrorEmbed(err);
   return interaction?.reply({ embeds: [errorEmbed] });
  }
 },
};
