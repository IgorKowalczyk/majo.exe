const { MessageEmbed, MessageAttachment } = require("discord.js");
const rp = require("request-promise-native");

module.exports = {
 name: "boobs",
 aliases: ["tits"],
 description: "Display a random boobs image/gif",
 category: "NSFW",
 usage: "boobs",
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
   .get("http://api.oboobs.ru/boobs/0/1/random")
   .then(JSON.parse)
   .then(function (res) {
    return rp.get({
     url: "http://media.oboobs.ru/" + res[0].preview,
     encoding: null,
    });
   })
   .then(function (res) {
    const file = new MessageAttachment(res, "boobs.png");
    const embed = new MessageEmbed() // Prettier
     .setTitle(
      ":smirk: Boobs",
      message.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setColor("RANDOM")
     .setImage("attachment://boobs.png")
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
