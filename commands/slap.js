const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    let member = await message.mentions.members.first();

    if (!member) {
        return message.channel.send({embed: {
            color: 3447003,
            title: "Mention a valid member of this server!"
        }}).then(msg => msg.delete(2132));
    }

    await message.channel.send({embed: {
        color: 3447003,
        title: message.author.username + " slapped :raised_back_of_hand: " + member.displayName + ", " + member.displayName + " is now in the hospital! :hospital:"
    }});
}

module.exports.help = {
    name: "slap",
    description: "Murders a user",
    usage: "slap <user>",
    type: "Fun" 
}