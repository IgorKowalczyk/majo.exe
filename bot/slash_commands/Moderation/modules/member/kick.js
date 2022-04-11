const { MessageEmbed } = require("discord.js");

module.exports = async (client, interaction, args) => {
 try {
  if (!interaction.guild.me.permissions.has("KICK_MEMBERS")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | I don't have premission to kick members!`);
  }
  if (!interaction.member.permissions.has("KICK_MEMBERS")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You don't have premission to kick members!`);
  }
  const user = interaction.guild.members.cache.get(args[1]);
  let reason = `${args[2] || "No reason provided!"} | Kicked by: ${interaction.user.tag}`;
  if (!user) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | Mention a valid member!\n\n**Usage:** \`/member kick <mention> [reason]\``);
  }
  if (!user.kickable) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You cannot kick this member!`);
  }
  if (interaction.user === user) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You can't kick yourself!`);
  }
  if (user.roles.highest.comparePositionTo(interaction.guild.me.roles.highest) >= 0) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You cant kick this user!`);
  }
  if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
  interaction.guild.members.kick(user, {
   reason: reason,
  });
  const embed = new MessageEmbed()
   .setDescription(`${client.bot_emojis.success} | \`${user.user.tag}\` (ID: \`${user.user.id}\`) has been kicked.\n\n>>> Reason: \`${reason}\``)
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
