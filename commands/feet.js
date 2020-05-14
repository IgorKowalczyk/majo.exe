const superagent = require("snekfetch");
const Discord = require('discord.js')

module.exports.run = async (client, message, args, level) => {
     if (!message.channel.nsfw) {
		message.react('💢');
		return message.channel.send({embed: {
                color: 16734039,
                title: "You can use this command in an NSFW Channel!"
            }})
	}
    superagent.get('https://nekos.life/api/v2/img/feet')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setTitle(":smirk: Feet")
      .setImage(response.body.url)
      .setColor(`RANDOM`)
      .setFooter(`Tags: feet`)
      .setURL(response.body.url);
  message.channel.send(lewdembed);
    }).catch((err) => message.channel.send({embed: {
                color: 16734039,
                title: "Something went wrong... :cry:"
            }}));
	
}

module.exports.help = {
    name: "feet",
    description: "Display a random feet image/gif",
    usage: "feet",
    type: "NSFW" 
}