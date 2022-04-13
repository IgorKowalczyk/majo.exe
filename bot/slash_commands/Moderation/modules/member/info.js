const { MessageEmbed } = require("discord.js");

module.exports = async (client, interaction, args) => {
 try {
  const member = await interaction.guild.members.fetch(args[1]);
  if (!member) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | I couldn't find that user.`);
  }
  const flags = {
   "": "None!",
   DISCORD_EMPLOYEE: client.bot_emojis.discord_employee,
   DISCORD_PARTNER: client.bot_emojis.discord_partner,
   BUGHUNTER_LEVEL_1: client.bot_emojis.bug_hunter_1,
   BUGHUNTER_LEVEL_2: client.bot_emojis.bug_hunter_2,
   HYPESQUAD_EVENTS: client.bot_emojis.hypesquad,
   HOUSE_BRILLIANCE: client.bot_emojis.hypesquad_brilliance,
   HOUSE_BRAVERY: client.bot_emojis.hypesquad_bravery,
   HOUSE_BALANCE: client.bot_emojis.hypesquad_balance,
   EARLY_SUPPORTER: client.bot_emojis.early_supporter,
   TEAM_USER: "Team User (?)",
   VERIFIED_BOT: `${client.bot_emojis.bot_badge_part_1}${client.bot_emojis.bot_badge_part_2}`,
   EARLY_VERIFIED_DEVELOPER: client.bot_emojis.verified_bot_developer,
  };
  const embed = new MessageEmbed() // Prettier
   .setColor("#4f545c")
   .setAuthor({ name: "User information", iconURL: member.user.displayAvatarURL() })
   .setThumbnail(
    member.user.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    })
   )
   .setTimestamp()
   .setFooter({
    text: `Requested by ${interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   });
  embed.addField(`${client.bot_emojis.role} ID`, `> \`${member.user.id}\``, true);
  embed.addField(`${client.bot_emojis.channel} Discriminator`, `> \`#${member.user.discriminator}\``, true);
  if (member.nickname) embed.addField(`${client.bot_emojis.member} Nickname`, `> \`${member.nickname}\``);
  embed.addField(`${client.bot_emojis.stopwatch} Joined server at`, `> <t:${parseInt(member.joinedTimestamp / 1000)}> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)`);
  embed.addField(`${client.bot_emojis.stopwatch} Account created at`, `> <t:${parseInt(member.user.createdAt / 1000)}> (<t:${parseInt(member.user.createdAt / 1000)}:R>)`);
  embed.addField(`${client.bot_emojis.role} Highest role`, `> ${member.roles.highest}`, true);
  embed.addField(`${client.bot_emojis.discord_badges} Badges`, `> ${flags[member.user.flags.toArray().join(", ")]}`, true);
  embed.setTitle(`${member.user.tag} ${member.user.bot ? `${client.bot_emojis.bot_badge_part_1}${client.bot_emojis.bot_badge_part_2}` : ""}`);
  interaction.followUp({ embeds: [embed] });
 } catch (err) {
  console.log(err);
  return client.createSlashCommandError(interaction, err);
 }
};
