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
   if (message.content.includes('-')) { 
    return message.channel.send({embed: {
     color: 16734039,
     description: `❌ | You can\'t add negative money! If you want to remove money please check \`${prefix} removemoney\` command.`
    }})
   }
   let amount = args[1];
   console.log(args[1]);
   if (!amount || isNaN(amount)) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | Please specify a valid amount!"
    }})
   }
   let data = client.economy.addMoney(user.id, amount);
   const embed = new MessageEmbed()
    .setTitle(`Money Added!`)
    .addField(`User`, `<@${data.user}>`)
    .addField(`Balance Given`, `${data.amount} 💸`)
    .addField(`Total Amount`, data.after)
    .setColor("RANDOM")
    .setThumbnail(user.displayAvatarURL)
    .setTimestamp()
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   return message.channel.send(embed);
  } catch(err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
