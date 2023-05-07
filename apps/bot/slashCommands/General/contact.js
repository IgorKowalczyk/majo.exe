import { createErrorEmbed } from "@majoexe/util/src/functions/createErrorEmbed.js";
import { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { config } from "../../config/index.js";

export default {
 name: "contact",
 description: "📝 Contact the Majo.exe team",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 usage: "/contact",
 run: async (_, interaction) => {
  try {
   if (!config.dashboard.enabled) {
    const embed = new EmbedBuilder()
     .setDescription("Our dashboard (and the contact page itself) is not working at the moment, please try again later!")
     .setFooter({
      text: `Requested by ${interaction.member?.user?.username}`,
      iconURL: interaction.member.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setColor("#5865F2")
     .setTimestamp()
     .setTitle("📝 Contact");
    return interaction.reply({ ephemeral: false, embeds: [embed] });
   }

   const contactButton = new ButtonBuilder().setLabel("Contact").setStyle(ButtonStyle.Link).setURL(`${config.dashboard.link}/contact`);
   const action = new ActionRowBuilder().addComponents(contactButton);

   const embed = new EmbedBuilder()
    .setDescription("Click the button below to contact the Majo.exe team!")
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
    .setTitle("📝 Contact");

   return interaction.reply({ ephemeral: false, embeds: [embed], components: [action] });
  } catch (err) {
   console.log(err);
   const errorEmbed = createErrorEmbed(err);
   return interaction?.reply({ embeds: [errorEmbed] });
  }
 },
};
