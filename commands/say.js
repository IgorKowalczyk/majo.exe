const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        message.delete();
        const taggedChannel = await message.mentions.channels.first();

        if(taggedChannel) {
            await taggedChannel.send(args.join(" ").replace(taggedChannel, ""));
        } else {
            const saymessage = await args.join(" ");

            if (saymessage.length >= 1) {
                await message.channel.send(saymessage);
            } else {
                await message.channel.send({embed: {
                    color: 16734039,
                    description: "You need to enter a Message!"
                }});
            }
        }
    } else {
	message.channel.send({embed: {
                    color: 16734039,
                    description: "You don't have premission to send this message by me!"
                }})
	}
}

module.exports.help = {
    name: "say",
    description: "Sends a message through the bot",
    usage: "say <channel> <message>",
    type: "Moderation"  
}