import { checkXP } from "@majoexe/util/database";
import { percentageBar } from "@majoexe/util/functions";
import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, codeBlock } from "discord.js";

export default {
 name: "xp",
 description: "📈 Check your current XP",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: false,
 usage: "/xp [user]",
 options: [
  {
   name: "user",
   description: "The user you want to check the XP of",
   type: ApplicationCommandOptionType.User,
   required: false,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const user = interaction.options.getUser("user") || interaction.member?.user;
   if (user.bot) {
    const embed = new EmbedBuilder()
     .setColor("#EF4444")
     .setTimestamp()
     .setTitle("❌ Error")
     .setDescription("> You can't check the XP of a bot.\nNote: Bots don't gain XP.")
     .setFooter({
      text: `Requested by ${interaction.member?.user?.username}`,
      iconURL: interaction.member?.user?.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    return interaction.followUp({ ephemeral: true, embeds: [embed] });
   }

   const xp = await checkXP(user.id, interaction.guild?.id);
   const level = Math.floor(0.1 * Math.sqrt(xp || 0));
   const xpNeeded = Math.ceil(Math.pow((level + 1) / 0.1, 2));
   const bar = percentageBar(xpNeeded, xp, 20);
   const embed = new EmbedBuilder()
    .setTitle(`📈 XP for ${user?.username}`)
    .setDescription(
     `
     **XP:** \`${xp}\`
     **Level:** \`${level}\`
     ${codeBlock(bar)}
     (\`${xpNeeded - xp}\` XP until next level 🔥)
     `
    )
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
     }),
    })
    .setThumbnail(user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
    .setColor(guildSettings?.embedColor || client.config.global.defaultColor)
    .setTimestamp();

   if (client.config.dashboard.enabled && client.config.dashboard.link) {
    embed.setImage(`${client.config.dashboard.link}/api/level/image/${user.id}`);
    const contactButton = new ButtonBuilder().setLabel("View Leaderboard").setStyle(ButtonStyle.Link).setURL(`${client.config.dashboard.link}/dashboard/${interaction.guild?.id}/leaderboard`);
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
