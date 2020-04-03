const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    if (message.member.hasPermission("BAN_MEMBERS")) {
        let mentioned = await message.mentions.members.first();
        let reason = await args.slice(1).join(' ');

        message.delete();
        if (!mentioned)
            return await message.channel.send({embed: {
                color: 3447003,
                title: "Mention a valid member!"
            }}).then(msg => msg.delete(2000));
        if (!mentioned.bannable)
            return await message.channel.send({embed: {
                color: 3447003,
                title: "You cannot ban this member!"
            }}).then(msg => msg.delete(2000));    
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