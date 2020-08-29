const api = require("snekfetch");
const Discord = require('discord.js')

module.exports = {
 name: "anal",
 aliases: [],
 description: "Display a random anal image/gif",
 category: 'NSFW',
 usage: "anal",
 run: async (client, message) => {
  if (!message.channel.nsfw) {
   message.react('💢');
   return message.channel.send({embed: {
    color: 16734039,
    description: "You can use this command in an NSFW Channel!"
  }})
  }
  api.get('https://nekos.life/api/v2/img/anal')
  .end((err, response) => {
  const embed = new Discord.MessageEmbed()
   .setTitle(":smirk: Anal")
   .setImage(response.body.url)
   .setColor(`RANDOM`)
   .setFooter(`Tags: anal Requested by ${message.author}`)
   .setURL(response.body.url);
  message.channel.send(embed);
  }).catch((err) => message.channel.send({embed: {
   color: 16734039,
   title: "Something went wrong... :cry:"
  }}));
}
}
