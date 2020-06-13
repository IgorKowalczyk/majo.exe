const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
  if (message.member.hasPermission("MANAGE_MESSAGES")) {
  let user = message.mentions.members.first();
  if (!user) return message.channel.send({embed: {
                    color: 16734039,
                    description: "You must mention someone to remove money!"
                }})
    if (isNaN(args[1])) return message.channel.send({embed: {
                    color: 16734039,
                    description: "You must enter the amount of money to remove!"
                }})
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)
	if (bal < 0) {
		return message.channel.send({embed: {
                    color: 16734039,
                    description: "You can't remove more money than this person has!"
                }})
	}

    db.subtract(`money_${message.guild.id}_${user.id}`, args[1])
	
    let moneyEmbed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`:white_check_mark: Removed ${args[1]} coins\n\nNew Balance: ${bal}`);
    message.channel.send(moneyEmbed)
    } else {
	message.channel.send({embed: {
                    color: 16734039,
                    description: "You don't have premission to remove money!"
                }})
	}
}


module.exports.help = {
    name: "removemoney",
    description: "Remove a money from user",
    usage: "removemoney <mention> <money>",
    type: "Economy"  
}