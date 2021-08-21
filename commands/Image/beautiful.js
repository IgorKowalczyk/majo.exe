const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
 name: "beautiful",
 aliases: [],
 description: "oh this? This is beautiful!",
 category: "Image",
 usage: "beautiful [user mention, user id, user name]",
 run: async (client, message, args) => {
  try {
   const User = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;
   const wait = await message.lineReply({
    embed: {
     color: 4779354,
     description: `${client.bot_emojis.sparkles} Please wait... I'm generating your image`,
    },
   });
   const beautiful = await canvacord.Canvas.beautiful(
    User.user.displayAvatarURL({
     dynamic: false,
     format: "png",
     size: 2048,
    })
   );
   const attachment = new Discord.MessageAttachment(beautiful, "beautiful.png");
   message.channel.send(attachment);
  } catch (err) {
   console.log(err);
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
