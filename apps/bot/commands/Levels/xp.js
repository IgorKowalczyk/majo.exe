import { checkXP } from "@majoexe/util/database";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";
import { createXPCard } from "../../util/images/createXPCard.js";

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
   const user = interaction.options.getUser("user") || interaction.member.user;
   if (user.bot) {
    return client.errorMessages.createSlashError(interaction, "❌ You can't check the XP of a bot.\nNote: Bots don't gain XP.");
   }
   const xp = await checkXP(user.id, interaction.guild.id);
   const level = Math.floor(0.1 * Math.sqrt(xp || 0));
   const xpNeeded = Math.ceil(Math.pow((level + 1) / 0.1, 2));

   user.avatar = user.displayAvatarURL({
    dynamic: false,
    format: "png",
    size: 128,
   });

   const rank = await createXPCard(user, { xp, level, xpNeeded }, guildSettings?.embedColor || client.config.defaultColor);

   const attachment = new AttachmentBuilder(rank, {
    name: "rank.png",
   });

   const embed = new EmbedBuilder()
    .setTitle(`📈 XP for ${user.globalName || user.username}`)
    .setFooter({
     text: `Requested by ${interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      dynamic: true,
      format: "png",
     }),
    })
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setImage("attachment://rank.png")
    .setTimestamp();

   if (client.config.dashboard.enabled && client.config.dashboard.link) {
    embed.setImage(`${client.config.dashboard.link}/api/level/image/${user.id}`);
    const contactButton = new ButtonBuilder().setLabel("View Leaderboard").setStyle(ButtonStyle.Link).setURL(`${client.config.dashboard.link}/dashboard/${interaction.guild.id}/leaderboard`);
    const action = new ActionRowBuilder().addComponents(contactButton);
    return interaction.followUp({ ephemeral: false, embeds: [embed], components: [action] });
   } else {
    return interaction.followUp({ ephemeral: false, embeds: [embed], files: [attachment] });
   }
  } catch (err) {
   console.log(err);
   client.errorMessages.internalError(interaction, err);
  }
 },
};
