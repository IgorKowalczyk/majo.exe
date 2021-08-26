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
    const nsfwembed = new Discord.MessageEmbed()
     .setColor("#FF5757")
     .setDescription(`${client.bot_emojis.anger} | You can use this command only in an NSFW Channel!`)
     .setFooter("Requested by " + message.author.username, message.author.displayAvatarURL())
     .setImage("https://media.discordapp.net/attachments/721019707607482409/855827123616481300/nsfw.gif");
    return message.lineReply(nsfwembed);
   }
   const query = message.content.split(/\s+/g).slice(1).join(" ");
   if (!query) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You must enter a text to search for furry!`,
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
      const embed = new Discord.MessageEmbed() // Prettier
       .setTitle(":smirk: Furry")
       .setImage(image.fileUrl)
       .setColor("RANDOM")
       .setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        })
       )
       .setURL(image.fileUrl);
      return message.lineReply({
       embed,
      });
     }
    })
    .catch((err) => {
     if (err.name === "booruError") {
      return message.lineReply({
       embed: {
        color: 16734039,
        description: `${client.bot_emojis.error} | No results found for: ${query}`,
       },
      });
     } else {
      return message.lineReply({
       embed: {
        color: 16734039,
        description: `${client.bot_emojis.error} | No results found for: ${query}`,
       },
      });
     }
    });
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
