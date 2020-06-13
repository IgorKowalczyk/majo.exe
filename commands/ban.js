const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    if (message.member.hasPermission("BAN_MEMBERS")) {
        let mentioned = await message.mentions.members.first();
        let reason = await args.slice(1).join(' ');

        if (!mentioned)
            return await message.channel.send({embed: {
                color: 16734039,
                description: "Mention a valid member!"
            }})
        if (!mentioned.bannable)
            return await message.channel.send({embed: {
                color: 16734039,
                description: "You cannot ban this member!"
            }})  
			
		if (message.author === mentioned) {
           return await message.channel.send({embed: {
                color: 16734039,
                description: "You can't ban yourself!"
            }})
		}
        if (!reason)
            reason = "No reason provided!";
        
        mentioned.ban(reason);
        await message.channel.send({embed: {
            color: 3447003,
            title: ":scream: " + mentioned.displayName + " has been Banned! :scream:"
        }});     
    }
}

module.exports.help = {
    name: "ban",
    description: "Bans a member",
    usage: "ban <mention> <reason>",
    type: "Moderation"
}