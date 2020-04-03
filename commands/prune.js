const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        message.delete();
        const deleteCount = await parseInt(args[0]);

        if(!deleteCount || deleteCount < 1 || deleteCount > 100) {
            return await message.channel.send({embed: {
                color: 3447003,
                title: "Provide a number between 1 and 100!"
            }}).then(msg => msg.delete(1899));
        }
       
        // So we get our messages, and delete them. Simple enough, right?
        message.channel.fetchMessages({limit: deleteCount})
            .then(function(list){
                message.channel.bulkDelete(list);
                message.channel.send({embed: {
                    color: 3447003,
                    title: deleteCount + " messages pruned! :white_check_mark:"
                }}).then(msg => msg.delete(1899));
            }, function(err){
                message.channel.send({embed: {
                    color: 3447003,
                    title: "ERROR: " + err
                }})
                .then(msg => msg.delete(1500));
        })  
    }
}

module.exports.help = {
    name: "prune",
    description: "Removes up to 100 messages",
    usage: "prune <amount>",
    type: "Moderation"
}