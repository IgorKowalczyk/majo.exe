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
   const nsfwembed = new Discord.MessageEmbed()
    .setColor("#FF5757")
    .setDescription(`${client.bot_emojis.anger} | You can use this command only in an NSFW Channel!`)
    .setFooter("Requested by " + message.author.username, message.author.displayAvatarURL())
    .setImage("https://media.discordapp.net/attachments/721019707607482409/855827123616481300/nsfw.gif");
   return message.lineReply(nsfwembed);
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
    const embed = new Discord.MessageEmbed() // Prettier
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
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setTimestamp();
    message.lineReply(embed);
   })
   .catch((err) =>
    message.lineReply({
     embed: {
      color: 16734039,
      description: `Something went wrong... ${client.bot_emojis.sadness}`,
     },
    })
   );
 },
};
