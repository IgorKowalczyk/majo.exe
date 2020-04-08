const Discord = require("discord.js");

exports.run = (client, message, args) => {
  if (message.member.hasPermission("BAN_MEMBERS")) {  
    const reason = args.slice(1).join(' ');
    client.unbanReason = reason;
    client.unbanAuth = message.author;

    const user = args[0];

    if (reason.length > 1) {
		message.delete(); 
		message.channel.send({embed: {
                    color: 3447003,
                    title: "You must supply a reason for the unban."
                }}).then(msg => msg.delete(2000));
	} else if (!user) {
		message.delete();
		message.channel.send({embed: {
                    color: 3447003,
                    title: "You must supply a User Resolvable, such as a user id."
                }}).then(msg => msg.delete(2000));
	}
    message.guild.unban(user);
  }
};
				
exports.help = {
  name: "unban",
  description: "Unbans the user.",
  usage: "unban <mention> <reason>",
  type: "Moderation"
};