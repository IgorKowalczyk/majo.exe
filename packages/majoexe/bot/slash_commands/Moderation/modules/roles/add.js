const { MessageEmbed } = require("discord.js");

module.exports = async (client, interaction, args) => {
 try {
  const member = await interaction.guild.members.cache.get(args[2]);
  if (!interaction.guild.me.permissions.has("MANAGE_ROLES")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | I don't have premission to manage roles!`);
  }
  if (!interaction.member.permissions.has("MANAGE_ROLES")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You don't have premission to manage roles!`);
  }
  const role = await interaction.guild.roles.fetch(args[1]);
  if (role.managed) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | The role is managed by external app or discord! You can't add the role to anybody!`);
  }
  if (member.roles.highest.comparePositionTo(interaction.guild.me.roles.highest) >= 0) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You cant add role to this user!`);
  }
  let reason_text = `${args[3] || "No reason provided!"} | Role added by: ${interaction.user.tag}`;
  if (reason_text.length > 1024) reason_text = reason_text.slice(0, 1021) + "...";
  await member.roles.add(role, {
   reason: reason_text,
  });
  const embed = new MessageEmbed()
   .setColor("GREEN")
   .setTitle(`${client.bot_emojis.success} Role added!`)
   .setDescription(`Successfully added ${role} role to ${member.user}!`)
   .setFooter({
    text: `Requested by ${interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   })
   .setThumbnail(member.user.displayAvatarURL());
  interaction.followUp({ embeds: [embed] });
 } catch (err) {
  return client.createSlashError(interaction, `${client.bot_emojis.error} | You cant add role to this user!`);
 }
};
