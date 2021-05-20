const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
 name: "userinfo",
 aliases: ["uf", "user-info"],
 description: "Get a info about user",
 category: "Utility",
 usage: "userinfo [user]",
 run: async (client, message, args) => { 
  try {
   const member = message.mentions.members.first() || message.author;
   const embed = new Discord.MessageEmbed()
    .setTitle(`${member.displayName}'s Information`)
    .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
    .addField('User', member, true)
    .addField('Discriminator', `\`#${member.user.discriminator}\``, true)
    .addField('ID', `\`${member.id}\``, true)
    .addField('Status', statuses[member.presence.status], true)
    .addField('Bot', `\`${member.user.bot}\``, true)
    .addField('Color Role', member.roles.color || '`None`', true)
    .addField('Highest Role', member.roles.highest, true)
    .addField('Joined server on', `\`${moment(member.joinedAt).format('MMM DD YYYY')}\``, true)
    .addField('Joined Discord on', `\`${moment(member.user.createdAt).format('MMM DD YYYY')}\``, true)
    .setFooter(message.member.displayName, message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setColor(member.displayHexColor);
   if (activities.length > 0) embed.setDescription(activities.join('\n'));
   if (customStatus) embed.spliceFields(0, 0, {
    name: 'Custom Status',
    value: customStatus
   });
   if (userFlags.length > 0) embed.addField('Badges', userFlags.map(flag => flags[flag]).join('\n'));
   message.channel.send(embed);
  } catch(err) {
   console.log(err);
   message.lineReply({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
 