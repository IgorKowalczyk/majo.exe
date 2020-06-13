const superagent = require("snekfetch");
const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    if (!message.channel.nsfw) return message.channel.send({embed: {
                color: 16734039,
                description: "You can use this command in an NSFW Channel!"
            }})

    superagent.get('https://nekos.life/api/v2/img/cum')
        .end((err, response) => {
      const embed = new Discord.RichEmbed()
      .setTitle(":smirk: Cum")
      .setImage(response.body.url)
      .setColor(`RANDOM`)
      .setFooter(`Tags: cum`)
      .setURL(response.body.url);
  message.channel.send(embed);
    }).catch((err) => message.channel.send({embed: {
                color: 16734039,
                description: "Something went wrong... :cry:"
            }}));
	
}

module.exports.help = {
    name: "cum",
    description: "Display a random cum image/gif",
    usage: "cum",
    type: "NSFW" 
}