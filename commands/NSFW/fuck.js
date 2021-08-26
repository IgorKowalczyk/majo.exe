const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "fuck",
 aliases: [],
 description: "Fuck a user",
 category: "NSFW",
 usage: "fuck <user>",
 run: async (client, message, args) => {
  (async () => {
   try {
    const user = message.mentions.users.first();
    if (!user) {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: `${client.bot_emojis.error} | You must mention someone to fuck!`,
      },
     });
    }
    if (user == message.author) {
     return message.lineReply({
      embed: {
       color: 5294200,
       description: "😁 | You can't fuck yourself but... Ok, I forgot - you can masturbate 😳",
      },
     });
    }
    if (user == client.user) {
     return message.lineReply({
      embed: {
       color: 5294200,
       description: "😏 | Oh, you tried to fuck me but u can't... XD Im not real... But I can fuck you, Can I? ",
      },
     });
    }
    if (!message.channel.nsfw) {
     const nsfwembed = new Discord.MessageEmbed()
      .setColor("#FF5757")
      .setDescription(`${client.bot_emojis.anger} | You can use this command only in an NSFW Channel!`)
      .setFooter("Requested by " + message.author.username, message.author.displayAvatarURL())
      .setImage("https://media.discordapp.net/attachments/721019707607482409/855827123616481300/nsfw.gif");
     return message.lineReply(nsfwembed);
    }
    const response = await fetch("https://nekos.life/api/v2/img/anal");
    const body = await response.json();
    const embed = new Discord.MessageEmbed() // Prettier
     .setTitle(
      user.username + " is being fucked by " + message.author.username,
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
    console.log(err);
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
