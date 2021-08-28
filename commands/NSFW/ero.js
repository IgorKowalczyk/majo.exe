const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "ero",
 aliases: [],
 description: "Display a random ero image/gif",
 category: "NSFW",
 usage: "ero",
 run: async (client, message, args) => {
  (async () => {
   try {
    if (!message.channel.nsfw) {
     const nsfwembed = new Discord.MessageEmbed()
      .setColor("#FF5757")
      .setDescription(`${client.bot_emojis.anger} | You can use this command only in an NSFW Channel!`)
      .setFooter("Requested by " + message.author.username, message.author.displayAvatarURL())
      .setImage("https://media.discordapp.net/attachments/721019707607482409/855827123616481300/nsfw.gif");
     return message.lineReply(nsfwembed);
    }
    const response = await fetch("https://nekos.life/api/v2/img/ero");
    const body = await response.json();
    const embed = new Discord.MessageEmbed() // Prettier
     .setTitle(
      ":smirk: Ero",
      message.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter(
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setTimestamp()
     .setURL(body.url);
    message.lineReply(embed);
   } catch (err) {
    message.lineReply({
     embed: {
      color: 16734039,
      description: `Something went wrong... ${client.bot_emojis.sadness}`,
     },
    });
   }
  })();
 },
};
