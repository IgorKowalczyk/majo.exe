const { MessageEmbed } = require("discord.js");

module.exports = async (client, interaction, args) => {
 try {
  if (!interaction.guild.me.permissions.has("BAN_MEMBERS")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | I don't have premission to ban members!`);
  }
  if (!interaction.member.permissions.has("BAN_MEMBERS")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You don't have premission to ban members!`);
  }
  const user = interaction.guild.members.cache.get(args[1]);
  const reason = `${args[3] || "No reason provided!"} | Banned by: ${interaction.user.username}`;
  if (!user) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | I couldn't find that user!`);
  }
  let member = await interaction.guild.members.fetch(user.id);
  if (!member) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | I couldn't find that user.`);
  }
  if (!member.bannable) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You cannot ban this member!`);
  }
  if (interaction.member === member) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You can't ban yourself!`);
  }
  if (member.roles.highest.comparePositionTo(interaction.guild.me.roles.highest) >= 0) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You cant ban this user!`);
  }
  if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
  interaction.guild.members.ban(member, {
   reason: reason,
  });
  const embed = new MessageEmbed()
   .setDescription(`${client.bot_emojis.success} | ${member.displayName} has been banned.\n\n>>> Reason: \`${reason}\``)
   .setTimestamp()
   .setColor("GREEN")
   .setFooter({
    text: `Requested by ${interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   });
  await interaction.followUp({ embeds: [embed] });
 } catch (err) {
  console.log(err);
  return client.createSlashCommandError(interaction, err);
 }
};
