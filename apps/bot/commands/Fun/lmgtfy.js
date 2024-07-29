import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";

export default {
 name: "lmgtfy",
 description: "🔍 Let me google that for you",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/lmgtfy <query>",
 options: [
  {
   name: "query",
   description: "Search query",
   required: true,
   type: ApplicationCommandOptionType.String,
   max_length: 256,
  },
 ],
 run: (client, interaction, guildSettings) => {
  try {
   const query = interaction.options.getString("query");

   const embed = new EmbedBuilder()
    .setTitle("🔍 Let me google that for you")
    .setDescription(`>>> https://letmegooglethat.com/?q=${encodeURIComponent(query)}`)
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({ size: 256 }),
    });

   const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder() // prettier
     .setLabel("Search")
     .setEmoji("🔍")
     .setStyle(ButtonStyle.Link)
     .setURL(`https://letmegooglethat.com/?q=${encodeURIComponent(query)}`)
   );

   return interaction.followUp({ embeds: [embed], components: [row] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
