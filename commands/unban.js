const Discord = require("discord.js");

exports.run = (client, message, args) => {
  if (message.member.hasPermission("BAN_MEMBERS")) {  
    const reason = args.slice(1).join(' ');
    client.unbanReason = reason;
    client.unbanAuth = message.author;

    const user = args[0];

    if (reason.length < 1) {
		return message.channel.send({embed: {
                    color: 16734039,
                    description: "You must supply a reason for the unban."
                }})
	} else if (!user) {
		return message.channel.send({embed: {
                    color: 16734039,
                    description: "You must supply a User Resolvable, such as a user id."
                }})
	}
    message.guild.unban(user);
		message.channel.send({embed: {
                    color: 16734039,
                    description: "User has been unbaned! :scream:"
                }})
  }
};
				
module.exports.help = {
  name: "unban",
  description: "Unbans the user.",
  usage: "unban <mention> <reason>",
  type: "Moderation"
}