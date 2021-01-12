const superagent = require("snekfetch");
const Discord = require('discord.js')
const rp = require('request-promise-native');
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "ass",
 aliases: [],
 description: "Display a random ass image/gif",
 category: "NSFW",
 usage: "ass",
 run: async (client, message, args) => {
  if (!message.channel.nsfw) {
   message.react('💢');
   return message.channel.send({embed: {
    color: 16734039,
    description: "You can use this command in an NSFW Channel!"
   }})
  }
  return rp.get('http://api.obutts.ru/butts/0/1/random').then(JSON.parse).then(function(res) {
   return rp.get({
    url:'http://media.obutts.ru/' + res[0].preview,
    encoding: null
   });
   }).then(function(res) {
    const embed = new Discord.MessageEmbed()
     .setTitle(":smirk: Ass", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setColor("RANDOM")
     .setImage("attachment://ass.png").attachFiles([{ attachment: res, name: "ass.png" }])
     .setFooter("Requested by " + `${message.author.username}` + " • Tags: ass", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     .setTimestamp()
     message.channel.send(embed);
   }).catch((err) => message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }}))
  }
}
