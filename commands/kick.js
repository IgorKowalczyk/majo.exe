const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    if (message.member.hasPermission("KICK_MEMBERS")) {
        let mentioned = await message.mentions.members.first();
        let reason = await args.slice(1).join(' ');

        if (!mentioned)
            return await message.channel.send({embed: {
                color: 16734039,
                title: "Mention a valid member!"
            }})
        if (!mentioned.kickable)
            return await message.channel.send({embed: {
                color: 16734039,
                title: "You cannot kick this member!"
            }})   
		if (message.author === mentioned) {
           return await message.channel.send({embed: {
                color: 16734039,
                title: "You cant kick yourself!"
            }})
		}
        if (!reason)
            reason = "No reason provided!";
        
        mentioned.kick(reason);
        await message.channel.send({embed: {
            color: 16734039,
            title: ":arrow_right: " + mentioned.displayName + " has been Kicked! :door:"
        }});     
    } else {
	message.channel.send({embed: {
                    color: 3447003,
                    title: "You don't have premission to kick members!"
                }})
	}
}

module.exports.help = {
    name: "kick",
    description: "Kicks a member",
    usage: "kick <mention> <reason>",
    type: "Moderation"
}