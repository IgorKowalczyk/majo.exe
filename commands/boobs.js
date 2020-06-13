const superagent = require("snekfetch");
const Discord = require('discord.js')
const rp = require('request-promise-native');

module.exports.run = async (client, message, args) => {
    if (!message.channel.nsfw) {
		message.react('💢');
		return message.channel.send({embed: {
                color: 16734039,
                description: "You can use this command in an NSFW Channel!"
            }})
	}

  return rp.get('http://api.oboobs.ru/boobs/0/1/random').then(JSON.parse).then(function(res)  {
    return rp.get({
        url:'http://media.oboobs.ru/' + res[0].preview,
        encoding: null
    });
}).then(function(res)   {

const embed = new Discord.RichEmbed()
      .setTitle(":smirk: Boobs")
      .setColor(`RANDOM`)
      .setImage("attachment://file.png").attachFiles([{ attachment: res, name: "file.png" }])
	  .setFooter(`Tags: boobs`)


    message.channel.send(embed);
}).catch((err) => message.channel.send({embed: {
                color: 16734039,
                description: "Something went wrong... :cry:"
            }}));

}

module.exports.help = {
    name: "boobs",
    description: "Display a random boobs image/gif (PS. Small is the best <3)",
    usage: "boobs",
    type: "NSFW" 
}