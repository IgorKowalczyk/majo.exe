const { MessageEmbed } = require("discord.js");

module.exports = async (client, interaction, args) => {
 try {
  const role = await interaction.guild.roles.fetch(args[1]);
  const embed = new MessageEmbed()
   .setAuthor({
    name: role.name,
    iconURL: interaction.guild.iconURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   })
   .setColor(role.color)
   .setFooter({
    text: `Requested by ${interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   })
   .addField(`${client.bot_emojis.role} Role ID`, `> \`${role.id}\``)
   .addField(`${client.bot_emojis.color} Color`, `> \`${role.hexColor}\``)
   .addField(`${client.bot_emojis.stage_channel} Mention`, `> <@&${role.id}>`)
   .addField(`${client.bot_emojis.stopwatch} Date created`, `> <t:${Math.floor(role.createdTimestamp / 1000)}:F> (<t:${Math.floor(role.createdTimestamp / 1000)}:R>)`)
   .addField(`${client.bot_emojis.member} Members `, `\`${role.members.size}\` members with this role`)
   .addField(`${client.bot_emojis.arrows_clockwise} Position `, `\`${role.position}/${interaction.guild.roles.cache.size}\` (from top)`)
   .addField(`${client.bot_emojis.owner_crown} Hoisted `, `\`${role.hoist}\``, true)
   .addField(`${client.bot_emojis.jigsaw} Managed `, `\`${role.managed}\` ${role.managed && role.tags && role.tags.botId ? `(by <@${role.tags.botId}>)` : ""}`, true)
   .addField(`${client.bot_emojis.mention} Mentionable `, `\`${role.mentionable}\``, true);
  interaction.followUp({ embeds: [embed] });
 } catch (err) {
  console.log(err);
  return client.createSlashCommandError(interaction, err);
 }
};
