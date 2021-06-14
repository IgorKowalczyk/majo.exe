const Discord = require("discord.js");
const booru = require("booru");

module.exports = {
 name: "furry",
 aliases: [],
 description: "Search internet for your furry!",
 category: "NSFW",
 usage: "furry",
 run: async (client, message, args) => {
  try {
   if (!message.channel.nsfw) {
    return message.channel.send({
     embed: {
      color: 16734039,
      description: "💢 | You can use this command only in an NSFW Channel!",
     },
    });
   }
   const query = message.content.split(/\s+/g).slice(1).join(" ");
   if (!query) {
    return message.channel.send({
     embed: {
      color: 16734039,
      description: "❌ | You must enter a text to search for furry!",
     },
    });
   }
   booru
    .search("e6", [query], {
     nsfw: true,
     limit: 1,
     random: true,
    })
    .then((images) => {
     for (let image of images) {
      const embed = new Discord.MessageEmbed() // Prettier()
       .setTitle(":smirk: Furry")
       .setImage(image.fileUrl)
       .setColor("RANDOM")
       .setFooter(
        "Requested by " + `${message.author.username}`,
        message.author.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        })
       )
       .setURL(image.fileUrl);
      return message.channel.send({
       embed,
      });
     }
    })
    .catch((err) => {
     if (err.name === "booruError") {
      return message.channel.send({
       embed: {
        color: 16734039,
        description: `❌ | No results found for: ${query}`,
       },
      });
     } else {
      return message.channel.send({
       embed: {
        color: 16734039,
        description: `❌ | No results found for: ${query}`,
       },
      });
     }
    });
  } catch (err) {
   console.log(err);
   message.channel.send({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
