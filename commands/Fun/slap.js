const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "slap",
 aliases: [],
 description: "Slap a user",
 category: "Fun",
 usage: "slap <user>",
 run: async (client, message, args) => {
  try {
   const member = (await await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   if (!member) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Mention someone to slap!\n\n**Usage:** \`${process.env.PREFIX} slap <user>\``,
     },
    });
   }
   if (message.author === member || message.member == member) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.drooling_face} | You cant slap yourself!`,
     },
    });
   }
   (async () => {
    const response = await fetch("https://nekos.life/api/v2/img/slap");
    const body = await response.json();
    const embed = await new Discord.MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setTitle(member.user.username + " just got slapped by " + message.author.username)
     .setFooter(
      "That must hurt ._. | Requested by " + `${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setImage(body.url);
    message.lineReply(embed);
   })();
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
