const { MessageEmbed } = require("discord.js");
const moment = require("moment");
function capitalize(string) {
 return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
 name: "server-info",
 aliases: ["sv", "serverinfo", "server", "guildinfo", "guild-info"],
 description: "Display server info",
 category: "Utility",
 usage: "serverinfo",
 run: async (client, message, args) => {
  try {
   message.guild.fetch();
   message.guild.members.fetch();
   const embed = new MessageEmbed() // Prettier
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
    .setColor("#4f545c")
    .setThumbnail(message.guild.iconURL())
    .addField(`${client.bot_emojis.owner_crown} Owner`, `> <@${message.guild.ownerId}> (ID: \`${message.guild.ownerId}\`)`, true)
    .addField(`${client.bot_emojis.channel} Server ID`, `> \`${message.guild.id}\``, true)
    .addField(`${client.bot_emojis.discord_logo} Description`, `> ${message.guild.description || "No server description!"}`)
    .addField(`${client.bot_emojis.member} Members`, `\`${message.guild.memberCount}/${message.guild.maximumMembers}\` members (\`${message.guild.members.cache.filter((member) => member.user.bot).size}\` bots)`)
    //.addField(`${client.bot_emojis.channel} Channels`, message.guild.channels.cache.size, true)
    //.addField(`${client.bot_emojis.role} Roles`, message.guild.roles.cache.size, true)
    .addField(`${client.bot_emojis.discord_badges} Emojis`, `> Total emojis: \`${message.guild.emojis.cache.size}\``, true)
    .addField(`${client.bot_emojis.boosts_animated} Boosts`, `> \`${message.guild.premiumSubscriptionCount}\` (${capitalize(message.guild.premiumTier.toLowerCase().replace("_", " "))})`, true)
    .addField(`${client.bot_emojis.lock} Verification`, `> \`${capitalize(message.guild.verificationLevel.toLowerCase().replace("_", " "))}\``, true)
    .addField(`${client.bot_emojis.stopwatch} Creation Date`, `> <t:${moment(message.channel.guild.createdTimestamp).unix()}> (<t:${moment(message.channel.guild.createdTimestamp).unix()}:R>)`, true)
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setTimestamp();
   message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
