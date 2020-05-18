const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Sorry, but you don't have acces to set the logs.");
    let log = message.guild.channels.find("name", "log")  
    if(log) return message.reply("**The channel #log is already exist**")   
    if(!log) {   
    message.guild.createChannel("log", "text").then(c=> {  
        c.overwritePermissions(message.guild.id, {  
            SEND_MESSAGES: false
    })
})
message.channel.send("**? The channel has been created and the channel logs is #logs**")
}
}

module.exports.help = {
    name: "setlog",
    description: "Set a log channel",
    usage: "setlog",
    type: "Moderation"
}