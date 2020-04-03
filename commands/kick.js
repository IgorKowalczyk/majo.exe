const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    if (message.member.hasPermission("KICK_MEMBERS")) {
        let mentioned = await message.mentions.members.first();
        let reason = await args.slice(1).join(' ');

        message.delete();
        if (!mentioned)
            return await message.channel.send({embed: {
                color: 3447003,
                title: "Mention a valid member!"
            }}).then(msg => msg.delete(2000));
        if (!mentioned.kickable)
            return await message.channel.send({embed: {
                color: 3447003,
                title: "You cannot kick this member!"
            }}).then(msg => msg.delete(2000));    
        if (!reason)
            reason = "No reason provided!";
        
        mentioned.kick(reason);
        await message.channel.send({embed: {
            color: 3447003,
            title: ":arrow_right: " + mentioned.displayName + " has been Kicked! :door:"
        }});     
    }
}

module.exports.help = {
    name: "kick",
    description: "Kicks a member",
    usage: "kick <mention> <reason>",
    type: "Moderation"
}