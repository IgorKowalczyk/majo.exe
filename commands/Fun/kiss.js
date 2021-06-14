const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "kiss",
 aliases: [],
 description: "Kiss Kiss Kiss <3 | Cari... I love you, after all this time. I still love you. Come back to me.. Please",
 category: "Fun",
 usage: "kiss <user>",
 run: async (client, message, args) => {
  const user = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
  if (!user) {
   return message.lineReply({
    embed: {
     color: 16734039,
     description: "💔 | You must mention user to kiss ;-;",
    },
   });
  }
  if (message.author === user || message.member == user) {
   return await message.lineReply({
    embed: {
     color: 16734039,
     description: "💔 | You cant kiss yourself ;-; (Try kissing someone else, your love. Maybe you need some help?)",
    },
   });
  }
  (async () => {
   try {
    const response = await fetch("https://nekos.life/api/v2/img/kiss");
    const body = await response.json();
    const embed = new Discord.MessageEmbed() // Prettier()
     .setAuthor(
      user.displayName + " Just got a kiss from " + message.author.username,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setDescription("So sweeet :3")
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter(
      "Requested by " + `${message.author.username}`,
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
      description: "Something went wrong... :cry:",
     },
    });
   }
  })();
 },
};
