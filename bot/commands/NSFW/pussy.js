const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "pussy",
 aliases: [],
 description: "Display a random pussy image/gif",
 category: "NSFW",
 usage: "pussy",
 run: async (client, message, args) => {
  (async () => {
   try {
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
    const response = await fetch("http://api.nekos.fun:8080/api/pussy");
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setTitle(
      ":smirk: Pussy",
      message.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setImage(body.image)
     .setColor("RANDOM")
     .setFooter({
      text: `Requested by ${message.author.username}`,
      iconURL: message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setTimestamp()
     .setURL(body.image);
    message.reply({ embeds: [embed] });
   } catch (err) {
    console.log(err);
    return client.createCommandError(message, err);
   }
  })();
 },
};
