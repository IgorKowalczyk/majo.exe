const Discord = require("discord.js");
const superagent = require("snekfetch");
const rp = require("request-promise-native");

module.exports = {
 name: "ass",
 aliases: [],
 description: "Display a random ass image/gif",
 category: "NSFW",
 usage: "ass",
 run: async (client, message, args) => {
  if (!message.channel.nsfw) {
   return message.channel.send({
    embed: {
     color: 16734039,
     description: "💢 | You can use this command only in an NSFW Channel!",
    },
   });
  }
  return rp
   .get("http://api.obutts.ru/butts/0/1/random")
   .then(JSON.parse)
   .then(function (res) {
    return rp.get({
     url: "http://media.obutts.ru/" + res[0].preview,
     encoding: null,
    });
   })
   .then(function (res) {
    const embed = new Discord.MessageEmbed() // Prettier()
     .setTitle(
      ":smirk: Ass",
      message.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setColor("RANDOM")
     .setImage("attachment://ass.png")
     .attachFiles([
      {
       attachment: res,
       name: "ass.png",
      },
     ])
     .setFooter(
      "Requested by " + `${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setTimestamp();
    message.channel.send(embed);
   })
   .catch((err) =>
    message.channel.send({
     embed: {
      color: 16734039,
      description: "Something went wrong... :cry:",
     },
    })
   );
 },
};
