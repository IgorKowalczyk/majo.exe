const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    if (message.member.hasPermission("KICK_MEMBERS")) {
        let mentioned = await message.mentions.members.first();
        let reason = await args.slice(1).join(' ');

        if (!mentioned)
            return await message.channel.send({embed: {
                color: 16734039,
                description: "Mention a valid member!"
            }})
        if (!mentioned.kickable)
            return await message.channel.send({embed: {
                color: 16734039,
                description: "You cannot kick this member!"
            }})   
		if (message.author === mentioned) {
           return await message.channel.send({embed: {
                color: 16734039,
                description: "You cant kick yourself!"
            }})
		}
        if (!reason)
            reason = "No reason provided!";
        
        mentioned.kick(reason);
        await message.channel.send({embed: {
            color: 16734039,
            description: ":arrow_right: " + mentioned.displayName + " has been Kicked! :door:"
        }});     
    } else {
	message.channel.send({embed: {
                    color: 16734039,
                    description: "You don't have premission to kick members!"
                }})
	}
}

module.exports.help = {
    name: "kick",
    description: "Kicks a member",
    usage: "kick <mention> <reason>",
    type: "Moderation"
}