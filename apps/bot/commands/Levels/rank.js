import { checkXP, fetchXPSettings } from "@nyxia/util/database";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";
import { createXPCard } from "../../util/images/createXPCard.js";

export default {
 name: "rank",
 description: "📈 Check your current level and XP",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: false,
 usage: "/rank [user]",
 options: [
  {
   name: "user",
   description: "The user you want to check the level and XP of",
   type: ApplicationCommandOptionType.User,
   required: false,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const xpSettings = await fetchXPSettings(interaction.guild.id);
   if (!xpSettings || !xpSettings.enableXP) {
    return client.errorMessages.createSlashError(interaction, "❌ Leveling is disabled in this server.");
   }
   const user = interaction.options.getUser("user") || interaction.member.user;
   if (user.bot) {
    return client.errorMessages.createSlashError(interaction, "❌ You can't check the level and XP of a bot. Note: Bots don't gain XP.");
   }
   const xp = await checkXP(user.id, interaction.guild.id);
   const level = Math.floor(0.1 * Math.sqrt(xp || 0));
   const xpNeeded = Math.ceil(Math.pow((level + 1) / 0.1, 2));

   user.avatar = user.displayAvatarURL({
    dynamic: false,
    size: 128,
   });

   const rank = await createXPCard(user, { xp, level, xpNeeded }, guildSettings?.embedColor || client.config.defaultColor);

   const attachment = new AttachmentBuilder(rank, {
    name: "rank.png",
   });

   const embed = new EmbedBuilder()
    .setTitle(`📈 ${user.globalName || user.username} level`)
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({ size: 256 }),
    })
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setImage("attachment://rank.png")
    .setTimestamp();

   if (client.config.url) {
    const action = new ActionRowBuilder().addComponents(
     new ButtonBuilder() // Prettier
      .setLabel("View Leaderboard")
      .setStyle(ButtonStyle.Link)
      .setURL(`${client.config.url}/dashboard/${interaction.guild.id}/leaderboard`)
    );
    return interaction.followUp({ ephemeral: false, embeds: [embed], components: [action], files: [attachment] });
   } else {
    return interaction.followUp({ ephemeral: false, embeds: [embed], files: [attachment] });
   }
  } catch (err) {
   console.log(err);
   client.errorMessages.internalError(interaction, err);
  }
 },
};
