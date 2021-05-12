const Discord = require("discord.js");

module.exports = {
 name: "balance",
 aliases: ["bal"],
 description: "Display your or a mentioned user balance",
 category: "Economy",
 usage: "balance <user>",
 run: async (client, message, args) => {
  try {
   (async () => {
    let user = message.mentions.users.first() || message.author;
    let balance = client.economy.fetchMoney(user.id, message.guild.id);
    const embed = new Discord.MessageEmbed()
     .setTitle(`${user.username}'s Balance`)
     .addField(`Balance`, `${balance} 💸`)
     .setColor("RANDOM")
     .setThumbnail(user.displayAvatarURL)
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     .setTimestamp();
    return message.channel.send(embed);
   })()
  } catch(err) {
   console.log(err);
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
