const superagent = require("snekfetch");
const Discord = require('discord.js')

module.exports.run = async (client, message, args, level) => {
    if (!message.channel.nsfw) return message.channel.send({embed: {
                color: 16734039,
                title: "You can use this command in an NSFW Channel!"
            }})
    superagent.get('https://nekos.life/api/v2/img/classic')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setTitle(":smirk: Hentai classic")
      .setImage(response.body.url)
      .setColor(`RANDOM`)
      .setFooter(`Tags: classic`)
      .setURL(response.body.url);
  message.channel.send(lewdembed);
    }).catch((err) => message.channel.send({embed: {
                color: 16734039,
                title: "Something went wrong... :cry:"
            }}));
	
}

module.exports.help = {
    name: "classic",
    description: "Display a random classic sex image/gif",
    usage: "classic",
    type: "NSFW" 
}