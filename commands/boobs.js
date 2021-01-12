const superagent = require("snekfetch");
const Discord = require('discord.js')
const rp = require('request-promise-native');
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "boobs",
 aliases: ["tits"],
 description: "Display a random boobs image/gif",
 category: "NSFW",
 usage: "boobs",
 run: async (client, message, args) => {
  if (!message.channel.nsfw) {
   message.react('💢');
   return message.channel.send({embed: {
    color: 16734039,
    description: "You can use this command in an NSFW Channel!"
   }})
  }
  return rp.get('http://api.oboobs.ru/boobs/0/1/random').then(JSON.parse).then(function(res) {
   return rp.get({
    url:'http://media.oboobs.ru/' + res[0].preview,
    encoding: null
   });
   }).then(function(res) {
    const embed = new Discord.MessageEmbed()
     .setTitle(":smirk: Boobs", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setColor("RANDOM")
     .setImage("attachment://boobs.png").attachFiles([{ attachment: res, name: "ass.png" }])
     .setFooter("Requested by " + `${message.author.username}` + " • Tags: Boobs, Tits", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     .setTimestamp()
     message.channel.send(embed);
   }).catch((err) => message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }}))
  }
}
