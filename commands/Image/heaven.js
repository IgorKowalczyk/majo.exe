const Discord = require("discord.js");

module.exports = {
 name: "heaven",
 aliases: ["hvn"],
 description: "Returns a heaven image",
 category: "Image",
 usage: "heaven [user mention, user id, user name]",
 run: async (client, message, args) => {
  try {
   const hmember = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;
   const wait = await message.lineReply({
    embed: {
     color: 4779354,
     description: "✨ | Please wait... I'm generating your image",
    },
   });
   const embed = new Discord.MessageEmbed() // Prettier()
    .setColor("RANDOM")
    .setImage(
     encodeURI(
      `https://vacefron.nl/api/heaven?user=${hmember.user.displayAvatarURL({
       format: "png",
      })}`
     )
    )
    .setTimestamp();
   message.channel.send(embed);
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
