const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "poke",
 aliases: [],
 description: "Poke user",
 category: "Fun",
 usage: "poke <user>",
 run: async (client, message, args) => {
  (async () => {
   try {
    const user = message.mentions.users.first();
    if (!user) {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: `${client.bot_emojis.error} | You must mention someone to poke!\n\n**Usage:** \`${process.env.PREFIX} poke <user>\``,
      },
     });
    }
    if (user == message.author) {
     return message.lineReply({
      embed: {
       color: 5294200,
       description: `${client.bot_emojis.facepalm} | You can't poke yourself tfu!`,
      },
     });
    }
    if (user == client.user) {
     return message.lineReply({
      embed: {
       color: 5294200,
       description: `${client.bot_emojis.facepalm} | Oh, you tried to poke me but u cant hehe (hopefully)`,
      },
     });
    }
    const response = await fetch("https://nekos.life/api/v2/img/poke");
    const body = await response.json();
    const embed = new Discord.MessageEmbed() // Prettier
     .setTitle(
      user.username + " just got poked by " + message.author.username,
      message.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setImage(body.url)
     .setURL(body.url)
     .setColor("RANDOM")
     .setDescription(user.toString() + " got a poke from " + message.author.toString())
     .setFooter(
      "Requested by " + `${message.author.username}` + " • (rip)",
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
