const { MessageEmbed, MessageAttachment } = require("discord.js");
const rp = require("request-promise-native");

module.exports = {
 name: "ass",
 aliases: [],
 description: "Display a random ass image/gif",
 category: "NSFW",
 usage: "ass",
 run: async (client, message, args) => {
  if (!message.channel.nsfw) {
   const nsfwembed = new MessageEmbed()
    .setColor("RED")
    .setDescription(`${client.bot_emojis.anger} | You can use this command only in an NSFW Channel!`)
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setImage("https://media.discordapp.net/attachments/721019707607482409/855827123616481300/nsfw.gif");
   return message.reply({ embeds: [nsfwembed] });
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
    const file = new MessageAttachment(res, "ass.png");
    const embed = new MessageEmbed() // Prettier
     .setTitle(
      ":smirk: Ass",
      message.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setColor("RANDOM")
     .setImage("attachment://ass.png")
     .setFooter({
      text: `Requested by ${message.author.username}`,
      iconURL: message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setTimestamp();
    message.reply({ embeds: [embed], files: [file] });
   })
   .catch((err) => {
    return client.createCommandError(message, err);
   });
 },
};
