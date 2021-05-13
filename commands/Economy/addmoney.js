const Discord = require("discord.js");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "addmoney",
 aliases: [],
 description: "Give money to mentioned user",
 category: "Economy",
 usage: "addmoney <user> <money>",
 run: async (client, message, args) => {
  try {
   if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | You don't have premission add money. You need the \`MANAGE_MESSAGES\` premission!"
    }})
   }
   let user = message.mentions.users.first();
   if (!user) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | Please specify a user!"
    }})
   }
   let amount = args[1];
   if (!amount || isNaN(amount)) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | Please specify a valid amount!"
    }})
   }
   if (amount.includes('-')) { 
    return message.channel.send({embed: {
     color: 16734039,
     description: `❌ | You can\'t add negative money! If you want to remove money please check \`${prefix} removemoney\` command.`
    }})
   }
   client.sql.query(`SELECT * FROM "money" WHERE id = "${user.id} AND guild = "${message.guild.id}`, (e, row1) => {
    if (!row1 || row1.length == 0) return client.sql.query(`INSERT INTO "money" (${user.id}, ${amount}, ${message.guild.id})`);
    client.sql.query(`UPDATE "money" SET "money" ="${amount}" WHERE "id" = "${user.id} AND "guild" = "${message.guild.id}`, (e, row2) => {
     client.sql.query(`SELECT * FROM "money" WHERE id = "${user.id} AND guild = "${message.guild.id}`, (e, rowfinal) => {
      const embed = new Discord.MessageEmbed()
      .setTitle(`Money Added!`)
      .addField(`User`, `${user}`)
      .addField(`Balance Given`, `${amount} 💸`)
      .addField(`New Balance`, `${rowfinal} 💸`)
      .setColor("RANDOM")
      .setThumbnail(user.displayAvatarURL)
      .setTimestamp()
      .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     return message.channel.send(embed);
     })
    })
   })
  } catch(err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
