const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")

const Discord = require('discord.js');
const booru = require('booru');

module.exports.run = (client, message, args) => {

    if (!message.channel.nsfw) {
		message.react('💢');
		return message.channel.send({embed: {
                color: 16734039,
                title: "You can use this command in an NSFW Channel!"
            }})
	}

        if (message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) {
		message.react('💢');
		return message.channel.send({embed: {
                color: 16734039,
                title: "That kind of stuff is not allowed! Not even in NSFW channels!"
            }})
		}
        var query = message.content.split(/\s+/g).slice(1).join(" ");
		
		    if (!query) {
		return message.channel.send({embed: {
                color: 16734039,
                title: "You must enter a text to search booru!"
            }})
	}
        booru.search('danbooru', [query], {nsfw: true, limit: 1, random: true })
            .then(images => {
                for (let image of images) {
                    const embed = new Discord.RichEmbed()
                    .setTitle(":smirk: Danbooru")
                    .setImage(image.fileUrl)
                    .setColor('RANDOM')
                    .setFooter(`Tags: danbooru ${query}`)
                    .setURL(image.fileUrl);
                    return message.channel.send({ embed });
                }
            }).catch(err => {
                if (err.name === 'booruError') {
          		return message.channel.send({embed: {
                color: 16734039,
                title: `No results found for: **${query}**`
            }})
                } else {
                return message.channel.send({embed: {
                color: 16734039,
                title: `No results found for: **${query}**`
            }})
                }
})
      
}

module.exports.help = {
    name: "danbooru",
    description: "Sends a random danbooru image/gif",
    usage: "danbooru",
    type: "NSFW" 
}