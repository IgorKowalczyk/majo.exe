const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let botembed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("I'm in " + `${client.guilds.size}` + " servers")
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL);
    message.channel.send(botembed);
}

module.exports.help = {
    name: "servers",
    description: "Display a number of servers",
    usage: "servers",
    type: "Utility"   
}