const Discord = require("discord.js");

module.exports = {
 name: "leaderboard",
 aliases: [],
 description: "Display server economy leaderboard",
 category: "Economy",
 usage: "leaderboard",
 run: async (client, message, args) => {
  try {
   let lb = await client.economy.leaderboard(false, 10);
   const embed = new Discord.MessageEmbed()
    .setTitle("Leaderboard")
    .setColor("RANDOM")
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    lb.forEach(u => {
     embed.addField(`${u.position}. ${client.users.cache.get(u.user).tag || "Unknown#0000"}`, `Money: ${u.money || "0"} 💸`);
    });
   return message.channel.send(embed);
  } catch (err) {
    message.channel.send({embed: {
     color: 16734039,
     description: "Something went wrong... :cry:"
    }})
   }
  }
 }
 