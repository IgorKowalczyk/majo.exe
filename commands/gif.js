const superagent = require("snekfetch");
const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {  
    if (!message.channel.nsfw) {
		message.react('💢');
		return message.channel.send({embed: {
                color: 16734039,
                description: "You can use this command in an NSFW Channel!"
            }})
	}

    superagent.get('https://nekos.life/api/v2/img/Random_hentai_gif')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setTitle(":smirk: Hentai")
      .setImage(response.body.url)
      .setColor(`RANDOM`)
      .setFooter(`Tags: gif`)
      .setURL(response.body.url);
  message.channel.send(lewdembed);
    }).catch((err) => message.channel.send({embed: {
                color: 16734039,
                title: "Something went wrong... :cry:"
            }}));
}

module.exports.help = {
    name: "gif",
    description: "Display a random hentai gif",
    usage: "gif",
    type: "NSFW" 
} 