const Discord = require("discord.js");
const fetch = require("node-fetch");
const config = require("../../config");

module.exports = {
 name: "chat",
 aliases: [],
 description: "Chat with bot AI",
 category: "Fun",
 usage: "chat <message>",
 run: async (client, message, args) => {
  (async () => {
   const aimessage = args.join(" ");
   const brainid = config.brainid;
   const brainkey = config.brainkey;
   const uid = `majo-` + message.author.id;
   if (!args[0]) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | Hey! Please provide some message to talk to me :(",
     },
    });
   }
   if (message.mentions.members.first()) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | Hey! Please don't ping people >:(",
     },
    });
   }
   try {
    const response = await fetch(`http://api.brainshop.ai/get?bid=${brainid}&key=${brainkey}&uid=${uid}&msg=${aimessage}`);
    const body = await response.json();
    if (body.cnt == 0) {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: "❌ | Some error occured with my brain cells... Please try again later",
      },
     });
    } else {
     const embed = new Discord.MessageEmbed() // Prettier()
      .setDescription(body.cnt)
      .setColor("RANDOM")
      .setFooter(
       "Requested by " + `${message.author.username}`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      )
      .setTimestamp();
     message.lineReply(embed);
    }
   } catch (err) {
    console.log(err);
    message.lineReply({
     embed: {
      color: 16734039,
      description: "Something went wrong... :cry:",
     },
    });
   }
  })();
 },
};
